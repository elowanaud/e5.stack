---
title: "Dispatch only after commit and choose durability separately"
impact: CRITICAL
impactDescription: "A worker can run before an enclosing database transaction commits, or after it rolls back"
tags: ops, jobs
---

# Dispatch only after commit and choose durability separately

**Impact: CRITICAL**

## Rationale

A worker can run before an enclosing database transaction commits, or after it rolls back. Wait for commit before dispatching work that depends on those writes. A post-commit dispatch prevents that race but does not atomically guarantee delivery if the process dies between commit and enqueue.

## Incorrect

```ts
await db.transaction(async (trx) => {
  const order = await Order.create(payload, { client: trx })
  await ProcessOrder.dispatch({ orderId: order.id })
})
```

## Correct

```ts
import db from '@adonisjs/lucid/services/db'

// Partial action: validated payload and ProcessOrder job are in scope.
const order = await db.transaction(async (trx) => {
  return Order.create(payload, { client: trx })
})
await ProcessOrder.dispatch({ orderId: order.id })
```

## Applicability and caveats

The job dispatch API shown is v7-only (core >=7.6, experimental). Lucid managed transactions and the side-effect design principle are independently applicable.

The corrected snippet is appropriate only when the commit-to-enqueue gap is acceptable or recoverable. For required durable delivery, persist an outbox row with the domain write in the same transaction, then have an idempotent relay enqueue/reconcile it. No undocumented afterCommit dispatcher API is implied. A database queue adapter does not automatically join your transaction. Mail, emitter listeners and SSE broadcasts have the same side-effect boundary.

For a durable outbox, give each intent a stable unique operation ID and insert it through the same transaction client as the order:

```ts
import { randomUUID } from 'node:crypto'
import Order from '#models/order'

// The outbox migration defines a unique operation_id and nullable
// delivered_at, lease_token and lease_until columns.
const operationId = randomUUID()
await db.transaction(async (trx) => {
  const order = await Order.create(payload, { client: trx })
  await trx.table('outbox_events').insert({
    operation_id: operationId,
    event_type: 'order.created',
    payload: JSON.stringify({ orderId: order.id }),
  })
})
```

A relay claims a bounded set of undelivered rows in a short transaction (for PostgreSQL, `FOR UPDATE SKIP LOCKED`), assigns each claim a fresh lease token and expiry, and commits before network dispatch. Select unclaimed or expired leases using database time. Enqueue outside the claim transaction using the stored operation ID, then mark delivery only if that row still has the same lease token; never mark before successful enqueue. Retry expired claims after crashes and conditionally release failed claims. A dispatch can succeed just before the relay dies, so duplicates are unavoidable: consumers must atomically record that stable ID with their database effect, or use a naturally idempotent transition. Lease expiry permits overlapping attempts and is not an exactly-once guarantee. Provider calls need provider idempotency/reconciliation separately. Keep pending rows and the consumer ledger long enough for recovery and replay, and supervise the relay independently of web traffic.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/queues.md
- https://lucid.adonisjs.com/docs/transactions
- https://lucid.adonisjs.com/docs/select-query-builder
- https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE
