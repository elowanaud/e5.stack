# API Policy Reference

## Scope
- Covers AdonisJS Bouncer policies used by JSON API controllers.
- Covers ownership checks, access decisions, guest allowances, authenticated user boundaries, denial behavior, and policy tests.
- Excludes route middleware setup, validator schemas, presenter response shape, service workflows, persistence design, mail, and queue behavior.
- Use `controller.md` for controller orchestration and `validation.md` for request payload contracts.

## Workflow
- Step 1: Identify the actor, resource, and action the request is trying to perform.
- Step 2: Decide whether route middleware already guarantees guest or authenticated access, then add only the resource or action rule that still belongs in Bouncer.
- Step 3: Encode ownership, role, state, and guest rules in the policy method using explicit inputs.
- Step 4: Call the policy from the controller before protected reads, writes, or side effects.
- Step 5: Test allowed access, denied access, and any guest or ownership boundary that changes the outcome.

## Required Rules
- Policies must answer access questions only.
- Policies must not mutate state, send mail, dispatch jobs, or call services with side effects.
- Policies must keep ownership and resource-access checks close to the Bouncer method that protects the action.
- Policies must use explicit method arguments for resources needed to decide access.
- Guest access must be intentional and visible in the policy when an action can run without an authenticated actor.
- Access denial must surface through the normal Bouncer failure path so API clients receive the standard JSON error response.
- Controllers must not continue to validation, service calls, or response shaping after policy denial.
- Policy tests must cover both allowed and denied branches, including ownership mismatch when ownership matters.

## Key Considerations
- Middleware decides broad route entry, such as guest-only or authenticated-only. Policies decide action-level or resource-level permission.
- A policy can be simple when middleware already proves the route class, but the simple rule should still be tested if the controller depends on it.
- Ownership checks should compare stable identifiers or loaded resources. Don't infer ownership from request payload fields alone.
- Bouncer denial should be consistent with the rest of the API, with no custom response from the policy itself.
- If the access decision needs domain state that is expensive or coupled to workflow logic, pass the already loaded resource or move workflow decisions to the service while keeping the final allow or deny rule clear.

## Examples
**Do**
```ts
export default class UpdateThingPolicy extends BasePolicy {
	handle(user: User, thing: Thing) {
		return thing.ownerId === user.id
	}
}
```

**Don't**
```ts
export default class UpdateThingPolicy extends BasePolicy {
	async handle(user: User, payload: Record<string, unknown>) {
		await Thing.query().where(payload).update({ touched: true })
		return true
	}
}
```

## Anti-Patterns
- Putting write logic, mail delivery, queue dispatch, or external calls inside a policy.
- Rechecking broad middleware guarantees in every policy while missing the resource rule the action actually needs.
- Trusting request payload ownership fields instead of the authenticated actor and protected resource.
- Returning custom response objects from policies instead of allowing Bouncer to deny access.
- Skipping denied-branch tests because the happy path passes.
- Hiding guest access by relying on accidental unauthenticated behavior rather than an explicit guest allowance.
