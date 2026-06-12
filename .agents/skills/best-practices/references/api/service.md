# API Service Reference

## Scope
* INCLUDE: AdonisJS services that coordinate a business workflow across models, auth state, queues, mail jobs, storage, or other domain services.
* INCLUDE: Decisions about transaction scope, side effect timing, controller delegation, and workflow return values.
* EXCLUDE: HTTP route shape, request validation details, presenter formatting, and policy checks, which belong to their own references.
* EXCLUDE: Generic service layer theory. Keep this guidance tied to AdonisJS, Lucid, queues, auth guards, and Japa tests.

## Workflow
* Start from the controller contract. Confirm what data has already been validated and what auth or policy decision has already happened.
* Put multi step business behavior in a service method with a small parameter object or a single scalar when the input is truly simple.
* Resolve Lucid reads and writes inside the service, then decide where the workflow commits state before dispatching queue jobs or touching external systems.
* Keep the controller thin. It should validate, authorize, call the service, and return a presenter or simple response.
* Test service behavior with Japa unit coverage for business branches and controller coverage for the HTTP contract.

## Required Rules
* Services own orchestration. Controllers must not duplicate login, logout, delete, token, storage, mail dispatch, or queue dispatch sequences.
* Keep side effects in one clear owner. If a service dispatches a job, the job owns the remote or delayed action and the service owns when that job is enqueued.
* Use Lucid transactions when multiple database writes must succeed or fail together. Do not enqueue irreversible side effects before the durable state they depend on is saved.
* Inject `HttpContext` only when the workflow needs the current request, auth guard, session, or response scoped data.
* Throw domain exceptions from services when the workflow detects invalid state. Let controllers and the exception handler shape the HTTP response.
* Do not edit generated code to make a service compile. Fix the source contract and regenerate through the normal framework flow.

## Key Considerations
* A service method should read like the use case: load state, check domain conditions, mutate durable data, then trigger follow up work.
* Keep service return values intentional. Return the model or value the controller needs, not every intermediate object the workflow touched.
* When a workflow touches auth state, prefer one service method to own all guard calls so session behavior stays consistent.
* Do not hide validation in services unless the input comes from an internal source. HTTP input should be validated before the service is called.
* Queue dispatch is part of the domain workflow, but the queued job should contain the delayed side effect, not another copy of the full workflow.

## Examples
**Do**
```ts
await user.merge({ password: newPassword }).save()
await SendPasswordChangedNotification.dispatch({ user, loginUrl })
await auth.use('web').logout()
```

**Don't**
```ts
// Controller performs the same workflow inline, then another controller repeats it.
await user.merge(payload).save()
await mail.send(new PasswordChangedNotificationMail({ user, loginUrl }))
await auth.use('web').logout()
```

## Anti-Patterns
* Moving validated request parsing, policy checks, presentation, and persistence orchestration all into one service method.
* Dispatching a queue job before the database change that the job depends on has been saved.
* Calling mail or storage directly from controllers when an existing service already owns the workflow.
* Adding broad catch blocks that convert every service failure into a generic response.
* Treating generated controller or schema output as editable service glue.
