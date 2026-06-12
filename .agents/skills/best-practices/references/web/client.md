# Web Client Reference

## Scope
- INCLUDE: Tuyau typed client usage, TanStack Query request helpers, request contracts, SuperJSON setup, and client-side error handling.
- INCLUDE: Decisions about query keys, mutation helpers, typed request payloads, response data, and API error display.
- EXCLUDE: API controller implementation, server validation internals, route authorization, and UI component styling.
- EXCLUDE: Direct HTTP client wrappers that bypass the generated contract.

## Workflow
- Step 1: Start from the generated Tuyau client surface for the API route you need.
- Step 2: Use Tuyau query helpers for reads and Tuyau mutation helpers for writes so request and response types stay linked to the server contract.
- Step 3: Keep request bodies, params, and search values shaped by the generated TypeScript contract.
- Step 4: Handle typed Tuyau errors at the feature boundary and map them to user-facing copy outside the generic client setup.
- Step 5: Check that SuperJSON remains installed in the client pipeline when API responses include values that need richer serialization.

## Required Rules
- Call the API through the configured Tuyau client. Don't create ad hoc `fetch` calls for routes that already exist in the typed registry.
- Use `queryOptions`, `queryKey`, `pathKey`, and `mutationOptions` from the typed client instead of hand-written TanStack Query keys.
- Keep the base URL and SuperJSON plugin configuration centralized in the client module.
- Let TypeScript infer endpoint request and response types from Tuyau. Don't duplicate DTO types in the web layer unless a local view model is truly needed.
- Convert Tuyau errors into form errors, toast messages, or route-level error UI at the closest user-facing boundary.
- Don't swallow errors in client helpers. Return typed data or let the caller decide how to display failure.

## Key Considerations
- Tuyau is the contract bridge between the Adonis API and the web app. If a call cannot be expressed through Tuyau, first check whether the server route is registered correctly.
- TanStack Query cache behavior depends on stable keys. Prefer Tuyau-provided keys because they track the route contract.
- SuperJSON must be part of the client setup when the server and client agree on non-plain JSON values.
- Client utilities may centralize repeated error formatting, but they should not know feature-specific translation keys.
- Reads and writes have different ownership. Queries own cached server state, while mutations own side effects and invalidation.

## Examples
**Do**
```ts
const profileQuery = api.user.profile.view.queryOptions();
const updateProfile = api.user.profile.update.mutationOptions({
	onError: (error) => showApiError(error),
});
```

**Don't**
```ts
const response = await fetch(`${baseUrl}/user/profile`, {
	method: "PATCH",
	body: JSON.stringify(payload),
});
```

## Anti-Patterns
- Rebuilding API URLs or query keys by string concatenation.
- Copying server request types into separate web-only types that can drift.
- Handling every API error as an unknown exception when Tuyau already exposes typed errors.
- Configuring SuperJSON separately in feature code.
- Hiding failed API calls by returning empty fallback objects from the client.
