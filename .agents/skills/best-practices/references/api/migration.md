# API Migration Reference

## Scope
* INCLUDE: Lucid migrations, table creation and alteration, indexes, constraints, rollback behavior, and generated schema or client contract guardrails as concepts.
* INCLUDE: Persistence changes that affect Lucid models, validators, factories, tests, or generated type surfaces.
* EXCLUDE: Generic SQL tutorials, data modeling theory, and deployment playbooks.
* EXCLUDE: Hand editing generated artifacts or documenting codegen tooling.

## Workflow
* Describe the durable data change first: table, column, nullability, uniqueness, foreign keys, indexes, and timestamps.
* Write `up()` so the new structure matches the model and validator contracts that will consume it.
* Write `down()` with a safe rollback for the same structure. Use `dropTable` only for tables created by that migration.
* Add indexes and constraints at the database level when the application relies on uniqueness, lookup speed, or referential integrity.
* Update nearby factories and Japa tests so the new schema can be created, queried, and rolled back in test setup.
* After migration source changes, treat generated schema and typed client surfaces as derived outputs. Do not patch them manually.

## Required Rules
* Every migration needs a rollback path that matches its `up()` change.
* Required fields need an intentional nullability and default strategy, especially when existing rows may already exist.
* Uniqueness and foreign key assumptions must live in the database, not only in validators or services.
* Add indexes for lookup patterns that are part of the API contract or high frequency background work.
* Keep migration files focused. Do not combine unrelated domains just because they are being edited in the same change.
* Do not edit generated schema or client files to match a migration. Regenerate derived outputs through the normal framework flow.

## Key Considerations
* New tables can usually use `createTable` and `dropTable`. Existing tables need more care because rollback may affect user data.
* A nullable column is a product decision, not a shortcut. Decide how models, presenters, and validators handle missing values.
* Constraint names and index names should be clear enough to debug database errors.
* Data backfills should be separated from structural migrations when the deployment risk is different.
* Migration changes often require factory updates so tests keep creating valid records.

## Examples
**Do**
```ts
this.schema.createTable(this.tableName, (table) => {
  table.increments('id')
  table.string('email', 254).notNullable().unique()
  table.timestamps(true, true)
})
```

**Don't**
```ts
this.schema.createTable(this.tableName, (table) => {
  table.string('email')
})
// Later, rely on a service check to prevent duplicates.
```

## Anti-Patterns
* Adding a column as nullable because tests are easier, then treating it as required in application code.
* Relying on validators for uniqueness without a database constraint.
* Creating migrations that cannot roll back in the test database.
* Updating generated schema output by hand after a migration.
* Combining structural changes, data backfills, and unrelated cleanup in one migration.
