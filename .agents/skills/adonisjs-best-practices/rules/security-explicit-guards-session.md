---
title: Choose and enforce the intended auth guard
impact: CRITICAL
impactDescription: Use the configured guard matching the transport
tags: [adonisjs, security]
---

# Choose and enforce the intended auth guard

Use the configured guard matching the transport. Session authentication is appropriate for browser apps on the same top-level domain; opaque bearer tokens fit non-cookie clients. Multiple accepted guards mean OR, not stronger combined authentication. Login and logout through the guard, not a hand-written session flag.

## Incorrect

```ts
router.get('/api/profile', ({ session }) => {
  return { id: session.get('userId') }
})
```

## Correct

```ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
router.get('/api/profile', async ({ auth }) => {
  const user = auth.getUserOrFail()
  return { id: user.id }
}).use(middleware.auth({ guards: ['api'] }))
```

## Caveats and versions

v7; api must be a configured tokens guard in config/auth.ts. For a web/session endpoint use guards: ['web'], await auth.use('web').login(user) after verified credentials, and await auth.use('web').logout() on logout. Session middleware must precede auth initialization. Cookie-authenticated mutations need CSRF protection.

## References

- https://docs.adonisjs.com/guides/auth/session-guard.md
- https://docs.adonisjs.com/guides/auth/access-tokens-guard.md
