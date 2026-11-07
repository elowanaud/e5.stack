---
title: "Use groupLimit for top-N children per parent"
impact: HIGH
tags: db, adonisjs-v7
---

# Use groupLimit for top-N children per parent

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

A plain `limit` in a collection preload limits the combined child query, not each parent's children. Use Lucid's per-parent limit and ordering when an endpoint promises a bounded preview for every parent.

## Incorrect

```ts
const users = await User.query().preload('posts', (posts) => {
  posts.orderBy('created_at', 'desc').limit(3)
})
```

## Correct

```ts
import User from '#models/user'

const users = await User.query()
  .orderBy('id', 'asc')
  .limit(20)
  .preload('posts', (posts) => {
    posts.groupOrderBy('id', 'desc').groupLimit(3)
  })
```

## Caveats

The grouped APIs use window functions and need a supporting database/version. Use a unique order (ID here) or an explicit tie-breaker when the installed API supports multiple grouped order columns. A plain `limit` is appropriate for `oneUser.related('posts').query()` because there is only one parent. Limit the parent query too.

## Official sources

- https://lucid.adonisjs.com/docs/has-many
