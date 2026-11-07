---
title: "Invalidate affected cache variants after a successful write"
impact: HIGH
impactDescription: "A TTL is a staleness policy, not a guarantee of correctness after writes"
tags: ops, cache
---

# Invalidate affected cache variants after a successful write

**Impact: HIGH**

## Rationale

A TTL is a staleness policy, not a guarantee of correctness after writes. Tag dependent representations and invalidate after the database commit, so a rolled-back write does not publish new state and every affected list variant can refresh.

## Incorrect

```ts
await post.merge(payload).save()
await cache.delete({ key: `post:${post.id}` })
// Cached search results and paginated lists still contain the old title.
```

## Correct

```ts
// Read path, partial: tenantId and page are already validated/scoped.
await cache.getOrSet({
  key: `posts:${tenantId}:page:${page}`,
  tags: [`tenant:${tenantId}:posts`],
  ttl: '5m',
  factory: async () => (await Post.query()
    .where('tenantId', tenantId).paginate(page, 20)).serialize(),
})

// Write path, after the enclosing transaction has committed.
await cache.deleteByTag({ tags: [`tenant:${tenantId}:posts`] })
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Tagging is a cache API, not a transactionally atomic DB/cache protocol. A crash or racing cache fill can still leave stale results; use an explicit recovery/invalidation strategy for stronger requirements. Avoid global clear for a tenant-local mutation. Grace periods and soft timeouts intentionally serve stale data and are unsuitable for security-critical revocation checks.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/cache.md
- https://lucid.adonisjs.com/docs/transactions
