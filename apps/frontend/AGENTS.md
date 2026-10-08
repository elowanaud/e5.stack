# apps/frontend KNOWLEDGE BASE

## OVERVIEW

TanStack Start app with file routes, React Query, Tuyau API client, TanStack Form wrappers, next-themes, nginx static deployment, and generated French i18n bundle.

Scope: existing distinct package boundary; retained in update mode. Reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Build/dev setup | `package.json`, `vite.config.ts`, `tsconfig.json` | Vite plugin sets route tokens to `layout` and `page`. |
| Router | `src/router.tsx`, `src/routes/__root.tsx` | Router owns QueryClient context and SSR query integration. |
| Auth gates | `src/routes/(private)/layout.tsx`, `src/routes/(guest)/(auth)/layout.tsx` | `beforeLoad` redirects via `isAuthenticated`. |
| API client | `src/libs/tuyau.ts` | Uses `@workspace/backend/registry`, SuperJSON, credentials include. |
| Forms | `src/libs/form.ts`, `src/components/form/*` | App fields registered once, reused by features. |
| Login flow | `src/features/user_management/authentication/**` | Hooks own mutations, redirects, error mapping, form setup. |
| Password recovery | `src/routes/(guest)/(auth)/forgot-password/page.tsx`, `src/routes/(guest)/(auth)/reset-password/page.tsx` | Forgot/reset password pages using feature form hooks. |
| Profile tabs | `src/routes/(private)/profile/{layout,page}.tsx`, `src/routes/(private)/profile/{security,privacy}/page.tsx` | Tabs for profile, security, privacy. |
| i18n | `vite.config.ts`, `src/**/locales/fr.json`, `src/libs/i18n/config.ts` | Source locales compile to `src/libs/i18n/build/fr.json`. |
| Providers | `src/providers/*`, `src/routes/__root.tsx` | Theme provider plus TanStack devtools. |
| App shell | `src/components/app/sidebar/*` | Authenticated sidebar, current user query, theme menu, logout UI. |
| Deployment | `Dockerfile`, `nginx.conf` | Vite output served from nginx with SPA fallback. |

## STRUCTURE

```text
apps/frontend/src/
├── components/          # app, form, pages buckets
├── features/            # user_management UI; backend uses frontend/account_management
├── libs/                # form, i18n, Tuyau client
├── providers/           # theme/devtools providers
├── routes/              # TanStack file routes using layout/page tokens
├── styles/              # imports @workspace/ui-theme/tailwind
└── utils/               # auth and Tuyau error helpers
```

## CONVENTIONS

- Route files are `layout.tsx` and `page.tsx`; route groups use `(private)`, `(guest)`, `(auth)`.
- Private/guest access is enforced in route `beforeLoad`, not inside page components.
- Profile settings are route-tabbed: `/profile`, `/profile/security`, `/profile/privacy`.
- Use `api.*.queryOptions()` / `mutationOptions()` from `src/libs/tuyau.ts`.
- Clear `api.accountManagement.profile.view.pathKey()` cache after login/logout.
- Use `useAppForm` from `src/libs/form.ts` for forms so shared field components are available.
- Namespace strings can retain `features.web.account_management` despite frontend folders named `user_management`; update copy and consumers together.
- `#/` alias points to `src/*`.

## ANTI-PATTERNS

- Do not edit `src/routeTree.gen.ts` or `src/libs/i18n/build/fr.json` manually.
- Do not add route files with default TanStack names if `vite.config.ts` route tokens still expect `layout` / `page`.
- Preserve `toastifyTuyauError` mappings for network, validation, custom response codes, and unexpected errors.
- Existing locale typos (`descritpion`, `componoent.pages.unexpected`) are real keys; fix with coordinated key updates only.

## COMMANDS

```bash
pnpm --filter @workspace/frontend dev
pnpm --filter @workspace/frontend build
pnpm --filter @workspace/frontend preview
pnpm --filter @workspace/frontend typecheck
pnpm --filter @workspace/frontend i18n:merge
```

## NOTES

- `dev` uses Portless (`frontend.e5`); `dev:app` runs Vite using the assigned `PORT`.
- `postinstall` runs `i18n:merge`; `@workspace/i18next-merger/vite` regenerates on build and locale add/change/unlink.
- `biome.json` excludes `.tanstack`, `routeTree.gen.ts`, `.output`, and generated locale JSON.
- Root document imports globals and i18n config before rendering providers.
- Docker build bakes `VITE_API_BASE_URL`; nginx serves `dist/client` with `_shell.html` fallback.
