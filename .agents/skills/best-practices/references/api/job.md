# API Job Reference

## Scope
* INCLUDE: AdonisJS queue jobs, their payload shape, queue options, retry expectations, and delayed side effect boundaries.
* INCLUDE: Jobs that send mail, call external services, or perform work that should not block the HTTP request.
* EXCLUDE: Mail template construction, service orchestration, and controller response contracts.
* EXCLUDE: Generic queue tutorials. Keep this guidance tied to AdonisJS Queue, typed payloads, and Japa job tests.

## Workflow
* Define a narrow payload type containing only the data the job needs to perform the delayed action.
* Set explicit `JobOptions` when the job belongs on a named queue such as `emails`.
* Keep `execute()` short. Read from `this.payload`, build the side effect object, and await the side effect.
* Make retry behavior safe by keeping the action idempotent or by checking durable state before repeating work.
* Cover the job with a Japa unit test that dispatches or executes it with representative payload data and asserts the side effect boundary.

## Required Rules
* Jobs must not depend on controller state, `HttpContext`, or request only objects.
* Payloads must be serializable enough for queue transport, or intentionally limited to values this queue driver can handle in tests and runtime.
* Put mail jobs on the `emails` queue so workers can process notification work separately from other background work.
* Keep one delayed side effect per job unless the effects are inseparable from the user's perspective.
* Make retries safe. A retried job must not corrupt state, create duplicate durable records, or send conflicting updates.
* Do not edit generated queue or registry artifacts to fix a job name. Fix the source class and let codegen follow.

## Key Considerations
* Passing a Lucid model is convenient for local mail jobs, but primitive identifiers are safer when the job may run much later or across workers.
* If current database state matters, load it inside `execute()` and handle missing records intentionally.
* Retry options should match the side effect. Mail can often retry, while destructive or billing style work needs stronger idempotency checks.
* Queue naming is a product boundary. Use a specific queue when operators may scale or pause that work independently.
* Jobs should expose failures by throwing. Swallowing errors makes retries and worker monitoring less useful.

## Examples
**Do**
```ts
export default class SendNotification extends Job<Payload> {
  static options = { queue: 'emails' }

  async execute() {
    const { user, actionUrl } = this.payload
    await mail.send(new NotificationMail({ user, actionUrl }))
  }
}
```

**Don't**
```ts
async execute() {
  await this.payload.ctx.auth.use('web').logout()
  await this.payload.response.redirect('/done')
}
```

## Anti-Patterns
* Using a job as a second service layer that repeats validation, authorization, and controller branching.
* Sending mail from both the service and the queued job for the same event.
* Using a default queue for all background work when a domain already has a named operational queue.
* Catching and logging every job error without rethrowing.
* Putting generated file fixes or codegen instructions inside job guidance instead of fixing the source contract.
