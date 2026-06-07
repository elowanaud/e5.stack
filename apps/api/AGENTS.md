# apps/api KNOWLEDGE BASE

## OVERVIEW

AdonisJS 7 API package with session auth, Lucid models, feature-first user management, queued mail jobs, Tuyau registry generation, and Japa test bootstrap.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Boot / app wiring | `adonisrc.ts`, `start/routes.ts`, `start/kernel.ts`, `start/view.ts` | `adonisrc.ts` preloads start files and runs registry hooks. |
| HTTP runtime | `bin/server.ts` | Package `start` uses built `bin/server.js`. |
| Ace CLI | `bin/console.ts`, `ace.js` | `ace.js` is generated/overwritten. |
| Tests | `bin/test.ts`, `bootstrap.ts`, `adonisrc.ts`, `.env.test` | Suites: unit and e2e; specs live beside user-management feature code. |
| Routes | `src/features/user_management/*/routes.ts` | Imported by `start/routes.ts`. |
| Controllers | `src/features/**/controllers/*.controller.ts` | Generated registry consumed as `#generated/controllers`. |
| Auth/session | `config/auth.ts`, `config/session.ts`, `start/kernel.ts` | Custom auth/guest middleware in feature folder. |
| Models/schema | `src/models/*`, `database/migrations/*`, `database/schema.ts` | `database/schema.ts` is generated. |
| Validation | `src/validators/user.validator.ts` | Shared by profile/password controllers. |
| Mail/queue | `config/mail.ts`, `config/queue.ts`, `src/features/user_management/*/{jobs,mails}/*` | Mail jobs dispatch on queue `emails`. |
| Local services | `docker-compose.yml` | Postgres, Redis, smtp4dev mail UI. |

## STRUCTURE

```text
apps/api/
├── bin/                 # server, console, test entrypoints
├── config/              # Adonis config; imports #start/env
├── database/            # migrations, factories, generated schema
├── start/               # routes/kernel/env/view boot files
├── src/features/        # feature-first HTTP code
├── src/models/          # Lucid models extending generated schemas
├── src/presenters/      # API response shaping helpers
├── src/services/        # cross-feature services
└── bootstrap.ts         # Japa plugins, DB setup, HTTP server setup
```

## CONVENTIONS

- Feature routes use `router.group().prefix().as()` and controllers from `#generated/controllers`.
- Controllers expose `handle()`; payload schemas are static `vine.create(...)` where needed.
- Injectable services use `@inject()` when they depend on context/services.
- Feature jobs extend `Job` and put email work on queue `emails`.
- Custom exceptions extend `Exception`; app handler maps Adonis auth errors to local exceptions.
- Tests are colocated as `*.unit.spec.ts` and `*.e2e.spec.ts`; e2e suites start the HTTP server via `bootstrap.ts`.
- API-specific Biome allows non-null assertions and value imports used as types.

## ANTI-PATTERNS

- Do not edit `ace.js`, `.adonisjs/**`, or `database/schema.ts` manually.
- Do not bypass `force_json_response.middleware.ts`; clients expect JSON errors/responses.
- Do not send a response from `src/exceptions/handler.ts` `report()`.
- Do not rename `password_changed_notifiction.mail.ts` without updating current imports and generated registries.

## COMMANDS

```bash
pnpm --filter @workspace/api dev
pnpm --filter @workspace/api worker
pnpm --filter @workspace/api test
pnpm --filter @workspace/api typecheck
pnpm --filter @workspace/api build
pnpm --filter @workspace/api docker-compose
```

## NOTES

- `dev` is wired in Turbo with `docker-compose` and `worker` sidecars.
- Compose services are `postgresql`, `redis`, and `mailtrap` (`smtp4dev`).
- Docker runtime runs migrations in `ENTRYPOINT` before `bin/server.js`.
- `@workspace/api/registry` exports `.adonisjs/client/registry/index.ts` for the web app.
