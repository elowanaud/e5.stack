---
title: "Reuse managed Redis connections and close resources you own"
impact: HIGH
impactDescription: "Creating clients per request leaks sockets and increases connection overhead"
tags: ops, redis
---

# Reuse managed Redis connections and close resources you own

**Impact: HIGH**

## Rationale

Creating clients per request leaks sockets and increases connection overhead. The Redis service caches named connections for the process lifetime. Put custom clients and other long-lived resources under provider lifecycle ownership, with graceful cleanup rather than per-request disconnects.

## Incorrect

```ts
import { Redis } from 'ioredis'

// Partial action: creates an unmanaged connection every request.
const connection = new Redis(process.env.REDIS_URL!)
return connection.get(`settings:${user.id}`)
```

## Correct

```ts
import redis from '@adonisjs/redis/services/main'

// Partial action: reuse the framework-managed connection.
return redis.connection('main').get(`settings:${user.id}`)
```

For a custom client that cannot use the service, pair creation and cleanup:

```ts
import { Redis } from 'ioredis'
import env from '#start/env'

export default class CustomRedisProvider {
  #client?: Redis

  async ready() {
    // REDIS_URL must be declared in the application env schema.
    this.#client = new Redis(env.get('REDIS_URL'))
  }

  async shutdown() {
    await this.#client?.quit()
  }
}
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Register a custom provider only in the environments needing it. Do not close the shared framework connection after an individual HTTP request, or duplicate provider cleanup for resources you do not own. Quit is graceful; disconnect is immediate. Also clean up custom subscriptions, timers, workers and SDKs. Startup failures may require cleanup of partially initialized resources.

## Sources

- https://docs.adonisjs.com/guides/database/redis.md
- https://docs.adonisjs.com/guides/concepts/service-providers.md
- https://github.com/redis/ioredis
