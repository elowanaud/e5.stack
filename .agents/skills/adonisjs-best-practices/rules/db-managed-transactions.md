---
title: "Keep atomic writes in a managed transaction"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Keep atomic writes in a managed transaction

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Use a managed transaction for writes that must succeed together. A failure in the second write must undo the first; a JavaScript callback alone does not provide atomicity. Let failures escape the callback so Lucid rolls back instead of committing partial work.

## Incorrect

```ts
const order = await Order.create({ customerId, status: 'pending' })
await order.related('items').createMany(items)
// An item failure can leave an empty pending order.
```

## Correct

```ts
import db from '@adonisjs/lucid/services/db'
import Order from '#models/order'

const order = await db.transaction(async (trx) => {
  const created = await Order.create(
    { customerId, status: 'pending' },
    { client: trx }
  )
  await created.related('items').createMany(items)
  return created
})
```

## Caveats

All participating queries must use the transaction client. Do not catch and discard a write error inside the callback. Prefer manual transactions only when their lifetime genuinely needs explicit control, and ensure every path commits or rolls back. A transaction covers one database connection, not remote payment or mail operations.

## Official sources

- https://lucid.adonisjs.com/docs/transactions
- https://lucid.adonisjs.com/docs/has-many
