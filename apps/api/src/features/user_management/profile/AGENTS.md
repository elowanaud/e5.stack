# apps/api/src/features/user_management/profile KNOWLEDGE BASE

## OVERVIEW

Authenticated current-user profile API for view, update, and account deletion.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Routes | `routes.ts` | All routes under `/profile` and named `profile`. |
| View | `controllers/view.controller.ts` | Returns `auth.user!.toJSON()`. |
| Update | `controllers/update.controller.ts` | Validates `UpdateUserSchema`, merges, saves. |
| Delete | `controllers/delete.controller.ts` | Deletes authenticated user and returns null. |
| User shape | `../../../models/user.ts` | Controls returned JSON fields. |

## CONVENTIONS

- Entire route group uses `middleware.auth({ guards: ["web"] })`.
- Controller handlers take `HttpContext` and use `auth.user!` after route auth.
- Return sanitized `user.toJSON()` for read/update responses.

## ANTI-PATTERNS

- Do not expose password or token relations in profile responses.
- Do not duplicate update validation inside controllers; keep schema based on `UpdateUserSchema`.
- Do not make profile routes guest-accessible.

## NOTES

- Web route guards and auth mutations use the `profile.view` query key for session state.
- Deleting the profile currently deletes the authenticated `User` record directly.
- Add profile subfeatures here only when they share the `/profile` route surface.
