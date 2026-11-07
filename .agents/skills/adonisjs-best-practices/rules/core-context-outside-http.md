---
title: Pass durable identity to jobs instead of an ambient HTTP context
impact: HIGH
impactDescription: An HTTP context is not a background-job identity or a durable authorization grant
tags: [adonisjs, core]
---

# Pass durable identity to jobs instead of an ambient HTTP context

An HTTP context is not a background-job identity or a durable authorization grant. Async-local lookup reads the current async scope, not whether a response is still active. Independent jobs normally have no request scope, while detached async descendants of a request may inherit its stale context after the response. Pass explicit identifiers to non-HTTP code and let it load current state; do not retain request objects after the response.

## Incorrect

```ts
import { HttpContext } from '@adonisjs/core/http'
export async function generateReport() {
  const user = HttpContext.getOrFail().auth.getUserOrFail()
  return { requestedBy: user.id }
}
```

## Correct

```ts
export async function generateReport(requestedBy: number) {
  return { requestedBy }
}

// Within the authenticated controller action:
const user = auth.getUserOrFail()
return generateReport(user.id)
```

## Caveats and versions

Function returns report metadata to illustrate the boundary, not a queue API. Perform needed authorization again when a delayed operation executes. ALS requires explicit configuration. `HttpContext.getOrFail()` throws when ALS is disabled or its async-local store has no context; it does not check response completion and is not a lifecycle or authorization guard. Prefer explicit arguments or DI; do not enable ALS simply to avoid passing one argument.

## References

- https://docs.adonisjs.com/guides/basics/http-context.md
- https://nodejs.org/api/async_context.html#asynclocalstoragegetstore
- https://github.com/adonisjs/http-server/blob/8.x/src/http_context/main.ts
