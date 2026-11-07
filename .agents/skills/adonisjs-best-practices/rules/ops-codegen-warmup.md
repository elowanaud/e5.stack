---
title: "Refresh route-derived output before CI typechecking"
impact: HIGH
impactDescription: "A stale generated client contract can typecheck while omitting real route changes"
tags: ops, codegen
---

# Refresh route-derived output before CI typechecking

**Impact: HIGH**

CI has no development watcher to refresh route-derived modules. Typechecking against yesterday's generated registry can pass even though the application's routes changed. Regenerate from the resolved route table before checking consumers.

## Incorrect

```sh
# Application root; route definitions changed, generated output did not.
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
node ace build
```

## Correct

```sh
# Application root; dependencies and codegen integrations are configured.
pnpm install --frozen-lockfile
node ace codegen
pnpm exec tsc --noEmit
node ace build
```

Use the application's existing typecheck command where it differs. Commit the regenerated `.adonisjs` modules used as build inputs; resolve generated-file conflicts by merging their sources and regenerating, not hand-editing registry entries.

## Applicability and caveats

AdonisJS v7 distinguishes file-based generation from route-based output. Test-runner/build initialization does not refresh every route-derived contract; do not infer freshness from a successful build alone.

Codegen warms up providers and preloads to discover routes. Registration must describe the running application's routes in that mode; operational work must not start merely because tooling inspects the app. Keep producer and consumer package versions compatible when distributing generated client contracts.

## Sources

- https://docs.adonisjs.com/guides/concepts/codegen.md
- https://docs.adonisjs.com/guides/frontend/api-client.md
