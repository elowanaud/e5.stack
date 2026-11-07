---
title: Derive tenant boundaries from authenticated membership
impact: CRITICAL
impactDescription: Tenant IDs in headers, params, or payloads are selectors, not authority
tags: [adonisjs, security]
---

# Derive tenant boundaries from authenticated membership

Tenant IDs in headers, params, or payloads are selectors, not authority. Scope reads, writes, lists, and nested resources to an authenticated membership or equivalent trusted tenant context. A Bouncer check on one action does not automatically scope every ORM query.

## Incorrect

```ts
const post = await Post.findOrFail(params.id)
post.tenantId = request.input('tenantId')
await post.save()
```

## Correct

```ts
// This application stores the active, authorized tenant on User.
const user = auth.getUserOrFail()
const post = await Post.query()
  .where('tenant_id', user.tenantId)
  .where('id', params.id)
  .firstOrFail()
await bouncer.with(PostPolicy).authorize('edit', post)
await post.merge(payload).save()
```

## Caveats and versions

v7 application-level security pattern derived from resource authorization, not an automatic Adonis tenancy feature. user.tenantId must represent verified membership, not a copied client input. Multi-membership apps must explicitly resolve and verify the selected membership. payload must not include tenantId/ownerId. Also scope nested relation IDs and background jobs.

## References

- https://docs.adonisjs.com/guides/auth/authorization.md
- https://docs.adonisjs.com/guides/basics/http-context.md
