---
title: Authorize the loaded resource before mutating it
impact: CRITICAL
impactDescription: Authentication identifies a user; it does not permit editing arbitrary IDs
tags: [adonisjs, security]
---

# Authorize the loaded resource before mutating it

Authentication identifies a user; it does not permit editing arbitrary IDs. Centralize resource rules in a Bouncer ability or policy and await authorization before database mutations or external side effects. Hiding UI controls is not enforcement.

## Incorrect

```ts
const post = await Post.findOrFail(params.id)
await post.merge(payload).save()
await bouncer.with(PostPolicy).authorize('edit', post)
```

## Correct

```ts
// Authenticated controller action; payload is allowlisted and validated.
const post = await Post.findOrFail(params.id)
await bouncer.with(PostPolicy).authorize('edit', post)
await post.merge(payload).save()
return { id: post.id }
```

## Caveats and versions

v7; import Post and PostPolicy from their project aliases. The policy must actually check ownership/permissions, e.g. user.id === post.userId; the resource ID itself proves nothing. await allows/denies checks too. Keep Bouncer initialization middleware. v7 policy indexing uses indexPolicies and #generated/policies, not a hand-maintained policy registry.

## References

- https://docs.adonisjs.com/guides/auth/authorization.md
- https://docs.adonisjs.com/v6-to-v7.md
