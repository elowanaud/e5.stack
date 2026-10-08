# apps/frontend/src/features/user_management/authentication KNOWLEDGE BASE

## OVERVIEW

Login/logout frontend feature built with TanStack Form, Tuyau mutations, React Query cache updates, and colocated French translations.

Scope: existing distinct feature workflow; retained in update mode. Reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Login UI | `components/login-form.tsx` | Uses `useLoginForm`. |
| Form setup | `hooks/use-login-form.ts` | Builds `useAppForm` defaults and submit handler. |
| Login mutation | `hooks/use-login-mutation.ts` | Calls `api.accountManagement.authentication.login`. |
| Logout mutation | `hooks/use-logout-mutation.ts` | Calls `api.accountManagement.authentication.logout`; used by sidebar. |
| Translations | `components/locales/fr.json`, `hooks/locales/fr.json` | Error copy for auth hooks. |
| Login route | `../../../routes/(guest)/(auth)/login/page.tsx` | Validates `redirectTo` search. |

## CONVENTIONS

- Form defaults are `{ uid: "", password: "" }`.
- Login success clears `api.accountManagement.profile.view.pathKey()` and navigates to `redirectTo ?? "/"`.
- Logout success clears `api.accountManagement.profile.view.pathKey()` and navigates to `/login`.
- Hook translation namespaces include the full feature path and hook name.
- Error mappings translate Tuyau network, validation, auth, guest-only, and unexpected cases.

## ANTI-PATTERNS

- Do not hardcode API paths; use the generated `api.accountManagement.authentication.*` helpers.
- Do not bypass `useAppForm`; field components are registered centrally.
- Do not change backend error codes without updating `locales/fr.json` and hook mappings.
- Preserve optional `redirectTo` and `defaultValues` in `useLoginForm`; login search validation belongs to the route.
