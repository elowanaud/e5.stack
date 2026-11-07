---
title: "Match factory overrides and persistence to the assertion"
impact: HIGH
tags: db, adonisjs-v7
---

# Match factory overrides and persistence to the assertion

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Factory defaults generate valid data; overrides make the behavior under test deterministic. With the standard Lucid factory implementation, defaults are instantiated, `merge` overrides are applied, states run in application order, and `tap` runs afterward. Calling `merge` later in the fluent chain does not make it run after a state. Lifecycle hooks can still modify the instance.

`Factory.define(...).build()` finalizes a reusable factory; it does not create a model or write a row. Use `make()` for an unsaved model, `makeStubbed()` for an unsaved model with a simulated primary key, and `create()` for database assertions.

**Prerequisites:** These examples assume a Lucid `Post` model with `title`, `content`, and `status` columns and no other required attributes. Database examples require a migrated, disposable test database. Use per-test rollback only when all participating queries share its transaction; committed work in separate processes needs truncation/reset after workers stop, with separate databases or schemas for parallel runners. The explicit transaction below only illustrates fixture/query transaction ownership.

## Incorrect

```ts
// Alternative Japa test body, using the PostFactory defined below.
test('stores a draft', async ({ assert }) => {
  const post = await PostFactory
    .apply('published')
    .merge({ status: 'DRAFT' })
    .makeStubbed()

  assert.equal(post.status, 'DRAFT') // Fails: the state runs after merge.
  assert.isTrue(post.$isPersisted) // Fails: a stubbed id does not prove an INSERT.
})
```

## Correct

```ts
// database/factories/post_factory.ts
import Post from '#models/post'
import { Factory } from '@adonisjs/lucid/factories'

export const PostFactory = Factory.define(Post, ({ faker }) => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  status: 'DRAFT',
}))
  .state('published', (post) => {
    post.status = 'PUBLISHED'
  })
  .build()
```

```ts
// Japa test module; aliases resolve to the app's model and factory above.
import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import Post from '#models/post'
import { PostFactory } from '#database/factories/post_factory'

test('persists a published post with an explicit title', async ({ assert }) => {
  const draft = await PostFactory.merge({ title: 'Unsaved draft' }).make()
  assert.equal(draft.status, 'DRAFT')
  assert.isFalse(draft.$isPersisted)

  const trx = await db.transaction()
  try {
    const post = await PostFactory
      .client(trx)
      .apply('published')
      .merge({ title: 'Release notes' })
      .create()

    const stored = await Post.query({ client: trx }).where('id', post.id).firstOrFail()
    assert.equal(stored.title, 'Release notes')
    assert.equal(stored.status, 'PUBLISHED')
    assert.isTrue(stored.$isPersisted)
  } finally {
    await trx.rollback()
  }
})
```

## Caveats

Use a state for a reusable variation and `merge` for fields that state does not overwrite. If a deliberate final one-off override is needed, `tap` runs after states; do not assume fluent call order changes the compilation order. Custom factory `newUp`/`merge` implementations or hooks can change the result, so inspect existing factory definitions.

Pass the transaction client to both fixture creation and assertion queries; an unrelated connection cannot be assumed to see uncommitted fixtures. Factory creation uses a transaction (a savepoint when supplied an existing transaction client), so queries in factory hooks must use `ctx.$trx` to participate in those writes. Neither a generated id nor an assertion on the returned in-memory attributes proves database persistence, constraints, or commit behavior.

## Official sources

- https://lucid.adonisjs.com/docs/model-factories
- https://lucid.adonisjs.com/docs/transactions
- https://github.com/adonisjs/lucid/blob/22.x/src/factories/factory_builder.ts
- https://docs.adonisjs.com/guides/testing/resetting-state-between-tests.md
