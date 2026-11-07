---
title: "Use a persistent queue and deploy its workers explicitly"
impact: HIGH
impactDescription: "Returning from a web request is not proof that background work will survive a restart"
tags: ops, jobs
---

# Use a persistent queue and deploy its workers explicitly

**Impact: HIGH**

## Rationale

Returning from a web request is not proof that background work will survive a restart. The sync adapter runs inline, while persistent Redis/database adapters need separately running workers for their selected queues and adapters.

## Incorrect

```ts
// Production config fragment: executes work in the request process.
adapters: { sync: drivers.sync() },
default: 'sync',
```

## Correct

```ts
import { defineConfig, drivers } from '@adonisjs/queue'

export default defineConfig({
  default: 'redis',
  adapters: { redis: drivers.redis({ connectionName: 'main' }) },
  worker: { concurrency: 5, idleDelay: '2s' },
  locations: ['./app/jobs/**/*.{ts,js}'],
})
```

Deploy a separate supervised process using the built application: `node ace queue:work --queue=emails`. Start a worker for each adapter used by the selected queues; configure concurrency against downstream and database capacity.

## Applicability and caveats

V7-only integration: current @adonisjs/queue requires @adonisjs/core >=7.6 and is experimental.

Persistent storage still needs appropriate persistence/availability settings, failure monitoring, and shutdown grace. Pin the experimental package version and apply queue:migrate during upgrades before new processes use old storage. Check the installed core minor and package compatibility before adopting the integration; do not silently upgrade.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/queues.md
- https://github.com/boringnode/queue
