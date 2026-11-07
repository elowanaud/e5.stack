---
title: Keep CSRF protection on cookie-authenticated mutations
impact: CRITICAL
impactDescription: Browsers attach session cookies automatically; JSON bodies or an /api prefix do not make those mutations immune to CSRF
tags: [adonisjs, security]
---

# Keep CSRF protection on cookie-authenticated mutations

Browsers attach session cookies automatically; JSON bodies or an /api prefix do not make those mutations immune to CSRF. Keep Shield enabled for unsafe methods and submit its token. Exempt only precisely identified external endpoints with their own verified authentication.

## Incorrect

```ts
// config/shield.ts
export default defineConfig({
  csrf: { enabled: false },
})
```

## Correct

```ts
import { defineConfig } from '@adonisjs/shield'
export default defineConfig({
  csrf: {
    enabled: true,
    exceptRoutes: ['/webhooks/payment-provider'],
    enableXsrfCookie: false,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },
})
```

## Caveats and versions

v7 partial Shield config: preserve other guards when merging. Register sessions before Shield; render csrfField() in Edge forms or use the documented token/header flow for JavaScript. The exempt webhook needs verified provider signatures before side effects. Bearer-only endpoints can have a different CSRF threat model, but mixed session/bearer endpoints still need cookie protection.

## References

- https://docs.adonisjs.com/guides/security/securing-ssr-applications.md
- https://docs.adonisjs.com/guides/auth/session-guard.md
