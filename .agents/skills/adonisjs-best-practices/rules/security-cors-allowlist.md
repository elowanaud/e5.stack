---
title: Allowlist browser origins explicitly in production
impact: HIGH
impactDescription: The default origin reflection is convenient locally but should not be deployed for private cookie-authenticated browser APIs
tags: [adonisjs, security]
---

# Allowlist browser origins explicitly in production

The default origin reflection is convenient locally but should not be deployed for private cookie-authenticated browser APIs. Use exact trusted origins and only needed methods/headers. CORS controls browser access, not server-side authentication or authorization.

## Incorrect

```ts
import { defineConfig } from '@adonisjs/cors'
export default defineConfig({ origin: true, credentials: true })
```

## Correct

```ts
import { defineConfig } from '@adonisjs/cors'
export default defineConfig({
  origin: ['https://app.example.com'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  headers: ['Content-Type', 'Accept', 'Authorization', 'X-CSRF-TOKEN'],
  credentials: true,
})
```

## Caveats and versions

v7; customize origins and headers to the real frontend. Same-origin applications can disallow cross-origin access entirely. A deliberately public noncredentialed API may allow *. Do not use startsWith hostname checks or assume wildcard plus credentials is restrictive: this package can reflect the origin in that combination. Install CORS in the server stack for preflights.

## References

- https://docs.adonisjs.com/guides/security/cors.md
