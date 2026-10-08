# apps/frontend/src/components/app/sidebar KNOWLEDGE BASE

## OVERVIEW

Authenticated app sidebar composition for the current user menu, theme switching, profile navigation, and logout.

Scope: existing distinct app-shell boundary; retained in update mode. Reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Sidebar shell | `index.tsx` | Wraps `@workspace/ui-react/components/sidebar`. |
| User menu | `user-menu.tsx` | Current user query, theme submenu, profile link, logout action. |
| Logout hook | `../../../features/user_management/authentication/hooks/use-logout-mutation.ts` | Clears profile query cache and redirects to `/login`. |
| Profile query | `../../../libs/tuyau.ts` | Uses `api.accountManagement.profile.view.queryOptions()`. |

## CONVENTIONS

- Keep data fetching in `SidebarUserMenu`; `Sidebar` stays structural.
- Use `next-themes` values `light`, `dark`, and `system` for theme radio items.
- Profile link points to `/profile`; profile tabs own deeper settings navigation.
- Logout menu item disables itself and shows `Spinner` while mutation is pending.

## ANTI-PATTERNS

- Do not duplicate profile query keys; use generated Tuyau query helpers.
- Do not hardcode current user data outside the query result.
- Do not move logout redirect behavior into the visual sidebar component.

The current-user query is shared with route auth gates; keep menu state derived from the query.
