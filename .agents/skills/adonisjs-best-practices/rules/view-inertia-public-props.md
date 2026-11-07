---
title: "Treat all Inertia props and shared data as browser-visible output"
impact: CRITICAL
impactDescription: "Both initial HTML and subsequent JSON contain serialized page props"
tags: view, inertia
---

# Treat all Inertia props and shared data as browser-visible output

**Impact: CRITICAL**

## Rationale

Both initial HTML and subsequent JSON contain serialized page props. A property that the current component never displays is still exposed to the browser. Select fields explicitly and keep request-specific shared data narrow, namespaced and authorized.

## Incorrect

```ts
// Partial authenticated controller action: sends internal user attributes.
return inertia.render('settings/profile', {
  user: { ...user.$attributes },
  integration: { accessToken: integration.accessToken },
})
```

## Correct

```ts
// Partial authenticated action; user is the authorized profile owner.
return inertia.render('settings/profile', {
  user: { id: user.id, fullName: user.fullName, email: user.email },
  integration: { connected: integration.accessToken !== null },
})
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Use existing serializers/transformers for repeated contracts, and test that private fields are absent. Deferred, optional, partial and once props are loading policies, not access controls. Recheck permissions in every data-producing route and request variant. History encryption reduces persisted-history exposure, not visibility to the current page, nor authorization requirements. Shared data increases every applicable payload; keep large queries page-specific.

## Sources

- https://docs.adonisjs.com/guides/frontend/inertia.md
- https://inertiajs.com/docs/v3/data-props/shared-data.md
