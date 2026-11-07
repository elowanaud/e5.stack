---
title: "Enforce durable invariants with database constraints"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Enforce durable invariants with database constraints

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Put uniqueness, required values, and referential integrity in migrations as well as request validation. Two concurrent requests can both pass a SELECT-based uniqueness check. Database constraints arbitrate all writers, including jobs, commands, and direct SQL.

## Incorrect

```ts
this.schema.createTable('memberships', (table) => {
  table.increments('id')
  table.integer('user_id')
  table.integer('team_id')
})
// An exists/unique validator is the only protection.
```

## Correct

```ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('memberships', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id')
      table.integer('team_id').unsigned().notNullable().references('teams.id')
      table.unique(['team_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable('memberships')
  }
}
```

## Caveats

Choose cascade/restrict behavior from the domain, not a blanket default. Backfill or deduplicate existing data before adding constraints. Tenant ownership may require a composite foreign key, not just a globally valid ID. Translate only recognized constraint violations into the project's conflict/validation response; do not hide unrelated database errors.

## Official sources

- https://lucid.adonisjs.com/docs/table-builder
- https://lucid.adonisjs.com/docs/relationships
- https://lucid.adonisjs.com/docs/validation
