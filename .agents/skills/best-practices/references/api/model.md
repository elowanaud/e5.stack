# API Model Reference

## Scope
* INCLUDE: Lucid model responsibilities, generated schema extension, auth mixins, relationships, hooks, casts, serialization, and model tests.
* INCLUDE: Decisions about what belongs on a model compared with services, presenters, policies, validators, and migrations.
* EXCLUDE: HTTP response shaping details, request validation, and broad workflow orchestration.
* EXCLUDE: Generic ORM modeling advice that does not map to Lucid and this AdonisJS API style.

## Workflow
* Start from the persisted shape defined by migrations and generated schema classes.
* Extend the generated schema class, then add only the Lucid behavior the domain needs: auth finders, hooks, computed values, relationships, casts, or serialization rules.
* Keep model methods close to the record they act on. Use services for workflows that coordinate several records or side effects.
* Check serialization before exposing a model through an API response. Use `toJSON()` behavior or a presenter when the response shape matters.
* Cover model hooks, casts, auth behavior, and serialization with focused Japa tests when they carry business risk.

## Required Rules
* Models represent persisted domain records and record local behavior. They must not own HTTP validation, controller branching, or broad service workflows.
* Keep secrets out of serialized output. Passwords, tokens, and internal state must not leak through default JSON responses.
* Use Lucid relationships for navigable database links, not manual query helpers scattered across controllers.
* Keep hooks small and record local. A hook may clean up a directly owned resource, but it should not send mail or perform unrelated domain workflows.
* Use casts and column configuration for persistence concerns. Do not reformat the same value by hand across controllers and services.
* Treat generated schema classes as read only outputs. Change the source model or migration contract and regenerate through the normal flow.

## Key Considerations
* Auth mixins belong on the model when credential lookup and password verification are part of the record contract.
* Relationship names are part of the developer API. Keep them clear and stable.
* Hooks run outside the visible controller path, so use them only when the behavior must always happen with that model event.
* Presenters are better than model changes when the same record needs different response shapes in different endpoints.
* If a method needs request auth, queue dispatch, or multiple repositories of state, it is probably service behavior.

## Examples
**Do**
```ts
const authFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(UserSchema, authFinder) {}
```

**Don't**
```ts
export default class User extends UserSchema {
  async resetPasswordFromRequest(ctx: HttpContext) {
    await this.merge(ctx.request.body()).save()
    await SendResetInstruction.dispatch({ user: this })
  }
}
```

## Anti-Patterns
* Adding request or response logic to a Lucid model.
* Using model hooks for mail, queue, or session side effects that belong to services or jobs.
* Returning raw models from endpoints when serialization or presenter shape is part of the contract.
* Duplicating relationship queries in many services instead of defining a relationship.
* Editing generated schema output by hand to add columns or serialization behavior.
