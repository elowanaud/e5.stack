---
title: "Acquire and release the same owned lock with a bounded wait"
impact: HIGH
impactDescription: "Lock creation is not lock acquisition"
tags: ops, lock
---

# Acquire and release the same owned lock with a bounded wait

**Impact: HIGH**

## Rationale

Lock creation is not lock acquisition. Check acquisition before doing work, release the same owned instance in finally, and bound request-time contention instead of waiting indefinitely. Force-releasing a competitor’s lock breaks mutual exclusion.

## Incorrect

```ts
const lock = lockManager.createLock(`report:${reportId}`, '30s')
await lock.acquireImmediately()
await report.save()
await lockManager.createLock(`report:${reportId}`).forceRelease()
```

## Correct

```ts
import lockManager from '@adonisjs/lock/services/main'

// Partial service method; report and reportId are in scope.
const lock = lockManager.createLock(`report:${reportId}`, '30s')
const acquired = await lock.acquire({ retry: { timeout: '2s' } })
if (!acquired) throw new Error('Report is already being processed')
try {
  await report.save()
} finally {
  await lock.release()
}
```

## Applicability and caveats

**API baseline:** AdonisJS 7, `@adonisjs/lock` 2.1.0 with `@verrou/core` 0.5.2. The service import above assumes the lock provider is configured; the default store must be shared across coordinating processes. Confirm installed APIs when using other versions.

Use `run` for automatic release when indefinite waiting is acceptable; in this baseline it retries indefinitely and does not accept retry options. `runImmediately` skips work on contention and its acquired result must be handled. Reserve `forceRelease` for controlled administrative recovery. Serialized ownership credentials belong only in trusted storage.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/locks.md
- https://verrou.dev/docs/introduction
- https://registry.npmjs.org/@adonisjs/lock/2.1.0 (package/dependency provenance)
- https://registry.npmjs.org/@verrou/core/0.5.2 (package provenance)
