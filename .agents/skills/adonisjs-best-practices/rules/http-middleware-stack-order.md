---
title: Order middleware by lifecycle dependencies
impact: HIGH
impactDescription: Server middleware runs even for unmatched routes; router middleware runs after matching; named middleware runs only where applied
tags: [adonisjs, http]
---

# Order middleware by lifecycle dependencies

Server middleware runs even for unmatched routes; router middleware runs after matching; named middleware runs only where applied. Put CORS in the server stack so preflights are handled before authentication. Parse bodies before handlers, load sessions before session authentication, and authenticate before authorization.

## Incorrect

```ts
// start/kernel.ts — misses unmatched requests and may reject preflights
router.use([
  () => import('#middleware/auth_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])
```

## Correct

```ts
// Merge into start/kernel.ts, preserving other required middleware.
server.use([() => import('@adonisjs/cors/cors_middleware')])
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/session/session_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
])
```

## Caveats and versions

v7 stack model. server and router are imports from @adonisjs/core/services/server and /router. Include session middleware only when sessions are installed. Project-generated container bindings and Bouncer initialization must remain registered; this is an ordering excerpt, not a replacement kernel.

## References

- https://docs.adonisjs.com/guides/basics/middleware.md
- https://docs.adonisjs.com/guides/security/cors.md
- https://docs.adonisjs.com/guides/auth/session-guard.md
