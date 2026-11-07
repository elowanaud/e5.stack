---
title: "Choose bulk writes with their hook semantics in mind"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Choose bulk writes with their hook semantics in mind

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Query-builder update/delete and table inserts do not execute the per-instance persistence pipeline. A bulk password update can store plaintext if hashing lives in `beforeSave`; a bulk delete can bypass model cleanup. Choose SQL bulk operations only when required invariants are handled explicitly or by the database.

## Incorrect

```ts
// The User beforeSave hashing hook will not run here.
await User.query().where('id', userId).update({ password: payload.password })
```

## Correct

```ts
import User from '#models/user'

const user = await User.findOrFail(userId)
user.password = payload.password
await user.save() // Runs this model's configured hashing hook.
```

## Caveats

Use the existing AuthFinder hashing behavior when configured; do not add a second hashing hook. `Model.createMany` inserts instances individually in a managed transaction and runs hooks; it is not equivalent to a single bulk INSERT. Query-builder updates also bypass automatic model timestamps, so set them explicitly where needed. For large jobs that require hooks, process bounded batches rather than loading the entire table.

## Official sources

- https://lucid.adonisjs.com/docs/crud-operations
- https://lucid.adonisjs.com/docs/model-hooks
