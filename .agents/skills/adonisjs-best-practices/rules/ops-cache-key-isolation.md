---
title: "Isolate cache keys by every visibility and query dimension"
impact: CRITICAL
impactDescription: "A cache hit bypasses the factory"
tags: ops, cache
---

# Isolate cache keys by every visibility and query dimension

**Impact: CRITICAL**

## Rationale

A cache hit bypasses the factory. A shared key can return one tenant’s private results to another, even when the factory has a correct SQL filter. Derive identity from authenticated context and include all dimensions that change the response.

## Incorrect

```ts
// Partial authenticated controller action; tenant membership already resolved.
return cache.getOrSet({
  key: `projects:${page}`,
  factory: () => Project.query().where('tenantId', tenant.id).paginate(page, 20),
})
```

## Correct

```ts
// Partial action: page and status were validated; tenant is trusted context.
return cache.getOrSet({
  key: JSON.stringify(['projects:v1', tenant.id, auth.user!.id, page, status]),
  ttl: '1m',
  factory: async () => {
    const projects = await Project.query()
      .where('tenantId', tenant.id)
      .where('status', status)
      .paginate(page, 20)
    return projects.serialize()
  },
})
```

## Applicability and caveats

AdonisJS v7 with the installed compatible version of @adonisjs/cache.

Authorization still runs before lookup. Include locale, sort, filters, pagination and role/permission version when they affect the output; omit user identity only for genuinely shared data. Use JSON-safe outputs so hit and miss shapes match. Never cache authorization decisions as long-lived public content.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/cache.md
