# API Controller Reference

## Scope
- Covers AdonisJS HTTP controllers that expose JSON API actions.
- Covers request orchestration, Bouncer authorization calls, validation handoff, service delegation, presenter use, response status choices, and controller-level tests.
- Excludes policy internals, validator schema design, presenter internals, domain service rules, queued jobs, mail content, model design, and storage changes.
- Use `policy.md`, `validation.md`, or `presenter.md` when the main change belongs to one of those boundaries.

## Workflow
- Step 1: Confirm the route middleware contract so the controller can rely on the intended guest, authenticated, or public boundary.
- Step 2: Authorize protected access with Bouncer before protected reads, writes, or side effects.
- Step 3: Validate only the action payload needed for this request, then pass typed data across the service boundary.
- Step 4: Delegate domain work, persistence, external calls, mail, queue dispatch, and multi-step side effects to a service.
- Step 5: Return a presenter-shaped JSON value, an explicit status response, or `null` only when the no-content contract is intentional.

## Required Rules
- A controller class must represent one HTTP action and expose a single action handler.
- Controllers must stay thin: authorize, validate, delegate, and return.
- Controllers must not run protected reads, writes, or side effects before authorization succeeds.
- Controllers must not pass untrusted request payloads to services or persistence.
- Controllers must use services for domain decisions, writes, external calls, mail, queue dispatch, and transaction-sized workflows.
- Controllers must use presenters or stable DTOs for public JSON response shape.
- Controllers must rely on route middleware for guest-only and authenticated-only access where middleware expresses the route contract.
- Changed controller behavior must have controller-level tests for success, access failure, validation failure when input is accepted, response shape, and side-effect boundaries.
- Do not change action signatures, route names, response shapes, or access contracts without checking typed client impact.

## Key Considerations
- Access order matters. Authorization failure should stop the request before protected work begins.
- Validation order matters. Validation failure should stop the request before services receive untrusted data.
- Route middleware is part of the controller contract. Don't duplicate middleware responsibilities inside the action unless the action has a distinct resource-level authorization need.
- A controller may return `null` for intentional no-content responses, but must not hide missing response design behind `null` by default.
- Typed clients treat controller routes and JSON response shapes as contracts, so shape changes need the same care as public API changes.
- Side effects belong behind services. A controller may trigger a service method, but it shouldn't know how mail, queue jobs, external calls, or persistence steps are coordinated.

## Examples
**Do**
```ts
export default class CreateThingController {
	constructor(
		private readonly service: ThingService,
		private readonly presenter: ThingPresenter,
	) {}

	async handle({ bouncer, request, response }: HttpContext) {
		await bouncer.with(CreateThingPolicy).authorize("handle")
		const payload = await request.validateUsing(CreateThingController.payloadSchema)
		const thing = await this.service.create(payload)

		return response.created(await this.presenter.toJSON(thing))
	}
}
```

**Don't**
```ts
export default class ThingsController {
	async handle({ request, response }: HttpContext) {
		const thing = await Thing.create(request.all())
		await Mail.sendLater(messageFor(thing))

		return response.json(thing)
	}
}
```

## Anti-Patterns
- Grouping several HTTP actions into one controller class.
- Mixing authorization, validation, persistence, mail, queue dispatch, and response shaping in one method.
- Querying or mutating protected resources before Bouncer authorizes the action.
- Passing `request.all()` or raw params into services.
- Returning raw models or ad hoc objects from controller methods.
- Sending mail, dispatching jobs, or calling external services directly from controllers.
- Treating access, validation, and response-shape tests as optional because the service is tested elsewhere.
