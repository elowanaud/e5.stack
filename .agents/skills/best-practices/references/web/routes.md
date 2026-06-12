# Web Routes Reference

## Scope
- INCLUDE: TanStack Start route files, route groups, route layouts, route pages, loaders, redirects, search validation, and navigation decisions.
- INCLUDE: Decisions about guest-only and private-only route behavior, route context, and query preloading at route boundaries.
- EXCLUDE: Form field wiring, mutation side effects, shared UI component APIs, and API controller contracts.
- EXCLUDE: Generated route artifacts. Treat them as build output, not authoring targets.

## Workflow
- Step 1: Identify the route boundary first: public, guest-only, private-only, or shared shell.
- Step 2: Put cross-route checks in layouts, and keep leaf pages focused on their screen component and data needs.
- Step 3: Validate search params at the route declaration before reading them in a component or passing them to a form.
- Step 4: Use loaders for route-owned data preparation, query prefetching, or redirect decisions that belong to navigation.
- Step 5: Verify the generated route tree by running the normal route generation or web check command, then exercise navigation manually when behavior changes.

## Required Rules
- Use TanStack Start file routes with `createFileRoute` for leaf and layout routes, and `createRootRouteWithContext` for the root route.
- Keep route groups semantic. Guest-only groups protect authentication pages from signed-in users. Private groups protect authenticated screens from guests.
- Throw TanStack Router redirects from `beforeLoad` or loaders. Don't render a page and then navigate during render for access control.
- Preserve the original destination when redirecting a guest to sign in so the post-authentication flow can return there.
- Parse search params with a schema in `validateSearch` before using values such as reset tokens, redirect targets, filters, or pagination.
- Use `Outlet` only in layout routes. Leaf page routes should render the screen or feature component directly.
- Don't edit generated route output by hand.

## Key Considerations
- Auth checks belong as high as possible. A private layout can protect every child route without duplicating guards.
- Guest-only pages should redirect authenticated users away before rendering forms that no longer make sense.
- Search validation should return typed, normalized values. Components should not guess whether a param is present or valid.
- Route loaders are navigation boundaries. They can prepare TanStack Query cache state, but they should not contain form submission logic.
- Use router links for in-app navigation so route types, preloading, and active state stay available.
- Keep route components thin. Put domain UI and reusable logic in feature components or hooks.

## Examples
**Do**
```tsx
const searchSchema = z.object({
	redirectTo: z.string().optional(),
});

export const Route = createFileRoute("/auth/login/")({
	validateSearch: searchSchema,
	component: LoginPage,
});
```

**Don't**
```tsx
export const Route = createFileRoute("/auth/login/")({
	component: () => {
		const redirectTo = new URLSearchParams(location.search).get("redirectTo");
		return <LoginPage redirectTo={redirectTo} />;
	},
});
```

## Anti-Patterns
- Duplicating the same private or guest guard in every leaf page.
- Reading raw `location.search` inside components instead of using TanStack Router search validation.
- Calling navigation imperatively during render to enforce access.
- Mixing route loader work with mutation side effects.
- Putting route decisions in generated files or build output.
