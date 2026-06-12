# API Presenter Reference

## Scope
- Covers presenters and DTO-style response shaping for AdonisJS JSON API responses.
- Covers stable output contracts, serialization boundaries, model hiding, async presentation, collection shape, and presenter tests.
- Excludes controller access flow, request validation, policy rules, service workflows, model persistence rules, mail, and queue behavior.
- Use `controller.md` for response status decisions and `validation.md` for input contracts.

## Workflow
- Step 1: Identify the public JSON fields the endpoint promises to clients.
- Step 2: Build the response through a presenter or explicit DTO boundary instead of returning raw domain objects.
- Step 3: Convert dates, identifiers, nested resources, and derived fields into client-stable JSON values.
- Step 4: Keep sensitive, internal, and persistence-only fields out of the presenter output.
- Step 5: Test the serialized shape, including omitted fields and any async fields the presenter resolves.

## Required Rules
- Presenters must own public response shape.
- Controllers must not return raw models when the endpoint has a stable public contract.
- Presenters must include only fields intentionally exposed to API clients.
- Presenters must serialize dates and derived values consistently.
- Presenters may call read-only helpers needed to build response fields, but must not mutate state or trigger side effects.
- Collection and pagination presenters must keep wrapper keys stable for clients.
- Presenter tests or controller response-shape tests must fail if sensitive or internal fields leak.
- Do not let model serialization choices accidentally define the API contract unless that is the explicit presenter boundary.

## Key Considerations
- Presenters are API boundaries, not formatting afterthoughts. A field rename or omission is a public contract change.
- Async presenters are acceptable for read-only enrichment, such as resolving a signed URL, when the side effect boundary stays in a service.
- Raw model serialization can expose fields that were never meant for clients. Prefer explicit fields in the presenter.
- Keep response shape stable across success cases. Clients should not need to branch around missing wrapper keys or inconsistent date formats.
- Controller tests can cover presenter output when the presenter is only used through that endpoint, but shared presenters benefit from focused unit tests.

## Examples
**Do**
```ts
export default class ThingPresenter {
	toJSON(thing: Thing) {
		return {
			id: thing.id,
			name: thing.name,
			createdAt: thing.createdAt.toJSDate(),
		}
	}
}
```

**Don't**
```ts
return response.json(thing)
```

## Anti-Patterns
- Returning raw models from controllers because the current model happens to hide some fields.
- Building one-off response objects in every controller instead of using a shared presenter for shared shapes.
- Exposing sensitive, internal, or persistence-only fields in JSON responses.
- Letting date formats vary between endpoints.
- Mutating records, dispatching jobs, or sending mail while presenting a response.
- Changing wrapper keys or field names without treating it as an API contract change.
- Skipping response-shape assertions for endpoints consumed by typed clients.
