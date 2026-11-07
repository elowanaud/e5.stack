---
title: "Keep SSR request data local and deploy the server entrypoint"
impact: HIGH
impactDescription: "SSR executes frontend rendering inside a long-lived server process"
tags: view, inertia
---

# Keep SSR request data local and deploy the server entrypoint

**Impact: HIGH**

## Rationale

SSR evaluates frontend page modules on the server, not just in each visitor's browser. A module can survive multiple renders, so a cached identity or mutable store created outside the render can retain another visitor's data. Keep request-derived values in each render's props and configure the Adonis Vite server entrypoint so production contains the same SSR renderer used in development. Backend controllers and services must likewise keep HTTP context, authenticated identity and tenant data out of process-wide singletons; pass request-local values explicitly or use the request resolver.

## Incorrect

**Prerequisites:** Both alternatives below are React Inertia page modules resolved by the starter kit's SSR entrypoint. The backend supplies a serializable `viewer` prop for the current request; `null` means a guest. They use the React starter's TSX configuration, not backend `HttpContext`.

```tsx
// inertia/pages/home.tsx — also evaluated by the server's SSR renderer.
type Viewer = { id: number; name: string } | null
let firstViewer: Viewer | undefined

export default function Home({ viewer }: { viewer: Viewer }) {
  if (firstViewer === undefined) firstViewer = viewer
  // The first signed-in visitor's name can appear in later visitors' HTML.
  return <h1>{firstViewer?.name ?? 'Guest'}</h1>
}
```

## Correct

```tsx
// inertia/pages/home.tsx — no identity retained by the shared module.
type Viewer = { id: number; name: string } | null

export default function Home({ viewer }: { viewer: Viewer }) {
  const greeting = viewer?.name ?? 'Guest'
  return <h1>{greeting}</h1>
}
```

```ts
import adonisjs from '@adonisjs/vite/client'

// Partial vite.config.ts plugin options when config/inertia.ts enables SSR.
adonisjs({
  entryPoints: ['inertia/app.tsx'],
  serverEntryPoints: ['inertia/ssr.tsx'],
})
```

## Applicability and caveats

Current AdonisJS v7 SSR/Vite integration; generic Inertia docs describe multiple adapters and must not override the Adonis setup.

The incorrect page retains the first render's identity even across sequential SSR requests; it does not require an artificial async race. Create any request-derived store or client inside the per-render scope rather than at module level. Do not access `window`/`localStorage` unconditionally in modules evaluated on the server or mutate a singleton API client's headers with a user token. Keep server-only secrets/modules out of the browser bundle. Use `@inertia` and `@inertiaHead` in the root Edge template instead of manual JSON/HTML concatenation. Preserve Shield XSRF configuration; neither SSR nor the `X-Inertia` header authenticates a request. Enable `ssr.enabled` in `config/inertia.ts` and keep its `ssr.entrypoint` identical to the Vite `serverEntryPoints` path. The Adonis integration loads its own bundled SSR entrypoint: do not copy Laravel-specific SSR commands from generic Inertia docs.

## Sources

- https://docs.adonisjs.com/guides/frontend/inertia.md
- https://docs.adonisjs.com/guides/frontend/vite.md
- https://inertiajs.com/docs/v3/advanced/server-side-rendering.md
