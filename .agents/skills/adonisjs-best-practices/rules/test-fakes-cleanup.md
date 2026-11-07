---
title: "Register fake cleanup before any assertion or side effect can throw"
impact: HIGH
impactDescription: "Fakes and container swaps change process-wide service behavior"
tags: test, fakes
---

# Register fake cleanup before any assertion or side effect can throw

**Impact: HIGH**

## Rationale

Fakes and container swaps change process-wide service behavior. Restoring them only at the end of a happy path leaks state after failures, contaminating later tests. Use scoped explicit resource management or Japa cleanup registered immediately after setup.

## Incorrect

```ts
test('queues a welcome email', async ({ client }) => {
  const fake = mail.fake()
  await client.post('/signup').json(payload)
  fake.mails.assertQueued(WelcomeEmail)
  mail.restore() // Skipped when the request or assertion throws.
})
```

## Correct

```ts
// Partial test: payload and WelcomeEmail are existing application fixtures.
test('queues a welcome email', async ({ client, cleanup }) => {
  const fake = mail.fake()
  cleanup(() => mail.restore())

  await client.post('/signup').json(payload)
  fake.mails.assertQueued(WelcomeEmail)
})
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Current built-in fakes also support using fake = mail.fake() for automatic restoration when the runtime/toolchain supports Explicit Resource Management. Restore Drive disks, emitter/hash fakes, container swaps, clock stubs and custom resources similarly. Assert queued versus sent intentionally. A fake confirms an interaction, not durable dispatch, rendered template correctness or provider delivery. Keep real database tests for SQL constraints/queries; do not globally fake auth/hashing when testing those mechanisms.

## Sources

- https://docs.adonisjs.com/guides/testing/test-doubles.md
- https://japa.dev/docs/lifecycle-hooks
