# API Factory Reference

## Scope
* INCLUDE: Lucid factories, test data defaults, factory states, relationships, deterministic assertions, and Japa test setup data.
* INCLUDE: Decisions about when to use factories, explicit model creation, or hand built payloads.
* EXCLUDE: Production seed data, fixture dumps, and generic faker tutorials.
* EXCLUDE: Request validation examples except where a test needs a valid model behind the request.

## Workflow
* Define the smallest valid default record for the model. Include required fields and let optional fields stay absent unless they are part of the default contract.
* Use faker for realistic values, but override values in tests when assertions depend on exact content.
* Add named states for meaningful domain variants, such as verified, disabled, or with a relation, instead of repeating setup in every test.
* Use factory relationships when the database relationship is part of the behavior under test.
* Keep Japa assertions deterministic by controlling emails, names, dates, tokens, and counts that the test reads back.

## Required Rules
* Factories must create valid records against the current Lucid migration and model contract.
* Defaults must stay narrow. Do not create related records, queue jobs, mail payloads, or uploaded files unless the factory state asks for them.
* Tests that assert a value must set that value explicitly instead of trusting faker output.
* Use states for reusable variants. Do not create one broad fixture that tries to satisfy every test in the domain.
* Keep factory changes aligned with migration changes so test setup fails for real contract drift, not stale defaults.
* Do not patch generated schema output or test helpers to hide invalid factory data.

## Key Considerations
* A factory should make common setup cheap without hiding the behavior a test is proving.
* Faker values help avoid accidental uniqueness collisions, but exact assertions need explicit overrides.
* Relationship factories are useful when the relation is the subject of the test. They are noise when only the parent record matters.
* Factory states should name domain meaning, not implementation detail.
* For controller tests, combine factories for persisted state with hand built request payloads for the HTTP boundary.

## Examples
**Do**
```ts
const user = await UserFactory.merge({
  email: 'person@example.test',
}).create()

assert.equal(user.email, 'person@example.test')
```

**Don't**
```ts
const user = await UserFactory.create()
assert.equal(user.email, 'person@example.test')
```

## Anti-Patterns
* One giant fixture that creates a full domain graph for every test.
* Assertions that depend on random faker output.
* Factory defaults that send mail, dispatch jobs, or touch external storage.
* Repeating the same model variant setup in many tests instead of naming a state.
* Leaving factories stale after a migration changes required fields or constraints.
