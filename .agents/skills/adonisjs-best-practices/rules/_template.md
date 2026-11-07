---
title: State one actionable decision
impact: HIGH
impactDescription: Describe the concrete failure this rule prevents
tags: [adonisjs, category]
---

# State one actionable decision

**Impact: HIGH**

Explain the decision, when it applies, and why the failure matters. Make this rule understandable on its own without another local document. Replace the illustrative input boundary below with complete examples for the actual decision.

## Incorrect

```ts
// Inside an update handler: arbitrary request fields can reach persistence.
user.merge(request.all())
await user.save()
```

## Correct

```ts
// Define this reusable validator at module scope.
import vine from '@vinejs/vine'

const updateProfileValidator = vine.create({
  displayName: vine.string().trim().minLength(1).maxLength(100),
})

// Inside the authenticated handler, after loading and authorizing user.
const payload = await request.validateUsing(updateProfileValidator)
user.merge(payload)
await user.save()
```

## Caveats and versions

State the AdonisJS v7 boundary, the independently versioned packages involved, and any required application imports, configuration, model fields, middleware, authorization, or database assumptions. Examples above illustrate an existing handler with an authorized Lucid `user`, AdonisJS `request`, and the documented VineJS validator API; they do not establish authentication or resource ownership. Check installed package declarations before relying on a version-specific API. Do not imply that a generated API reference for an older framework major documents v7.

## References

- https://docs.adonisjs.com/guides/basics/validation.md
- https://vinejs.dev/docs/introduction

Use specific official URLs supporting the actual rule when adapting this template. Do not retain unrelated references or introduce a local documentation dependency.
