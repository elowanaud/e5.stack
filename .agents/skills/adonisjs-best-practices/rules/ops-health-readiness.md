---
title: "Separate cheap liveness from dependency readiness and private diagnostics"
impact: HIGH
impactDescription: "A dependency outage should remove an instance from traffic, not trigger an endless restart loop"
tags: ops, health
---

# Separate cheap liveness from dependency readiness and private diagnostics

**Impact: HIGH**

## Rationale

A dependency outage should remove an instance from traffic, not trigger an endless restart loop. Keep liveness lightweight, reflect readiness failures with 503, and avoid exposing detailed infrastructure reports publicly.

## Incorrect

```ts
// Partial controller action configured as the liveness probe.
async live({ response }: HttpContext) {
  const report = await healthChecks.run()
  return response.ok(report) // Also returns 200 when dependencies fail.
}
```

## Correct

```ts
// Partial health controller; healthChecks is the configured checker.
async live({ response }: HttpContext) {
  return response.ok()
}

async ready({ response }: HttpContext) {
  const report = await healthChecks.run()
  if (!report.isHealthy) {
    return response.serviceUnavailable({ healthy: false })
  }
  return response.ok({ healthy: true })
}
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Register checks for dependencies actually needed to serve the relevant traffic. Keep detailed reports on a protected/network-restricted monitoring route; public minimal readiness may be acceptable. Avoid storing a monitoring secret in source. Caching readiness results trades check load for detection delay. Match orchestrator thresholds and startup/grace timing to real initialization behavior.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/health-checks.md
