---
title: "Run migration data operations through defer and its client"
impact: HIGH
tags: db, adonisjs-v7
---

# Run migration data operations through defer and its client

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Use `this.defer` for data operations that must happen after queued schema operations. Use the callback's database client rather than application models, whose columns/hooks may change before an old migration is replayed. Deferred operations also respect Lucid's dry-run behavior by not executing during dry runs.

## Incorrect

```ts
this.schema.alterTable('users', (table) => {
  table.string('display_name')
})
await User.query().update({ displayName: 'Unknown' })
```

## Correct

```ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('display_name')
    })

    this.defer(async (db) => {
      await db.from('users')
        .whereNull('display_name')
        .update({ display_name: db.raw('??', ['name']) })
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

This single-statement backfill suits a small table; on large live tables, use a separately controlled bounded backfill so transactions and locks remain short. A dry run does not show deferred data queries, so it is not complete evidence of migration safety. Avoid irreversible transformations unless the rollout and recovery plan explicitly account for data loss. This example assumes the existing name column has the desired values.

## Official sources

- https://lucid.adonisjs.com/docs/migrations
- https://lucid.adonisjs.com/docs/raw-query-builder
