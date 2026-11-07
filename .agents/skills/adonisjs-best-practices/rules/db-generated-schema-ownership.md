---
title: "Keep generated schema columns separate from model behavior"
impact: HIGH
tags: db, adonisjs-v7
---

# Keep generated schema columns separate from model behavior

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x with schema generation; confirm installed Lucid APIs.

In the current Lucid workflow, migrations define the database, generated schema classes project its columns, and application models own relationships and behavior. Do not hand-edit `database/schema.ts`: regeneration overwrites it. Apply lasting changes in migrations, schema rules, or intentional model-level overrides.

## Incorrect

```ts
// Hand-editing generated database/schema.ts:
export class UsersSchema extends BaseModel {
  @column()
  declare nickname: string
}
// This neither creates the database column nor survives regeneration.
```

## Correct

```ts
// database/migrations/<timestamp>_add_nickname_to_users.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('nickname').nullable()
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('nickname')
    })
  }
}

// app/models/user.ts (separate file, after schema generation)
import { UsersSchema } from '#database/schema'
export default class User extends UsersSchema {}
```

## Caveats

Regenerate from the intended database after applying migrations and commit the generated schema alongside the migration. Generated class names follow table names, for example users → UsersSchema. Use schema rules for persistent type customization, and model overrides for intentional per-model behavior; do not duplicate inherited columns by default. Generated TypeScript types are not runtime validation or database constraints. This workflow requires the current Lucid schema-generation feature, not merely a v7 core dependency.

## Official sources

- https://lucid.adonisjs.com/docs/schema-generation
- https://lucid.adonisjs.com/docs/schema-classes
