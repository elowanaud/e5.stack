# Web Mutations Reference

## Scope
- INCLUDE: TanStack Query mutation hooks, Tuyau mutation helpers, cache invalidation, optimistic updates, side effects, errors, and navigation after mutation.
- INCLUDE: Decisions about mutation ownership, query cache updates, toast or dialog effects, and post-submit routing.
- EXCLUDE: Form field rendering, route guard logic, API service implementation, and shared UI component design.
- EXCLUDE: Query-only data reads that don't change server state.

## Workflow
- Step 1: Create a feature hook for each user action that changes server state.
- Step 2: Build the mutation from the Tuyau `mutationOptions` helper for that endpoint.
- Step 3: Decide what server state changed, then invalidate or update the matching Tuyau query keys.
- Step 4: Keep user-facing side effects in the mutation hook or the caller boundary, not in the generic client.
- Step 5: Navigate only after the mutation succeeds and after required cache updates have been scheduled.

## Required Rules
- Use TanStack Query `useMutation` with Tuyau `mutationOptions` for API writes.
- Keep mutation hooks feature-specific. Don't put domain side effects in global query client setup.
- Invalidate or update every affected query using Tuyau-provided keys such as `pathKey` or `queryKey`.
- Use `mutateAsync` when form submission must await success or failure.
- Surface errors through translated user feedback and keep typed Tuyau error handling intact.
- Do optimistic updates only when rollback is clear and the pending state won't mislead the user.
- Perform router navigation in `onSuccess` or after awaited mutation success, not before the server confirms the write.

## Key Considerations
- A mutation owns the boundary between a user action and server state. It should make cache effects obvious.
- Invalidating by route path can refresh a family of queries. Invalidating a specific query key is better when only one read changes.
- Direct `setQueryData` is useful for known current-user or session state, but broad invalidation is safer for unknown server-side changes.
- Side effects should be idempotent from the user's point of view. Avoid duplicate toasts or repeated navigation when callers re-render.
- Deletion and logout flows often need both cache clearing and navigation. Do both deliberately.
- Mutation hooks should accept options only when the caller truly needs to customize behavior.

## Examples
**Do**
```ts
return useMutation(
	api.user.profile.update.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: api.user.profile.view.pathKey(),
			});
			toast.success(t("profile.updated"));
		},
		onError: (error) => showApiError(error),
	}),
);
```

**Don't**
```ts
return useMutation({
	mutationFn: (payload) => fetch("/profile", { method: "PATCH", body: payload }),
	onSuccess: () => window.location.reload(),
});
```

## Anti-Patterns
- Mutating server state with raw `fetch` when a Tuyau endpoint exists.
- Forgetting to invalidate cached reads after a successful write.
- Navigating away before the mutation promise resolves.
- Using optimistic updates without rollback for destructive actions.
- Showing hard-coded error text inside mutation hooks instead of translated copy.
