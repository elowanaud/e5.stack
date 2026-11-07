---
title: Keep provider registration synchronous and lazy
impact: HIGH
impactDescription: Register factories before resolving dependencies
tags: [adonisjs, core]
---

# Keep provider registration synchronous and lazy

Register factories before resolving dependencies. During register, other providers may not yet have registered their bindings. Resolve services or perform asynchronous initialization in an appropriate later lifecycle hook.

## Incorrect

```ts
async register() {
  const client = await this.app.container.make(ApiClient)
  this.app.container.singleton(Reports, () => new Reports(client))
}
```

## Correct

```ts
register() {
  this.app.container.singleton(Reports, async (resolver) => {
    const client = await resolver.make(ApiClient)
    return new Reports(client)
  })
}
```

## Caveats and versions

Provider methods shown belong to a provider receiving ApplicationService in its constructor; ApiClient and Reports are application classes. register is synchronous in v7. Choose singleton only for genuinely process-wide state, never request data.

## References

- https://docs.adonisjs.com/guides/concepts/service-providers.md
- https://docs.adonisjs.com/guides/concepts/dependency-injection.md
