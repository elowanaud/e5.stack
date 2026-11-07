---
title: "Test anonymous, non-owner and cross-tenant requests through HTTP"
impact: CRITICAL
impactDescription: "An authorized success test cannot detect a missing auth middleware or ownership filter"
tags: test, negative
---

# Test anonymous, non-owner and cross-tenant requests through HTTP

**Impact: CRITICAL**

## Rationale

An authorized success test cannot detect a missing auth middleware or ownership filter. Make real HTTP requests for denial paths and verify that forbidden operations do not mutate state or dispatch external effects. Use the application’s actual guard and expected non-disclosure policy.

## Incorrect

```ts
// Partial test: proves only that the owner can update.
const response = await client.patch(`/posts/${post.id}`)
  .loginAs(owner).json({ title: 'Changed' })
response.assertStatus(200)
```

## Correct

```ts
// Partial Japa test: owner-scoped API returns 404 for another user’s post.
// post, outsider and originalTitle are persisted fixtures from separate owners.
const anonymous = await client.patch(`/posts/${post.id}`)
  .header('Accept', 'application/json').json({ title: 'Changed' })
anonymous.assertStatus(401)

const denied = await client.patch(`/posts/${post.id}`)
  .header('Accept', 'application/json')
  .loginAs(outsider).json({ title: 'Changed' })
denied.assertStatus(404)
assert.equal((await Post.findOrFail(post.id)).title, originalTitle)
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Use 403 instead of 404 when that is the route’s documented policy; HTML/session routes may redirect rather than return JSON 401. For token routes use withGuard with the actual configured guard, and test missing/revoked/expired credentials as applicable. loginAs bypasses credential verification, so test the login endpoint itself separately when changing authentication. Add cross-tenant fixtures, malformed input, missing resources, private Inertia props and Transmit subscription denials when affected; do not replace policy/middleware with a fake in these tests.

## Sources

- https://docs.adonisjs.com/guides/testing/api-tests.md
- https://docs.adonisjs.com/guides/auth/authorization.md
- https://japa.dev/docs/plugins/api-client
