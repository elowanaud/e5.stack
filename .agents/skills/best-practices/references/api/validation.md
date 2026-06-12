# API Validation Reference

## Scope
- Covers AdonisJS request validation for JSON API controllers.
- Covers schema placement, input normalization, validated payload contracts, validation failure behavior, and validation tests.
- Excludes authorization rules, service workflows, response presenters, model design, route registration, mail, queue jobs, and persistence changes.
- Use `controller.md` for orchestration and `presenter.md` for output contracts.

## Workflow
- Step 1: Define the exact request fields the action accepts and reject everything else by omission.
- Step 2: Express type, length, format, optionality, and normalization rules in a validator schema.
- Step 3: Run validation in the controller before service or persistence boundaries receive request data.
- Step 4: Pass only the validated payload to the service, with names that match the service contract.
- Step 5: Test valid input, malformed input, missing required input, and normalized output when normalization affects behavior.

## Required Rules
- Validators must define the request boundary, not domain workflow behavior.
- Controllers must call validation before using request body values for service calls or persistence.
- Services must receive validated data, not raw request bodies.
- Validation schemas must normalize input only when the API contract promises normalized values.
- Validation failures must use the framework's JSON error response path.
- Validation failure tests must assert the failure status and a stable error shape or code that clients depend on.
- Optional fields must be intentionally optional in the schema and intentionally handled by the service contract.
- Do not duplicate authorization rules inside validators.

## Key Considerations
- Validation is the input contract for the controller. Keep it narrow enough that extra client fields don't silently become domain data.
- Normalization changes behavior. Trimming, lowercasing, coercing, and defaulting should be deliberate and covered when clients depend on them.
- A schema shared by multiple actions must represent a true shared contract. If the actions accept different payloads, give them different schemas.
- Validation should fail before side effects. A bad payload must not send mail, dispatch jobs, mutate records, or call external systems.
- Error responses should stay JSON because API clients consume structured failures.

## Examples
**Do**
```ts
export const ThingNameSchema = vine.object({
	name: vine.string().trim().minLength(2).maxLength(120),
})

const payload = await request.validateUsing(CreateThingController.payloadSchema)
await service.create(payload)
```

**Don't**
```ts
const payload = request.all()

if (payload.name) {
	payload.name = String(payload.name).trim()
}

await service.create(payload)
```

## Anti-Patterns
- Passing `request.all()` to a service or model.
- Treating validation as a place for permission checks or workflow decisions.
- Accepting broad objects when the action needs only a few fields.
- Sharing one schema across actions with different input contracts.
- Normalizing input silently without tests for the client-visible behavior.
- Catching validation errors in controllers to return custom ad hoc JSON shapes.
- Letting malformed input reach side-effect code before validation runs.
