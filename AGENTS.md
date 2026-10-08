# PROJECT KNOWLEDGE BASE

**Generated:** 2026-10-08
**Commit:** 60a3b93
**Branch:** chore/workspace-agent-guidance

## OVERVIEW

pnpm/Turbo TypeScript monorepo with an AdonisJS API, TanStack Start web app, and split UI packages for React components plus generated Tailwind theme CSS.

## STRUCTURE

```text
e5.stack/
├── apps/backend/              # AdonisJS API; feature-first user management; Tuyau/Adonis codegen
├── apps/frontend/              # TanStack Start app; file routes, Tuyau client, compiled French i18n
├── packages/i18next-merger/   # CLI and Vite-plugin locale merger
├── packages/ui/react/         # Storybook-backed React UI package; components/icons/hooks exports
├── packages/ui/theme/         # token source + generated checked-in Tailwind CSS
├── package.json           # root Turbo scripts; pnpm@10.34.5; Node 24
├── pnpm-workspace.yaml    # workspace globs: apps/*, packages/**
├── turbo.json             # task graph
└── biome.json             # tabs, line width 100, organize imports
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Root commands / package manager | `package.json`, `turbo.json`, `pnpm-workspace.yaml` | Use pnpm, not npm/yarn. |
| API runtime / CLI | `apps/backend/bin/server.ts`, `apps/backend/bin/console.ts`, `apps/backend/adonisrc.ts` | `ace.js` is generated. |
| API routes | `apps/backend/start/routes.ts`, `apps/backend/src/features/frontend/{routes.ts,account_management/routes.ts}` | Start -> surface -> domain -> concrete feature routes; generated controllers. |
| API auth/session/mail/queue | `apps/backend/config/*.ts`, `apps/backend/start/kernel.ts`, `apps/backend/src/exceptions/handler.ts` | JSON-only behavior is middleware-enforced; mail jobs use queue `emails`. |
| Web routes | `apps/frontend/src/routes/**/{layout,page}.tsx`, `apps/frontend/src/router.tsx` | `routeTree.gen.ts` is generated. |
| Web API client | `apps/frontend/src/libs/tuyau.ts`, `@workspace/backend/registry` | Registry comes from the API build hooks. |
| Web forms | `apps/frontend/src/libs/form.ts`, `apps/frontend/src/components/form/*` | TanStack Form components registered centrally. |
| Web profile routes | `apps/frontend/src/routes/(private)/profile/**` | Tabs: profile, security, privacy. |
| Web password forms | `apps/frontend/src/features/user_management/password/**` | Forgot/reset guest forms and authenticated security-tab update form. |
| Web profile | `apps/frontend/src/features/user_management/profile/**` | Update/delete forms, hooks, mutations, and confirmation dialog. |
| Web translations | `packages/i18next-merger/src/{core,vite,cli}.ts`, `apps/frontend/vite.config.ts` | Merges colocated French locales into `src/libs/i18n/build`. |
| React UI components | `packages/ui/react/src/components/*`, `packages/ui/react/src/components/AGENTS.md` | Folder-per-component with story + barrel. |
| Theme tokens | `packages/ui/theme/src/tokens.ts` | Source of truth for `tailwind.css`. |
| Docker / CI | `.github/workflows/ci.yml`, `apps/*/Dockerfile` | CI runs quality, affected typecheck/build, unit, and e2e jobs. |

## CODE MAP

| Symbol / module | Type | Location | Role |
|-----------------|------|----------|------|
| `getRouter` | function | `apps/frontend/src/router.tsx` | Creates QueryClient-backed TanStack router. |
| `Providers` | component | `apps/frontend/src/providers/index.tsx` | Theme + TanStack devtools shell. |
| `api` | client | `apps/frontend/src/libs/tuyau.ts` | Typed API query/mutation surface. |
| `useAppForm` | hook factory | `apps/frontend/src/libs/form.ts` | App-standard form wrapper. |
| `User`, `UserPresenter` | model/presenter | `apps/backend/src/{models/user,presenters/user.presenter}.ts` | Auth finder and explicit profile response shape. |
| `OtpService` | service | `apps/backend/src/services/otp.service.ts` | Redis OTP generate/verify/revoke workflow. |
| `middleware` | registry | `apps/backend/start/kernel.ts` | Named auth/guest middleware. |
| `SidebarUserMenu` | component | `apps/frontend/src/components/app/sidebar/user-menu.tsx` | Current user query, theme menu, logout action. |
| `Button`, `Menu`, etc. | components | `packages/ui/react/src/components/*/index.ts` | Public UI exports. |
| `colors`, `fonts` | tokens | `packages/ui/theme/src/tokens.ts` | Theme generation input. |

## CONVENTIONS

- Format with Biome: tabs, line width 100, recommended lint rules, organize imports.
- Package manager is `pnpm@10.34.5`; Node engine is `24`; `.npmrc` enforces engine strictness.
- Workspace package imports use `@workspace/*`.
- API imports use package `imports` aliases: `#start/*`, `#features/*`, `#models/*`, `#generated/*`, etc.
- Web imports use `#/*` for `apps/frontend/src/*`.
- Web route files are `layout.tsx` and `page.tsx`; route groups use parentheses.
- UI component folders use `component.tsx`, `index.ts`, `component.stories.tsx`.
- `apps/frontend` runs `i18n:merge` on `postinstall`; the workspace Vite plugin regenerates locales during dev/build.
- No `.editorconfig`, `.eslintrc`, or `tailwind.config` files exist; Biome is the single lint/format source.
- API `tsconfig.json` inherits strictness from `@adonisjs/tsconfig` preset; web/ui packages set `strict: true` locally.
- API-specific Biome allows non-null assertions and value imports used as types.
- Web Biome enables `useSortedClasses` for `cn`/`cva`; UI React Biome enables it for `tv`.

## ANTI-PATTERNS (THIS PROJECT)

- Do not edit generated files: `apps/backend/.adonisjs/**`, `apps/backend/database/schema.ts`, `apps/backend/ace.js`, `apps/frontend/src/routeTree.gen.ts`, `apps/frontend/src/libs/i18n/build/**`, `packages/ui/theme/src/tailwind.css`.
- Do not send responses from `apps/backend/src/exceptions/handler.ts` `report()`.
- Preserve `apps/backend/src/middlewares/force_json_response.middleware.ts`; it forces `Accept: application/json`.
- Do not normalize existing typoed API mail filename casually: `password_changed_notifiction.mail.ts` is referenced by current code.
- Do not bypass `apps/backend/src/middlewares/force_json_response.middleware.ts`; clients expect JSON errors/responses.

## UNIQUE STYLES

- Backend features live under `src/features/frontend/account_management`; frontend UI remains under `src/features/user_management`.
- Backend route names are `frontend.account_management.*`; the frontend API client selects `.frontend` before exposing `api`.
- Web profile UI is route-tabbed: `/profile`, `/profile/security`, `/profile/privacy`.
- Theme package checks in generated CSS; edit tokens, then regenerate.
- Storybook is dev-only for UI React; there is no package build script there.
- API dev is "composed": Turbo runs `dev` with `docker-compose` and `worker` alongside the server.
- Backend, frontend, and Storybook `dev` scripts use Portless with `api.e5`, `frontend.e5`, and `ui.e5` names.
- CI uses `--affected` for typecheck and build; `TURBO_SCM_BASE` is explicitly set in CI for PR diffs.
- API Docker image runs DB migrations in `ENTRYPOINT` before server start.
- Web Docker image is static-only nginx serving `dist/client`; `VITE_API_BASE_URL` is baked at build time.

## COMMANDS

```bash
pnpm dev
pnpm build
pnpm typecheck
pnpm test:unit
pnpm test:e2e
pnpm code-quality
pnpm code-quality:fix
pnpm --filter @workspace/backend exec node ace
pnpm --filter @workspace/backend dev
pnpm --filter @workspace/backend worker
pnpm --filter @workspace/backend docker-compose
pnpm --filter @workspace/frontend dev
pnpm --filter @workspace/frontend preview
pnpm --filter @workspace/ui-react dev
pnpm --filter @workspace/ui-theme generate:tailwind
pnpm --filter @workspace/i18next-merger test
```

## NOTES

- Root `turbo dev` is persistent and uncached.
- API `dev` depends on `docker-compose` and `worker` sidecar tasks.
- `@workspace/backend/registry` is generated by Adonis/Tuyau during API build; web type-safety depends on it.
- `packages/ui/theme/src/tailwind.css` is generated from `src/tokens.ts`; run `generate:tailwind` after token edits.
- `@workspace/ui-react` has no build script; apps consume its source exports directly.
- Build order: Turbo `^build` ensures API registry and theme CSS are generated before web build.
- API/Japa tests live under `apps/backend/tests/features/`, mirroring source features without the `frontend` segment, as `*.unit.spec.ts` / `*.e2e.spec.ts`.
- Code map retained and spot-checked against source; LSP returned `Method not found`, ast-grep MCP unavailable, and no local binary found. Symbol density and reference centrality unmeasured.
- Update retained 17 existing guides, including deeper boundaries; new locations scored within depth 3. No new guide met the measured thresholds.
- Locale-merger tests use package script `test`, outside root Turbo `test:unit` / `test:e2e`.
- Root `adonis` and CI env setup target `apps/backend`; keep infrastructure paths aligned with package renames.
- No `Makefile` exists in the repo.
