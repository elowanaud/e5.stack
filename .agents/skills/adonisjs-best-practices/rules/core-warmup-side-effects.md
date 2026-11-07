---
title: Separate framework registration from runtime side effects
impact: HIGH
impactDescription: v7 tooling warms up providers and preload files to inspect routes
tags: [adonisjs, core]
---

# Separate framework registration from runtime side effects

v7 tooling warms up providers and preload files to inspect routes. Starting workers, timers, or external writes during warmup can unexpectedly run production operations during code generation. Put long-running runtime work in ready and release it in shutdown; keep route registration visible to tooling.

## Incorrect

```ts
// v7 provider
async start() {
  await this.worker.start()
}
```

## Correct

```ts
// Provider whose worker is an application-owned lifecycle service.
async ready() {
  await this.worker.start()
}

async shutdown() {
  await this.worker.stop()
}
```

## Caveats and versions

v7 warmup/run-mode distinction. this.worker is an application service initialized by the provider, not a built-in Adonis property. Never hide route or binding registration behind run-mode checks.

## References

- https://docs.adonisjs.com/guides/concepts/application-lifecycle.md
- https://docs.adonisjs.com/guides/concepts/service-providers.md
- https://docs.adonisjs.com/guides/concepts/codegen.md
