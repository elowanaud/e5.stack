---
title: Enforce rate limits in a shared backend with trustworthy keys
impact: HIGH
impactDescription: Per-process memory limits multiply with replicas and disappear on restarts
tags: [adonisjs, security]
---

# Enforce rate limits in a shared backend with trustworthy keys

Per-process memory limits multiply with replicas and disappear on restarts. Use a shared Redis/database store for deployment-wide quotas and key authenticated quotas by the authenticated identity. Keep unauthenticated/login limits as well; do not key by a user-supplied ID header.

## Incorrect

```ts
export const expensive = limiter.define('expensive', ({ request }) =>
  limiter.allowRequests(10).every('1 minute')
    .usingKey(request.header('x-user-id')!)
    .store('memory')
)
```

## Correct

```ts
import limiter from '@adonisjs/limiter/services/main'
export const expensive = limiter.define('expensive', ({ auth }) =>
  limiter.allowRequests(10).every('1 minute')
    .usingKey(`user:${auth.getUserOrFail().id}`)
    .store('redis')
)
```

## Caveats and versions

v7; redis must be configured in config/limiter.ts. Apply this middleware after the auth middleware, e.g. route.use(middleware.auth()).use(expensive). Public/login throttles need pre-auth keys, typically IP with correctly configured trusted proxies; account-based limits need an explicit lockout-abuse tradeoff. These quota values are examples, not official defaults. Preserve 429/Retry-After behavior and choose a backend-outage policy deliberately.

## References

- https://docs.adonisjs.com/guides/security/rate-limiting.md
- https://docs.adonisjs.com/guides/basics/request.md
