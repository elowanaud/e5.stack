# apps/web/src/features/user_management KNOWLEDGE BASE

## OVERVIEW

Frontend user-management domain. Current concrete features: authentication (login/logout) and password recovery (forgot/reset).

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Login form and mutations | `authentication/` | Components, hooks, and translations. |
| Route surfaces | `../../routes/(guest)/(auth)/*` | Route files render/auth-gate the feature. |
| Auth shell UI | `../../components/app/sidebar/*` | Logout mutation consumed by sidebar menu. |
| Auth helper | `../../utils/auth.ts` | Route guards call `isAuthenticated`. |

## CONVENTIONS

- Match backend domain naming (`user_management`) rather than inventing UI-only names.
- Keep feature UI reusable from routes; route pages should compose feature components.
- Keep auth redirects in route layouts or mutation hooks, not presentation components.

## ANTI-PATTERNS

- Do not move route guards into feature components.
- Do not add domain locales outside `locales/fr.json` unless the compiler is updated.
- Do not duplicate profile cache keys; use `api.profile.view.pathKey()`.

## NOTES

- The login route owns search validation; the feature owns form and mutation behavior.
- Sidebar logout consumption is outside this feature but still depends on its logout hook.
- Add future user-management features beside `authentication`, not inside it.
