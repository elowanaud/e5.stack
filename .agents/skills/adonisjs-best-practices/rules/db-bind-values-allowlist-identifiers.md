---
title: "Bind SQL values and allowlist dynamic identifiers"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Bind SQL values and allowlist dynamic identifiers

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x, VineJS 4; confirm installed package APIs.

Use query-builder value arguments or raw bindings for user-controlled values. Column identifiers and sort directions are a different concern: identifier quoting prevents SQL syntax injection but does not decide which columns a client may access. Allowlist dynamic identifiers and directions before query construction.

## Incorrect

```ts
await db.rawQuery(`select * from users where email = '${email}'`)
await db.from('users').orderByRaw(`${request.input('sort')} ${request.input('direction')}`)
```

## Correct

```ts
import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

// Current VineJS 4 / AdonisJS v7 validator syntax.
const sortValidator = vine.create({
  sort: vine.enum(['newest', 'name']).optional(),
  direction: vine.enum(['asc', 'desc']).optional(),
})
const input = await request.validateUsing(sortValidator)
const columns = { newest: 'created_at', name: 'full_name' } as const

const users = await db.from('users')
  .select('id', 'full_name')
  .where('email', email)
  .orderBy(columns[input.sort ?? 'newest'], input.direction ?? 'desc')
  .orderBy('id', 'desc')
  .limit(20)

await db.rawQuery('select id from users where email = ?', [email])
```

## Caveats

Define the reusable validator at module scope in production code. Raw SQL uses `?` for values and `??` for identifiers (or named equivalents); neither is a replacement for an authorization allowlist. Never bind a whole SQL expression or direction as a value and expect it to become executable SQL.

## Official sources

- https://lucid.adonisjs.com/docs/raw-query-builder
- https://vinejs.dev/docs/types/enum
