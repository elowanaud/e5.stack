---
title: "Treat unique and exists rules as preflight checks, not guarantees"
impact: CRITICAL
tags: validation, adonisjs-v7
---

# Treat unique and exists rules as preflight checks, not guarantees

**Impact: CRITICAL**

**Version scope:** AdonisJS v7 with independently versioned VineJS 4 and Lucid. The database validation and migration examples follow current Lucid 22.x documentation; confirm installed package support.

Database validation improves feedback but observes a moment in time. Another request can create the same value, delete a referenced row, or change ownership after validation. Preserve unique/foreign-key constraints and repeat ownership-sensitive decisions within the actual write's transaction when needed.

## Incorrect

```ts
export const registerValidator = vine.create({
  email: vine.string().email().unique({ table: 'users', column: 'email' }),
})
// users.email has no unique index: concurrent requests can both insert.
```

## Correct

```ts
// Validator: friendly preflight error.
import vine from '@vinejs/vine'

export const registerValidator = vine.create({
  email: vine.string().email().unique({ table: 'users', column: 'email' }),
})

// Migration fragment: definitive arbitration between concurrent writers.
this.schema.createTable('users', (table) => {
  table.increments('id')
  table.string('email').notNullable().unique()
})
```

## Caveats

Handle recognized constraint failures using the project's established response policy; never catch every database error as a duplicate. `exists` alone proves neither tenant ownership nor permission: constrain its query with trusted metadata and scope the eventual write too. Supply the database `column` explicitly for camelCase input mapped to snake_case. Each unique/exists value runs a separate query, so large input arrays need bounds and may need a set-based design. Case-insensitive checks must agree with the actual database uniqueness policy and suitable indexes.

## Official sources

- https://lucid.adonisjs.com/docs/validation
- https://lucid.adonisjs.com/docs/table-builder
