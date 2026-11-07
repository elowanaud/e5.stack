---
title: "Create reusable validators once and clone mutable schema fragments"
impact: MEDIUM
tags: validation, adonisjs-v7
---

# Create reusable validators once and clone mutable schema fragments

**Impact: MEDIUM**

**Version scope:** AdonisJS v7 integration with the independently versioned VineJS 4 API. Confirm the installed VineJS version supports the shown APIs.

VineJS precompiles a schema into an optimized validator. Create static validators at module scope rather than rebuilding them for every request. Schema builder methods mutate the underlying instances; clone fragments when deriving differently constrained fields so changes do not silently affect another validator.

## Incorrect

```ts
const name = vine.string().trim()
const createSchema = vine.object({ name })
const patchSchema = vine.object({ name: name.maxLength(20).optional() })
// maxLength changed the shared name instance used by createSchema too.

async function store({ request }: HttpContext) {
  const validator = vine.create(createSchema)
  return request.validateUsing(validator)
}
```

## Correct

```ts
import vine from '@vinejs/vine'

const name = vine.string().trim().minLength(1)

export const createUserValidator = vine.create({
  name: name.clone().maxLength(100),
})

export const updateUserValidator = vine.create({
  name: name.clone().maxLength(20).optional(),
})

// Controller action with createUserValidator imported:
const payload = await request.validateUsing(createUserValidator)
```

## Caveats

Explicit independent schemas are often simpler than a generic schema composition framework. Keep create/update authorization differences visible rather than blindly making every create field optional. Supply request-specific options through typed metadata rather than mutating shared validators. `vine.create` is the current documented VineJS API; check the independently versioned installed package before introducing newly documented composition helpers.

## Official sources

- https://vinejs.dev/docs/getting_started
- https://vinejs.dev/docs/schema_101
- https://docs.adonisjs.com/guides/basics/validation.md
