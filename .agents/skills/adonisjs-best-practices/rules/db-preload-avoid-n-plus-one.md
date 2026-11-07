---
title: "Preload required relationships instead of querying in loops"
impact: HIGH
tags: db, adonisjs-v7
---

# Preload required relationships instead of querying in loops

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Declare the response's relationship graph on its query. Loading a relation for each result turns a list request into N additional database round trips. If the response only needs a count or existence test, use aggregates or relationship filtering rather than fetching all children.

## Incorrect

```ts
const posts = await Post.query().limit(20)
for (const post of posts) {
  await post.load('author')
}
return posts.map((post) => ({ title: post.title, author: post.author.fullName }))
```

## Correct

```ts
import Post from '#models/post'

const posts = await Post.query()
  .preload('author')
  .orderBy('id', 'desc')
  .limit(20)

return posts.map((post) => ({ title: post.title, author: post.author.fullName }))
```

## Caveats

Preload only relationships the response uses: eager loading an unbounded child collection can be worse than a small explicit query. Use `withCount` when only the count is needed; its result lives in `$extras`. Transformers do not load missing relationships automatically. Ensure selected columns preserve the keys needed for relation hydration.

## Official sources

- https://lucid.adonisjs.com/docs/has-many
- https://lucid.adonisjs.com/docs/serializing-models
