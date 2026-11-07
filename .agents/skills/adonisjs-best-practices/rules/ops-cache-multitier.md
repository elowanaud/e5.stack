---
title: "Synchronize process-local cache layers across replicas"
impact: HIGH
impactDescription: "Sharing L2 Redis does not make each process’s L1 memory disappear"
tags: ops, cache
---

# Synchronize process-local cache layers across replicas

**Impact: HIGH**

## Rationale

Sharing L2 Redis does not make each process’s L1 memory disappear. Use the documented invalidation bus with multi-tier caches so writes and deletes can evict stale local copies on other instances.

## Incorrect

```ts
// Partial config used by multiple replicas: no invalidation bus.
redis: store()
  .useL1Layer(drivers.memory({ maxSize: '100mb' }))
  .useL2Layer(drivers.redis({ connectionName: 'main' }))
```

## Correct

```ts
// Partial config/cache.ts; import store and drivers from @adonisjs/cache.
redis: store()
  .useL1Layer(drivers.memory({ maxSize: '100mb' }))
  .useL2Layer(drivers.redis({ connectionName: 'main' }))
  .useBus(drivers.redisBus({ connectionName: 'main' }))
```

## Applicability and caveats

AdonisJS v7 with the installed compatible version of @adonisjs/cache.

Single-instance apps may omit the bus; an L2-only cache is also valid. Bus invalidation is not a substitute for database consistency or authorization. Do not describe cache stampede protection as a general distributed business-operation lock.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/cache.md
- https://bentocache.dev/docs/introduction
