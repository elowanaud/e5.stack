---
title: Import injectable classes as runtime values
impact: HIGH
impactDescription: The container needs class constructors at runtime
tags: [adonisjs, core]
---

# Import injectable classes as runtime values

The container needs class constructors at runtime. Type-only imports and interfaces disappear after TypeScript compilation, so they cannot identify injectable dependencies. Use the existing container pattern rather than manually constructing a tree of services.

## Incorrect

```ts
import type InvoiceService from '#services/invoice_service'
import { inject } from '@adonisjs/core'
@inject()
export default class InvoicesController {
  constructor(private invoices: InvoiceService) {}
}
```

## Correct

```ts
import InvoiceService from '#services/invoice_service'
import { inject } from '@adonisjs/core'
@inject()
export default class InvoicesController {
  constructor(private invoices: InvoiceService) {}
}
```

## Caveats and versions

v7 class injection. Keep type-only imports for ordinary annotations such as controller HttpContext when it is not being injected. Middleware supports constructor injection, not handle-method injection. Interfaces/configuration require explicit container factories or runtime tokens.

## References

- https://docs.adonisjs.com/guides/concepts/dependency-injection.md
- https://docs.adonisjs.com/guides/basics/middleware.md
