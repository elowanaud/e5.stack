---
title: "Deploy the standalone build with runtime dependencies and assets"
impact: HIGH
impactDescription: "The TypeScript dev server is not the production artifact"
tags: ops, build
---

# Deploy the standalone build with runtime dependencies and assets

**Impact: HIGH**

## Rationale

The TypeScript dev server is not the production artifact. Adonis builds JavaScript and copies configured meta files; missing templates, translations or runtime dependencies make a dev-working feature fail after deployment. Build tooling needs development dependencies, while the final runtime uses production dependencies.

## Incorrect

```ts
// Partial adonisrc.ts: runtime templates are not copied.
metaFiles: [],
// Production must not depend on node ace serve --hmr or TypeScript loaders.
```

## Correct

```ts
// Partial adonisrc.ts for an app using Edge and translations.
metaFiles: [
  { pattern: 'resources/views/**/*.edge', reloadServer: false },
  { pattern: 'resources/lang/**/*.{json,yaml,yml}', reloadServer: false },
  { pattern: 'public/**', reloadServer: false },
],
hooks: {
  buildStarting: [() => import('@adonisjs/vite/build_hook')],
},
```

Build with `node ace build` after installing build dependencies. Treat `build/` as the application root, install its locked production dependencies, supply environment configuration separately, and run `node bin/server.js` there.

## Applicability and caveats

AdonisJS v7 production workflow and hooks; check exact installed package/minor requirements without silently upgrading.

AdonisJS v7 requires Node >=24; align development, CI, workers and production. Include Vite only when used; current integration targets Vite >=8. Run database migrations through the deployment lifecycle before serving incompatible traffic. Do not use ignore-ts-errors as a permanent deployment strategy. Package-manager workspace deployments may need their existing workspace-aware install/pruning convention, not blindly copied npm commands.

## Sources

- https://docs.adonisjs.com/deployment.md
- https://docs.adonisjs.com/guides/frontend/vite.md
- https://docs.adonisjs.com/guides/digging-deeper/i18n.md
