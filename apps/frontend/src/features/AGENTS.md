# apps/frontend/src/features KNOWLEDGE BASE

## OVERVIEW

Frontend feature modules. Current frontend domain is `user_management`; the API uses `frontend/account_management`; route files remain under `src/routes`.

Scope: existing distinct feature workflow; retained in update mode. Reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Domain features | `user_management/` | Contains authentication, password, and profile UI. |
| Shared form wrapper | `../libs/form.ts` | Feature forms should use `useAppForm`. |
| API client | `../libs/tuyau.ts` | Feature hooks use typed Tuyau query/mutation helpers. |
| Locale build | `../../vite.config.ts` | Uses the workspace i18next-merger plugin. |
| Route surfaces | `../routes/(guest)/(auth)/*`, `../routes/(private)/profile/*` | Routes compose feature components. |

## CONVENTIONS

- Keep feature folders domain-first: `features/<domain>/<feature>`.
- Put feature components, hooks, and locales under the feature folder.
- Use `#/` imports for app-local modules.
- Preserve explicit namespace strings in hooks and matching locale objects; filesystem and namespace names currently differ.

## ANTI-PATTERNS

- Do not put route-specific files in `features`; route files stay under `src/routes`.
- Do not edit generated i18n output under `src/libs/i18n/build`.
- Do not call raw fetch for API endpoints; use `src/libs/tuyau.ts`.

## NOTES

- Current feature code covers authentication, password, and profile flows; route composition lives outside `features`.
- Add one AGENTS file per domain or concrete feature when new conventions appear.
- Backend routes use `frontend.account_management`; the exported frontend client already selects `.frontend`.
