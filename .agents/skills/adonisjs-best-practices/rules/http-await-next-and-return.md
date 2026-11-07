---
title: Await downstream middleware and return when rejecting
impact: HIGH
impactDescription: Await next() to preserve the middleware pipeline and upstream response processing
tags: [adonisjs, http]
---

# Await downstream middleware and return when rejecting

Await next() to preserve the middleware pipeline and upstream response processing. A rejected request must not continue into the handler: return the rejection rather than sending a response and still invoking next.

## Incorrect

```ts
async handle({ auth, response }: HttpContext, next: NextFn) {
  if (!auth.isAuthenticated) response.unauthorized()
  next()
}
```

## Correct

```ts
async handle({ auth, response }: HttpContext, next: NextFn) {
  if (!auth.isAuthenticated) return response.unauthorized()
  await next()
}
```

## Caveats and versions

HttpContext and NextFn are type imports from @adonisjs/core/http and @adonisjs/core/types/http. v7. This illustrates a gate after authentication has been attempted; use generated auth middleware to actually authenticate, not isAuthenticated alone. Upstream code executes before the HTTP response is flushed.

## References

- https://docs.adonisjs.com/guides/basics/middleware.md
