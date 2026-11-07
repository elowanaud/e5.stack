---
title: "Give omission and null distinct PATCH semantics"
impact: HIGH
tags: validation, adonisjs-v7
---

# Give omission and null distinct PATCH semantics

**Impact: HIGH**

**Version scope:** AdonisJS v7 integration with the independently versioned VineJS 4 API. The persistence example uses Lucid model `merge`/`save`; confirm the installed packages support the shown APIs.

Choose modifiers according to the endpoint contract. `optional()` alone accepts null but removes it from output, so it cannot represent clearing a nullable column. `nullable()` requires the key but preserves null. Combine `nullable().optional()` for a PATCH field where omission means unchanged and null means clear.

## Incorrect

```ts
const updateProfileValidator = vine.create({
  bio: vine.string().optional(),
})
// { bio: null } becomes an omitted field, so merge will not clear bio.
```

## Correct

```ts
import vine from '@vinejs/vine'

export const updateProfileValidator = vine.create({
  bio: vine.string().maxLength(2000).nullable().optional(),
})

const payload = await request.validateUsing(updateProfileValidator)
auth.user!.merge(payload)
await auth.user!.save()
// {}: unchanged; { bio: null }: cleared; { bio: 'Hello' }: updated.
```

## Caveats

The database column must also permit null. Read the project's `convertEmptyStringsToNull` configuration: HTML empty fields may normalize to null and thus clear a nullable field. An absent nested object and an object containing absent children have different semantics; define them intentionally. Use merge rather than fill for partial updates because fill replaces the model's attribute set.

## Official sources

- https://vinejs.dev/docs/schema_101
- https://vinejs.dev/docs/html_forms_and_surprises
- https://lucid.adonisjs.com/docs/crud-operations
