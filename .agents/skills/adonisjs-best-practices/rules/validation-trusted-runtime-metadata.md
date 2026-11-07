---
title: "Pass trusted request context as typed validator metadata"
impact: CRITICAL
tags: validation, adonisjs-v7
---

# Pass trusted request context as typed validator metadata

**Impact: CRITICAL**

**Version scope:** AdonisJS v7 with independently versioned VineJS 4 and Lucid. The `unique` extension follows current Lucid 22.x documentation; confirm installed package support.

Reusable validators should receive runtime identity and tenant context through metadata, not mutable module globals or user-supplied fields. Type metadata to make required context visible to callers. Exclude the authorized target's own row when checking uniqueness on update, and scope tenant-local checks to the trusted tenant.

## Incorrect

```ts
const payload = await request.validateUsing(updateUserValidator, {
  meta: { userId: request.input('userId'), tenantId: request.input('tenantId') },
})
// The client chooses which row is excluded and which tenant is checked.
```

## Correct

```ts
// app/validators/profile.ts
import vine from '@vinejs/vine'

export const updateUserValidator = vine
  .withMetaData<{ userId: number; tenantId: number }>()
  .create({
    email: vine.string().email().unique({
      table: 'users',
      column: 'email',
      filter: (query, _value, field) => {
        query.where('tenant_id', field.meta.tenantId)
          .whereNot('id', field.meta.userId)
      },
    }),
  })

// Authenticated self-update action:
const user = auth.user!
const payload = await request.validateUsing(updateUserValidator, {
  meta: { userId: user.id, tenantId: user.tenantId },
})
user.merge(payload)
await user.save()
```

## Caveats

For administrative updates, derive metadata from the already-authorized target, not automatically the actor. Metadata typing is compile-time assistance, not runtime authentication; all callers must supply trusted values. Match the database uniqueness constraint to the same scope (tenant_id + email here). Validators are module-scoped and shared across concurrent requests, so never mutate their rules or a global currentUser variable per request.

## Official sources

- https://docs.adonisjs.com/guides/basics/validation.md
- https://lucid.adonisjs.com/docs/validation
- https://vinejs.dev/docs/schema_101
