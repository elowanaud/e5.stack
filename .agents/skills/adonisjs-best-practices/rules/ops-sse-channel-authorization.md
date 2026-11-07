---
title: "Authenticate subscription requests and authorize every private channel"
impact: CRITICAL
impactDescription: "Transmit channels without authorization callbacks are public"
tags: ops, sse
---

# Authenticate subscription requests and authorize every private channel

**Impact: CRITICAL**

## Rationale

Transmit channels without authorization callbacks are public. Authenticating the SSE connection alone does not populate the separate subscribe request’s user context or enforce resource ownership. Protect subscription requests and register an authorization rule for each sensitive channel pattern.

## Incorrect

```ts
transmit.registerRoutes((route) => {
  if (route.getPattern() === '__transmit/events') {
    route.middleware(middleware.auth())
  }
})
// A user-specific name does not itself restrict subscriptions.
transmit.broadcast(`users/${user.id}`, { invoiceId: invoice.id })
```

## Correct

```ts
// start/routes.ts
transmit.registerRoutes((route) => {
  if (route.getPattern() === '__transmit/subscribe') {
    route.middleware(middleware.auth())
  }
})

// start/transmit.ts, registered as a preload.
transmit.authorize<{ id: string }>('users/:id', (ctx, { id }) => {
  return String(ctx.auth.user?.id) === id && ctx.auth.user !== undefined
})
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Use tenant membership/policies for resource channels, not just an ID match. Token clients attach Authorization with beforeSubscribe; native browser EventSource cannot send arbitrary headers. Review post-subscription permission revocation separately; subscription authorization is not continuous reauthorization. Configure a shared transport when broadcasting across replicas and verify proxy buffering/timeouts. Transmit is not a durable replayable job/event log.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/server-sent-events.md
