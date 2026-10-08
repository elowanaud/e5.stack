# apps/backend/src/features KNOWLEDGE BASE

## OVERVIEW

Feature-first HTTP modules for the API. Current domain: `web/account_management`; keep this file as domain-boundary guidance only.

Scope: existing distinct feature workflow; retained in update mode. Reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Domain routes | `web/routes.ts`, `web/account_management/*/routes.ts` | `start/routes.ts` imports `web/routes.ts`, which imports concrete route modules. |
| Generated route targets | `#generated/controllers` | Do not hand-edit generated registry files. |
| Cross-feature validators | `../validators/user.validator.ts` | Shared by profile/password controllers. |
| Auth middleware registry | `apps/backend/start/kernel.ts` | Named `auth` / `guest` middleware comes from this tree. |
| Feature docs | `web/account_management/*/AGENTS.md` | Concrete feature rules live below the domain. |

## CONVENTIONS

- Current hierarchy is `src/features/<surface>/<domain>/<feature>`; `web` is the active surface.
- Concrete route files are imported by `web/routes.ts`; register new surfaces from `start/routes.ts`.
- Controllers, services, policies, jobs, and mails are feature-local; middleware, exceptions, validators, and presenters are shared under `src`.
- Route handlers should use generated controller imports, not direct controller imports.

## ANTI-PATTERNS

- Do not add code directly at `src/features` root except domain-level guidance.
- Do not rely on directory discovery to load web routes; add each import to `web/routes.ts`.
- Do not edit `.adonisjs/server/controllers.ts` to fix missing generated routes; fix source names and regenerate.

## NOTES

- Generated controller keys follow `controllers.features.web.accountManagement.<feature>`.
- Add non-account web domains beside `web/account_management`.
- Keep feature-local AGENTS files only where routes, jobs, mail, or cache behavior differ from this root.
