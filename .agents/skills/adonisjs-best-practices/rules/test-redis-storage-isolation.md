---
title: "Use dedicated test storage before destructive cleanup"
impact: HIGH
impactDescription: "Redis flushdb deletes the entire selected database; key prefixes do not protect other keys from it"
tags: test, redis
---

# Use dedicated test storage before destructive cleanup

**Impact: HIGH**

## Rationale

Redis flushdb deletes the entire selected database; key prefixes do not protect other keys from it. Tests and parallel workers must not share production/development Redis, queue storage or Drive paths. Isolate resources before enabling cleanup and restore them even when tests fail.

## Incorrect

```ts
// A prefix is not an isolation boundary for FLUSHDB.
await redis.set('test:session', 'value')
await redis.flushdb() // Deletes unrelated keys in the selected database too.
```

## Correct

```ts
// Partial group: “tests” is configured to a dedicated disposable Redis DB.
// Application code under test must use that same dedicated target.
const testRedis = redis.connection('tests')
test.group('Redis integration', (group) => {
  group.each.setup(async () => {
    await testRedis.flushdb()
    return () => testRedis.flushdb()
  })
})
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Only use whole-database cleanup when the process/group exclusively owns the target. Parallel tests need per-worker databases/instances, or delete only their owned keys when exercising prefix-compatible code. Redis Cluster does not provide ordinary selectable databases: use an isolated instance or explicit key ownership. Set the app’s effective test connection/storage configuration, not just unused .env names. Drive fakes or Japa filesystem cleanup avoid deleting real user uploads; drain/stop queue consumers before resetting queue state.

## Sources

- https://docs.adonisjs.com/guides/testing/resetting-state-between-tests.md
- https://docs.adonisjs.com/guides/testing/test-doubles.md
- https://japa.dev/docs/lifecycle-hooks
