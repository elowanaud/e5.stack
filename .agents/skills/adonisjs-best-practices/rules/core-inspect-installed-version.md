---
title: Inspect installed versions before choosing APIs
impact: CRITICAL
impactDescription: Match the installed framework and companion packages, not the latest documentation banner
tags: [adonisjs, core]
---

# Inspect installed versions before choosing APIs

Inspect the installed v7 framework and companion packages, not just the documentation banner. Read package.json, the lockfile, adonisrc.ts, package import aliases, and generated files before choosing a syntax or migration. A dependency range alone does not identify the resolved version.

## Incorrect

```ts
// Assuming optional scaffolding exists solely because core is v7.
import { controllers } from '#generated/controllers'
```

## Correct

```ts
// Use lazy controller imports when this is
// the convention established by the installed application.
import router from '@adonisjs/core/services/router'
const PostsController = () => import('#controllers/posts_controller')
router.get('/posts', [PostsController, 'index'])
```

## Caveats and versions

v7 only. v7 requires Node.js 24+ and configured codegen hooks for generated imports. Package majors are independent; inspect auth, Lucid, VineJS, and integration versions too. If the repository is not v7, report the incompatibility rather than silently upgrading it or applying these rules as a migration.

`HttpRequest` and `HttpResponse` are valid v7 exports from `@adonisjs/core/http` (renamed from `Request` and `Response`); do not mistake them for optional generated scaffolding.

## References

- https://docs.adonisjs.com/v6-to-v7.md
- https://docs.adonisjs.com/guides/basics/routing.md
