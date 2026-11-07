---
title: "Treat lock TTL as a lease, not permanent exclusivity"
impact: CRITICAL
impactDescription: "When a lease expires, another worker can acquire the same key while the original work continues"
tags: ops, lock
---

# Treat lock TTL as a lease, not permanent exclusivity

**Impact: CRITICAL**

## Rationale

When a lease expires, another worker can acquire the same key while the original work continues. Coordinate through a shared store, renew before expiry when needed, and keep correctness-critical uniqueness or transitions enforceable by the database or downstream system.

## Incorrect

```ts
// Memory locks do not coordinate distinct production processes.
const lock = lockManager.use('memory').createLock('catalog:rebuild', '1s')
await lock.run(async () => {
  await rebuildCatalog() // Existing application operation can exceed one second.
})
```

## Correct

```ts
import lockManager from '@adonisjs/lock/services/main'

// Partial worker: rebuildPage is an existing, bounded application operation.
const lock = lockManager.use('redis').createLock('catalog:rebuild', '30s')
if (!(await lock.acquireImmediately())) return
try {
  for (const page of pages) {
    await lock.extend('30s')
    await rebuildPage(page)
  }
} finally {
  await lock.release()
}
```

## Applicability and caveats

**API baseline:** AdonisJS 7, `@adonisjs/lock` 2.1.0 with `@verrou/core` 0.5.2. The example assumes a configured shared Redis lock store named `redis`; `pages` and `rebuildPage` belong to the application. Confirm installed APIs when using other versions.

The example requires each page to complete comfortably within the lease; renewal cannot make an unbounded network call safe. Propagate renewal failures and stop new work. A paused/partitioned process can outlive a lease: use constraints, conditional state transitions, fencing where supported, or provider idempotency for irreversible effects. Null TTL risks unrecoverable locks after crashes.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/locks.md
- https://registry.npmjs.org/@adonisjs/lock/2.1.0 (package/dependency provenance)
- https://registry.npmjs.org/@verrou/core/0.5.2 (package provenance)
