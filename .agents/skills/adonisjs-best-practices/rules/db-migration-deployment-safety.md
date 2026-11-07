---
title: "Deploy schema changes with compatibility and rollback safety"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Deploy schema changes with compatibility and rollback safety

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Treat production migrations as application deployments, not local rebuilds. Add compatible schema first, deploy code that can use it, backfill if needed, and only remove old columns after old application instances no longer depend on them. A `down` method cannot recover deleted production data.

## Incorrect

```ts
// Same deploy still has old instances that read users.name.
this.schema.alterTable('users', (table) => {
  table.dropColumn('name')
  table.string('display_name').notNullable()
})
```

## Correct

```ts
import { BaseSchema } from '@adonisjs/lucid/schema'

// Expansion migration; old code continues reading name.
export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('display_name').nullable()
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('display_name')
    })
  }
}
```

## Caveats

The example is the expansion phase, not the entire cutover: backfill and move readers/writers before a separate reviewed constraint/removal migration. This staged deployment is an engineering recommendation derived from migration semantics, not an automatic Lucid guarantee. Keep applied migrations immutable; add a new forward migration. Inspect actual dialect locking and DDL transaction support. Use current Lucid's `disableRollbacksInProduction` where available, preserve migration locks, and never use fresh/refresh/reset on live data. Disable a migration's transaction only for operations that require it, such as PostgreSQL concurrent index creation.

## Official sources

- https://lucid.adonisjs.com/docs/migrations
- https://lucid.adonisjs.com/docs/table-builder
