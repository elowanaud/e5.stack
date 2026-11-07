---
title: Preserve exception semantics and disable production debug output
impact: HIGH
impactDescription: Let the framework handle validation, authentication, authorization, and not-found exceptions unless the endpoint contract genuinely differs
tags: [adonisjs, http]
---

# Preserve exception semantics and disable production debug output

Let the framework handle validation, authentication, authorization, and not-found exceptions unless the endpoint contract genuinely differs. Catch-all responses erase status codes and can leak database errors or stack traces. Keep reporting separate from rendering.

## Incorrect

```ts
try {
  return await request.validateUsing(createPostValidator)
} catch (error) {
  return response.ok({ error: String(error) })
}
```

## Correct

```ts
import app from '@adonisjs/core/services/app'
import { ExceptionHandler } from '@adonisjs/core/http'
export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction
}
```

## Caveats and versions

v7 global handler shape. Retain existing custom handling and report overrides; delegate unknown errors to super.handle. Do not expose raw exception messages in bespoke 500 responses. JSON clients should send the correct Accept header rather than forcing every SSR failure into JSON.

## References

- https://docs.adonisjs.com/guides/basics/exception-handling.md
- https://docs.adonisjs.com/guides/basics/validation.md
