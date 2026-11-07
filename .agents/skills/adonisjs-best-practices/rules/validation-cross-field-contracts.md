---
title: "Express cross-field requirements in the validation schema"
impact: HIGH
tags: validation, adonisjs-v7
---

# Express cross-field requirements in the validation schema

**Impact: HIGH**

**Version scope:** AdonisJS v7 integration with the independently versioned VineJS 4 API. Confirm the installed VineJS version supports the shown APIs.

Independently optional fields do not express conditional requirements. Use conditional required rules for simple dependencies, and object groups/unions when the allowed output has distinct variants. This prevents invalid combinations from reaching persistence and gives consumers a usable type contract.

## Incorrect

```ts
const checkoutValidator = vine.create({
  delivery: vine.enum(['pickup', 'shipping']),
  address: vine.string().optional(),
})
// Shipping without an address passes.
```

## Correct

```ts
import vine from '@vinejs/vine'

export const checkoutValidator = vine.create({
  delivery: vine.enum(['pickup', 'shipping']),
  address: vine.string().trim().minLength(1).optional()
    .requiredWhen('delivery', '=', 'shipping'),
})
```

## Caveats

A conditional required rule makes a field required under that condition; it does not automatically forbid it in other cases, nor does it create a TypeScript discriminated union. Use `vine.group` with literal discriminants or a union when the application needs mutually distinct shapes, and define an explicit fallback/error for unmatched cases. Conditions read untrusted input, so do not assume unrelated fields have already been validated or coerced. Database/domain checks still belong where they can be enforced atomically.

## Official sources

- https://vinejs.dev/docs/conditional_validation
- https://vinejs.dev/docs/types/object
