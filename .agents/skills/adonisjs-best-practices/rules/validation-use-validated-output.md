---
title: "Persist the validated output, never the original request object"
impact: CRITICAL
tags: validation, adonisjs-v7
---

# Persist the validated output, never the original request object

**Impact: CRITICAL**

**Version scope:** AdonisJS v7 integration with independently versioned VineJS. Confirm the installed VineJS supports the shown `vine.create` API.

Persist the validator's typed, normalized output, not the original `request.all()`. Define an action-specific allowlist of writable fields; keep ownership, roles, and privileged flags server-controlled. Selecting input is not validation, and a `request.except(['password'])` denylist still admits every other present or future field.

## Incorrect

```ts
const user = auth.getUserOrFail()
await request.validateUsing(updateProfileValidator)
user.merge(request.all()) // Discards the validated, normalized output.
await user.save()
```

## Correct

```ts
// app/validators/profile.ts
import vine from '@vinejs/vine'

export const updateProfileValidator = vine.create({
  fullName: vine.string().trim().minLength(1).maxLength(100),
})

// Authenticated controller action; request/auth come from HttpContext,
// and updateProfileValidator is imported from #validators/profile.
const user = auth.getUserOrFail()
const payload = await request.validateUsing(updateProfileValidator)
user.merge(payload)
await user.save()
```

## Caveats

Unknown object properties are stripped by default, not rejected. `allowUnknownProperties()` copies unvalidated unknown data into the output: avoid it for persistence payloads. If accepting an extension record, explicitly validate that subtree and keep it separate from model `merge`. Validation is not HTML sanitization, authorization, ownership enforcement, or a guarantee of future database state; retain authorization, database constraints, and upload/body-parser limits.

## Official sources

- https://docs.adonisjs.com/guides/basics/validation.md
- https://vinejs.dev/docs/types/object
- https://docs.adonisjs.com/guides/basics/request.md
