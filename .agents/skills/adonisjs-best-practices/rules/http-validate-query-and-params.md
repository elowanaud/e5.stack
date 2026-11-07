---
title: Validate route and query input before using it
impact: HIGH
impactDescription: URL parameters and query strings are untrusted too
tags: [adonisjs, http]
---

# Validate route and query input before using it

URL parameters and query strings are untrusted too. Parse bounded pagination and allowlisted ordering at the boundary rather than forwarding raw input into database identifiers or relying on a TypeScript cast.

## Incorrect

```ts
const limit = request.input('limit') as number
return Post.query().orderBy(request.input('sort')).limit(limit)
```

## Correct

```ts
// v7 VineJS schema, defined at module scope:
const listPostsValidator = vine.create({
  limit: vine.number().withoutDecimals().min(1).max(100).optional(),
  sort: vine.enum(['created_at', 'title'] as const).optional(),
})

// Controller action with Post and validator imported:
const { limit, sort } = await request.validateUsing(listPostsValidator)
return Post.query().orderBy(sort ?? 'created_at').limit(limit ?? 20)
```

## Caveats and versions

Import vine from @vinejs/vine. Use the documented v7 vine.create API and inspect installed VineJS. For route IDs, validate a nested params object through request.validateUsing. Filter identifiers must be allowlisted even when the query builder parameterizes values. Bound pagination does not replace tenant scoping.

Pagination counts are integers. Reject a fractional `limit` at the HTTP boundary rather than relying on a downstream query builder to truncate it. Keep monetary/measurement fields separate: their decimal policy depends on the domain.

## References

- https://docs.adonisjs.com/guides/basics/validation.md
- https://docs.adonisjs.com/guides/basics/request.md
- https://vinejs.dev/docs/types/number
