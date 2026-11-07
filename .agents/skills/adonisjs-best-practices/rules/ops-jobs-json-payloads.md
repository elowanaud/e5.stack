---
title: "Dispatch serializable identifiers and reload authoritative job state"
impact: HIGH
impactDescription: "Queue payloads pass through JSON, including with the sync adapter"
tags: ops, jobs
---

# Dispatch serializable identifiers and reload authoritative job state

**Impact: HIGH**

## Rationale

Queue payloads pass through JSON, including with the sync adapter. Models lose prototypes and dates become strings; closures, request contexts, streams and BigInt cannot be treated as portable payloads. Prefer small identifiers and explicit primitives.

## Incorrect

```ts
// Incorrect payload design: expects model methods and HTTP context in a worker.
await GenerateInvoice.dispatch({ order, auth, generatedAt: new Date() })
```

## Correct

```ts
// Partial dispatch: GenerateInvoice declares this exact payload shape.
await GenerateInvoice.dispatch({
  orderId: order.id,
  requestedBy: auth.user!.id,
  requestedAt: new Date().toISOString(),
})

// Partial execute() of that existing job, not a full job implementation.
const order = await Order.findOrFail(this.payload.orderId)
```

## Applicability and caveats

V7-only @adonisjs/queue example (core >=7.6, experimental); the serialization boundary also applies to other persistent queues.

Reload and recheck state or authorization when business rules require it; an identifier alone is not authorization. Explicitly decide which data must be snapshotted (for example an invoice revision) rather than silently recalculating changed values later. Keep secrets out of stored payloads and job diagnostics.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/queues.md
