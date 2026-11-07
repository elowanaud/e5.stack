---
title: "Choose rollback or truncation to match actual database execution"
impact: HIGH
impactDescription: "Tests need a disposable database and per-test cleanup"
tags: test, database
---

# Choose rollback or truncation to match actual database execution

**Impact: HIGH**

## Rationale

Tests need a disposable database and per-test cleanup. Global transaction rollback is fast when the code uses the same process/connection transaction; it cannot isolate an external worker, browser server in another process or unrelated connection. Use truncation/reset for committed multi-process behavior.

## Incorrect

```ts
// Wrong for tests asserting a separately running worker sees committed rows.
test.group('Worker integration', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())
})
```

## Correct

```ts
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

// Dedicated integration database; no competing test processes share its tables.
test.group('Worker integration', (group) => {
  group.each.setup(() => testUtils.db().truncate())
})
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

The example configures a group’s isolation, not a complete integration test. Migrate once in runner setup or use the documented truncate hook; target every named database connection used. Configure .env.test to a separate database before executing destructive utilities. Await worker completion and stop external work before truncation. Transaction-wrapped tests do not exercise the real commit-to-queue boundary: include an appropriate committed integration test when changing it. Parallel workers need separate databases/schemas or coordinated ownership, not a shared global rollback/truncate assumption.

## Sources

- https://docs.adonisjs.com/guides/testing/resetting-state-between-tests.md
- https://japa.dev/docs/lifecycle-hooks
