---
title: "Bound list queries and paginate with a deterministic order"
impact: HIGH
tags: db, adonisjs-v7
---

# Bound list queries and paginate with a deterministic order

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x, VineJS 4; confirm installed package APIs.

Validate page and page size, impose an application maximum, select only the columns needed, and order by a unique tie-breaker. Unbounded `all()` calls and arbitrary page sizes amplify database, hydration, and response costs. Sorting only by a non-unique timestamp does not totally order the results.

## Incorrect

```ts
return Post.query().paginate(request.input('page'), request.input('perPage'))
```

## Correct

```ts
import vine from '@vinejs/vine'
import Post from '#models/post'

// Module-scope validator: current VineJS 4 / AdonisJS v7 syntax.
const listPostsValidator = vine.create({
  page: vine.number().withoutDecimals().min(1).max(1000).optional(),
  perPage: vine.number().withoutDecimals().min(1).max(100).optional(),
})

const input = await request.validateUsing(listPostsValidator)
return Post.query()
  .select('id', 'title', 'created_at')
  .orderBy('created_at', 'desc')
  .orderBy('id', 'desc')
  .paginate(input.page ?? 1, input.perPage ?? 20)
```

## Caveats

The page cap is an application policy, not an official universal value. Include primary/foreign keys required by selected preloads; do not save partially-selected models as though all attributes were loaded. Offset pagination runs a COUNT and still shifts under concurrent inserts/deletes: use an explicitly designed cursor/keyset contract for deep or continuously changing feeds, rather than claiming stable sorting creates a snapshot.

## Official sources

- https://lucid.adonisjs.com/docs/pagination
- https://vinejs.dev/docs/types/number
