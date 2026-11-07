---
title: "Use Tuyau for compile-time contracts, not runtime trust"
impact: CRITICAL
impactDescription: "A type-safe client catches mistakes in cooperating TypeScript code; attackers and ordinary HTTP clients can bypass it"
tags: view, tuyau
---

# Use Tuyau for compile-time contracts, not runtime trust

**Impact: CRITICAL**

## Rationale

A type-safe client catches mistakes in cooperating TypeScript code; attackers and ordinary HTTP clients can bypass it. Every server action still needs runtime validation, authentication and resource authorization. Keep generated registry and client package versions compatible.

## Incorrect

```ts
// Partial action: the frontend uses Tuyau, so input was assumed safe.
const post = await Post.findOrFail(params.id)
await post.merge(request.all()).save()
return post
```

## Correct

```ts
// Partial authenticated action; imports use the app’s existing validator/ability.
const payload = await request.validateUsing(updatePostValidator)
const post = await Post.findOrFail(params.id)
await bouncer.authorize(editPost, post)
await post.merge({ title: payload.title, body: payload.body }).save()
return { id: post.id, title: post.title, body: post.body }
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Tuyau route types and type-level serialization do not validate arbitrary server responses or prove business permissions. Do not cast to any to bypass stale registry errors; regenerate and resolve the real contract mismatch. Current @tuyau/core registry producers and clients must share a version (encoding changed in 1.2.3). Review Ky retries/timeouts/hooks for the installed version; transport retries must respect mutation idempotency. Do not bundle backend runtime imports/secrets merely to share types.

## Sources

- https://docs.adonisjs.com/guides/frontend/api-client.md
- https://docs.adonisjs.com/guides/basics/validation.md
- https://docs.adonisjs.com/guides/auth/authorization.md
- https://github.com/sindresorhus/ky
