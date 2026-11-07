---
title: Keep request context out of shared singletons
impact: CRITICAL
impactDescription: HttpContext, authenticated users, tenant identity, and request loggers belong to one request
tags: [adonisjs, core]
---

# Keep request context out of shared singletons

HttpContext, authenticated users, tenant identity, and request loggers belong to one request. Capturing them in process-global variables or singleton fields leaks state between concurrent users. Pass request-scoped values explicitly or resolve services with the request resolver.

## Incorrect

```ts
import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'

let currentUserId: number
router.get('/me', async ({ auth }) => {
  currentUserId = auth.getUserOrFail().id
  const profile = await db.from('profiles')
    .where('user_id', currentUserId).select('display_name').first()
  // Another request can overwrite the global while the query is pending.
  return { id: currentUserId, displayName: profile?.display_name ?? null }
})
```

## Correct

```ts
import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'

router.get('/me', async ({ auth }) => {
  const userId = auth.getUserOrFail().id
  const profile = await db.from('profiles')
    .where('user_id', userId).select('display_name').first()
  return { id: userId, displayName: profile?.display_name ?? null }
})
```

## Caveats and versions

AdonisJS v7; the example assumes an existing `profiles` table with `user_id` and `display_name`, and authentication middleware protecting the route. Both variants perform the same useful database I/O; only request-state ownership differs. To reproduce the race, overlap two authenticated requests while the first query is deliberately held pending in an isolated test. A shared mutable ID can then mismatch the returned profile; a request-local ID cannot.

Do not register an injected context-bearing service as a singleton. Use `ctx.containerResolver`, rather than the global container, when manually constructing context-dependent services.

## References

- https://docs.adonisjs.com/guides/basics/http-context.md
- https://docs.adonisjs.com/guides/concepts/dependency-injection.md
