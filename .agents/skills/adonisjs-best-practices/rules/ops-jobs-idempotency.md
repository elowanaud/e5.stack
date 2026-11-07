---
title: "Make retries safe beyond the dispatch deduplication window"
impact: CRITICAL
impactDescription: "A retry may repeat work that already partially succeeded"
tags: ops, jobs
---

# Make retries safe beyond the dispatch deduplication window

**Impact: CRITICAL**

## Rationale

A retry may repeat work that already partially succeeded. Dispatch-time deduplication limits enqueueing; it does not make execution exactly-once or undo an external payment/email. Design the state transition or effect to tolerate repeated attempts.

## Incorrect

```ts
// Partial retryable execute(): each attempt increments again.
await db.from('reports').where('id', this.payload.reportId)
  .increment('completed_exports', 1)
```

## Correct

```ts
// Partial execute(): this job only marks an existing report as archived.
// Repeating this assignment has the same final state.
await db.from('reports')
  .where('id', this.payload.reportId)
  .update({ archived: true })
```

## Applicability and caveats

V7-only dispatch/dedup details refer to experimental @adonisjs/queue; the idempotency principle also applies to BullMQ and other retrying workers.

For non-idempotent business operations use a stable operation ID with a database unique constraint/transaction and the external provider’s documented idempotency mechanism. A “processed” flag written after an external call still has a crash window. Current dedup applies only to single Redis/database dispatches, not sync, batches or schedules; TTL expiration and retention also affect its lifetime. Preserve causal errors for retries rather than swallowing them.

For a non-idempotent database increment, record consumption and apply the effect in one transaction:

```ts
import db from '@adonisjs/lucid/services/db'

// PostgreSQL illustration. processed_operations.operation_id has a UNIQUE
// constraint; reportId and operationId come from the durable job payload.
await db.transaction(async (trx) => {
  const claimed = await trx.table('processed_operations')
    .insert({ operation_id: operationId })
    .onConflict('operation_id').ignore()
    .returning('operation_id')
  if (claimed.length === 0) return // A committed attempt already applied it.

  const updated = await trx.from('reports').where('id', reportId)
    .increment('completed_exports', 1)
  if (Number(updated) !== 1) throw new Error('Report not found')
})
```

The unique operation ID must identify one immutable business operation across retries, not a fresh worker attempt. Keep the ledger entry for as long as replay remains possible. A competing insert waits for the first transaction's outcome: rollback permits a retry; commit makes the duplicate a no-op. The effect and ledger must use the same database transaction. This gives at-most-once committed database effects with retryable delivery, not exactly-once external calls. An external provider still needs its own durable idempotency key or reconciliation.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/queues.md
- https://docs.bullmq.io/patterns/idempotent-jobs
- https://lucid.adonisjs.com/docs/transactions
- https://lucid.adonisjs.com/docs/insert-query-builder
- https://www.postgresql.org/docs/current/sql-insert.html
