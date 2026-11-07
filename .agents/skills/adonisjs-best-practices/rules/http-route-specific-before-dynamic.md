---
title: Declare specific routes before overlapping dynamic routes
impact: MEDIUM
impactDescription: Default registration-order matching can let broad routes capture fixed endpoints
tags: [adonisjs, http]
---

# Declare specific routes before overlapping dynamic routes

Inspect `config/app.ts` to determine the route matcher before reasoning about precedence. With the default registration-order precedence, a broad parameter route declared first can capture a fixed endpoint and dispatch to the wrong controller. Keep static routes before overlapping parameter routes and constrain identifiers where appropriate. With the tree matcher and specificity prioritization enabled, static routes win independently of declaration order; registration order breaks equally specific ties.

## Incorrect

Under default registration-order precedence (assumes the router and PostsController bindings shown below):

```ts
router.get('/posts/:id', [PostsController, 'show'])
router.get('/posts/create', [PostsController, 'create'])
```

## Correct

```ts
import router from '@adonisjs/core/services/router'
const PostsController = () => import('#controllers/posts_controller')
router.get('/posts/create', [PostsController, 'create'])
router.get('/posts/:id', [PostsController, 'show']).where('id', router.matchers.number())
```

## Caveats and versions

v7 lazy-controller style; preserve generated-controller conventions in v7 apps that use them. The example ordering is defensive for registration-order precedence, not a requirement for static-route precedence with the specificity-prioritizing tree matcher. A numeric matcher limits route shape, not authorization or full runtime validation. Review resource and wildcard routes for collisions too.

## References

- https://docs.adonisjs.com/guides/basics/routing.md
- https://docs.adonisjs.com/guides/basics/routing#using-the-tree-matcher
