# API Testing Reference

## Scope
- INCLUDE: Japa unit and e2e tests for AdonisJS API controllers, policies, jobs, mails, services, models, migrations, and factories.
- INCLUDE: expectations for happy paths, access failures, validation failures, response shape, database isolation, factory usage, queue and mail side effects, and generated-contract impact checks.
- EXCLUDE: complete implementation rules for each API layer; use the focused API references for controller, policy, service, mail, job, model, migration, factory, validation, and presenter design.
- EXCLUDE: full-suite command requirements for markdown-only reference changes.

## Workflow
- Step 1: Identify the surface being changed and choose the smallest Japa test type that proves it: e2e for HTTP/controller behavior, unit for policies, jobs, mails, services, models, factories, and focused domain rules.
- Step 2: Write the success case first with realistic factory data, named route access for HTTP tests, and assertions for the public response or observable state change.
- Step 3: Add negative coverage for access failure and validation failure when the surface can reject a caller or payload.
- Step 4: Assert side effects at their boundary: queued jobs, sent mails, persisted records, revoked tokens, or unchanged data when a request fails.
- Step 5: Check whether route names, payload contracts, status codes, or response shapes affect generated clients, then keep the test contract aligned with that public API.

## Required Rules
- Controller behavior MUST have Japa e2e coverage for the happy path, expected status code, response shape, access failure, validation failure where applicable, and side-effect boundary.
- Policy behavior MUST have focused unit coverage for allowed and denied callers, including ownership or guest/authenticated boundaries when those rules exist.
- Jobs and mails MUST have unit coverage that proves the queued payload is handled and the resulting mail recipient, subject, and meaningful body data are correct.
- Services and models MUST have unit coverage when they own domain decisions, persistence changes, token workflows, serialization, hooks, or relationship behavior that controllers should not duplicate.
- Migrations and factories MUST be tested through realistic database usage when schema constraints, defaults, relationships, or factory states affect application behavior.
- Tests that write to the database MUST run with isolation that leaves no state for later tests and MUST avoid order-dependent assertions.
- Factories MUST create valid domain records by default, with explicit overrides only for the scenario being tested.
- Validation failure tests MUST assert the failure status and useful error shape without relying on translated wording that is not part of the API contract.
- Access failure tests MUST assert that protected work did not run: no write, no queue push, no mail send, and no sensitive response data.
- Response shape assertions MUST prove the public contract, not raw model internals.
- Generated-contract impact checks MUST be considered when a test changes a named route, payload field, status code, or response body consumed by generated clients.

## Key Considerations
- Use e2e tests for HTTP behavior because middleware, auth state, validation, authorization, route naming, presenters, and status codes are part of the controller contract.
- Use unit tests for policies, jobs, mails, services, and models when the behavior can be proven without starting the HTTP layer.
- Keep assertions specific enough to catch regressions, but avoid snapshotting whole responses unless the whole shape is intentionally public.
- Prefer database-backed factory records over hand-built objects when Lucid hooks, casts, relationships, or auth behavior matter.
- Fake queue and mail services at the boundary, then assert the exact job or mail class, recipient, and business payload that should be visible.
- For failed validation or authorization, assert both the HTTP result and the absence of side effects so the failure order remains protected.
- A markdown-only reference change may use targeted content checks instead of requiring full application test or build commands.

## Examples
**Do**
```text
Controller e2e: create a valid actor with a factory, call the named route through the Japa API client, assert the status, public response shape, persisted change, and queued job.

Access failure: call the same route as the wrong actor or without the required session, assert the failure status, and assert no database write, queue push, or mail send occurred.

Mail unit: build the mail with factory-backed data, then assert recipient, subject, and the important rendered body values.
```

**Don't**
```text
Only assert that the request did not throw.

Reuse records created by another test.

Check that a raw model object equals the response body.

Change a controller response shape without adding or updating the e2e assertion that represents the generated client contract.
```

## Anti-Patterns
- Treating controller e2e tests as service unit tests and skipping middleware, validation, authorization, or presenter assertions.
- Testing only the happy path when the route has guest-only, authenticated-only, ownership, or policy-dependent access rules.
- Asserting validation failure by checking one fragile message string while ignoring status code and error shape.
- Sending real queue jobs or real mail in tests instead of faking the boundary and asserting the intended side effect.
- Building fake plain objects when a factory-backed model is needed to exercise hooks, casts, relationships, or authentication behavior.
- Sharing database state across tests or depending on test execution order.
- Requiring full-suite commands for markdown-only reference edits when targeted content checks prove the reference contract.
- Ignoring generated-contract impact after changing route names, payload fields, response shapes, or status codes.
