---
title: "Propagate the caller transaction through every data access"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Propagate the caller transaction through every data access

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Pass the same client into helpers, model queries, raw queries, and writes that belong to the unit of work. Merely calling a helper inside `db.transaction` does not enlist its default-connection queries. Loaded model instances inherit the query client; existing instances need `useTransaction`.

## Incorrect

```ts
await db.transaction(async (trx) => {
  await trx.table('orders').where('id', orderId).update({ status: 'paid' })
  await db.table('audit_logs').insert({ order_id: orderId, action: 'paid' })
})
```

## Correct

```ts
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import db from '@adonisjs/lucid/services/db'
import Order from '#models/order'

async function markPaid(orderId: number, trx: TransactionClientContract) {
  const order = await Order.query({ client: trx })
    .where('id', orderId)
    .firstOrFail()
  order.status = 'paid'
  await order.save()
  await trx.table('audit_logs').insert({ order_id: order.id, action: 'paid' })
}

await db.transaction((trx) => markPaid(orderId, trx))
```

## Caveats

Use `instance.useTransaction(trx)` before saving an instance loaded outside the transaction. Relationship writes inherit the parent instance's transaction. Start transactions on the intended named connection; a new default-connection transaction in a nested helper is not a savepoint of its caller. Build a savepoint from the existing client when needed.

## Official sources

- https://lucid.adonisjs.com/docs/transactions
- https://lucid.adonisjs.com/docs/raw-query-builder
