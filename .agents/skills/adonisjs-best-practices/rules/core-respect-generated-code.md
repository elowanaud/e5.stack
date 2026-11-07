---
title: Regenerate rather than hand-maintain generated indexes
impact: HIGH
impactDescription: In v7, generated modules are source inputs, not disposable build output
tags: [adonisjs, core]
---

# Regenerate rather than hand-maintain generated indexes

In v7, generated modules are source inputs, not disposable build output. Let configured generators discover entities and routes; commit .adonisjs files used by the application. Hand edits disappear on regeneration and can misrepresent real routes.

## Incorrect

```ts
// Editing .adonisjs/server/controllers.ts by hand:
export const controllers = { Posts: () => import('#controllers/posts_controller') }
```

## Correct

```ts
// adonisrc.ts — v7, minimal entity indexing configuration
import { defineConfig } from '@adonisjs/core/app'
import { indexEntities } from '@adonisjs/core/generators'
export default defineConfig({
  hooks: { init: [indexEntities()] },
})
```

## Caveats and versions

v7-only generator configuration. Merge this into existing configuration, preserving providers and package hooks. After source changes or resolving conflicts, regenerate with node ace codegen when execution is authorized; do not run it merely to inspect an untrusted repository.

## References

- https://docs.adonisjs.com/guides/concepts/codegen.md
- https://docs.adonisjs.com/v6-to-v7.md
