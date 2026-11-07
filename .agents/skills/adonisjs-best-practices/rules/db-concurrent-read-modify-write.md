---
title: "Protect read-modify-write operations against concurrency"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Protect read-modify-write operations against concurrency

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

A transaction provides atomic commit, but an ordinary SELECT followed by UPDATE can still lose concurrent changes. Lock the row inside the transaction before checking an invariant, or use an atomic conditional update when that expresses the invariant more simply.

## Incorrect

```ts
const inventory = await Inventory.findOrFail(productId)
if (inventory.stock < quantity) throw new Error('Insufficient stock')
inventory.stock -= quantity
await inventory.save()
```

## Correct

```ts
import db from '@adonisjs/lucid/services/db'
import Inventory from '#models/inventory'

await db.transaction(async (trx) => {
  const inventory = await Inventory.query({ client: trx })
    .where('id', productId)
    .forUpdate()
    .firstOrFail()

  if (inventory.stock < quantity) throw new Error('Insufficient stock')
  inventory.stock -= quantity
  await inventory.save()
})
```

## Caveats

Validate `quantity` as a positive bounded integer before this operation. Row-lock support and isolation semantics vary by dialect; SQLite does not provide the same row-lock behavior. Keep the locked section short and acquire multiple locks in a consistent order. A lock on a missing row does not establish uniqueness: retain database constraints.

## Official sources

- https://lucid.adonisjs.com/docs/introduction
- https://lucid.adonisjs.com/docs/transactions
