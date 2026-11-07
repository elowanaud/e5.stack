---
title: Manage device sessions without exposing session capabilities
impact: CRITICAL
impactDescription: Session IDs are bearer capabilities, and incomplete revocation can leave other devices authenticated
tags: [adonisjs, security, sessions]
---

# Manage device sessions without exposing session capabilities

An active-session endpoint must derive the user from authenticated context and return an allowlisted device representation, not raw session records or IDs. Session tagging is explicit: a user ID is not a session ID, and authentication does not automatically establish a queryable user-to-session index.

## Incorrect

```ts
// Trusts another user's submitted ID and exposes bearer session IDs/data.
return sessionCollection.tagged(request.input('userId'))
```

## Correct

```ts
import { inject } from '@adonisjs/core'
import { SessionCollection } from '@adonisjs/session'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ActiveSessionsController {
  constructor(protected sessionCollection: SessionCollection) {}

  // Protect this route with the configured session guard middleware.
  async index({ auth, session }: HttpContext) {
    const user = auth.getUserOrFail()
    const sessions = await this.sessionCollection.tagged(String(user.id))

    return sessions.map((entry) => {
      const loggedInAt = entry.data.device?.loggedInAt
      return {
        loggedInAt: typeof loggedInAt === 'string' ? loggedInAt : undefined,
        isCurrent: entry.id === session.sessionId,
      }
    })
  }
}
```

## Applicability and caveats

**Applicability**

- Use AdonisJS 7 with `@adonisjs/session >=8.0` and a tagging-capable store: `memory`, `redis`, or `database`. Multi-process production requires an appropriate shared store, not process-local memory.
- Do not hide unsupported-store errors behind an empty list. Configure a suitable store or explain that the feature is unsupported.
- The example assumes the application records `device.loggedInAt` at login in its documented timestamp format. Check scalar types even for server-side metadata: legacy or malformed values must not turn a timestamp into an arbitrary nested object. Never return whole `device` or session objects, or bearer session IDs.

**Tag lifecycle**

- Call `session.tag(String(user.id))` **after** `auth.use('web').login(user)`, which regenerates the session ID. Query with the same string conversion.
- Untag on logout: logout alone preserves the session ID and other data. Before changing identity, untag the previous user; Redis retagging can retain the old user's index membership.
- To list sessions recreated by remember-me authentication, use the documented authentication-succeeded listener.

**Owned revocation**

- For “log out other devices,” enumerate only the authenticated user's tagged sessions and destroy selected owned sessions. A raw client-supplied session ID is not proof of ownership. Preserve the current session only when the product contract requires it.
- Revoke configured remember-me tokens when they must not recreate access; session invalidation alone is insufficient. Access-token guards use a separate revocation mechanism.
- Treat device headers as untrusted display data, never authorization evidence. Session metadata may contain personal information.

**Persistence and concurrency limits**

- Since `@adonisjs/session` 8.2, a newly tagged session and its tag persist with the end-of-request session write. Earlier versions wrote the tag immediately; the database store could create a row without session data.
- Redis Cluster cannot transact across keys in different slots. During separate data/index writes, concurrent `tagged()` cleanup can remove an ID, leaving an authenticated session absent from its user's tag set until tagged again.
- The database store writes `user_id` and session data in one query. That atomic row write does not make enumeration exclude concurrent logins or remember-me recreation.
- Enumeration alone is not universally race-free account-wide revocation. A stronger global revocation promise requires establishing the installed session version, store guarantees, and concurrent-authentication policy first. Do not invent a fallback or claim enumeration alone satisfies that policy.

## Official sources

- https://docs.adonisjs.com/guides/basics/session-tagging.md
- https://docs.adonisjs.com/guides/auth/session-guard.md
