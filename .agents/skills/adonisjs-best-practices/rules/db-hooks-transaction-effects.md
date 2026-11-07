---
title: "Do not confuse after-save hooks with committed state"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Do not confuse after-save hooks with committed state

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

`afterCreate` and `afterSave` run after the SQL statement, not necessarily after the outer transaction commits. Sending email, publishing an event, or updating a search index there can announce data that later rolls back. Keep database work on the transaction client and perform nontransactional effects only after the transaction resolves.

## Incorrect

```ts
// Inside an afterCreate hook: outer transaction can still roll back.
@afterCreate()
static async announce(order: Order) {
  await mail.send((message) => {
    message.to(order.customerEmail).subject('Order created')
  })
}
```

## Correct

```ts
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import Order from '#models/order'

const order = await db.transaction(async (trx) => {
  const created = await Order.create(payload, { client: trx })
  await created.related('items').createMany(items)
  return created
})

await mail.send((message) => {
  message.to(order.customerEmail).subject('Order created')
})
```

## Caveats

The example orders an ordinary best-effort effect after commit; it does not provide exactly-once or crash-safe delivery. When durable delivery is a requirement, persist an outbox/job record in the same database transaction and use the project's actual delivery mechanism. Current Lucid also documents `trx.after('commit', ...)`, whose handler errors are swallowed: handle failures explicitly. Database writes inside hooks need the model's `$trx` propagated to their queries. Pure normalization hooks should check `$dirty` to avoid rehashing/recomputing unchanged values.

## Official sources

- https://lucid.adonisjs.com/docs/model-hooks
- https://lucid.adonisjs.com/docs/transactions
