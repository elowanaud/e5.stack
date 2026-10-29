<!-- prettier-ignore -->
<div align="center">

<pre>
███████╗███████╗   ███████╗████████╗ █████╗  ██████╗██╗  ██╗
██╔════╝██╔════╝   ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
█████╗  ███████╗   ███████╗   ██║   ███████║██║     █████╔╝ 
██╔══╝  ╚════██║   ╚════██║   ██║   ██╔══██║██║     ██╔═██╗ 
███████╗███████║██╗███████║   ██║   ██║  ██║╚██████╗██║  ██╗
╚══════╝╚══════╝╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
</pre>

**A modern TypeScript monorepo for typed API and web application development.**

[![Node.js](https://img.shields.io/badge/Node.js-24.x-43853D?style=flat-square&logo=node.js&logoColor=white)](#)
[![pnpm](https://img.shields.io/badge/pnpm-10.33.2-f69220?style=flat-square&logo=pnpm&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-007ACC?style=flat-square&logo=typescript&logoColor=white)](#)
[![AdonisJS](https://img.shields.io/badge/AdonisJS-7.3-220052?style=flat-square&logo=AdonisJS&logoColor=white)](#)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-1.168-FF4154?style=flat-square&logo=react-query&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-19.2-20232A?style=flat-square&logo=react&logoColor=61DAFB)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](#)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.9-EF4444?style=flat-square&logo=turborepo&logoColor=white)](#)
[![Biome](https://img.shields.io/badge/Biome-2.4-60A5FA?style=flat-square&logo=biome&logoColor=white)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/eloitsme/e5.stack/ci.yml?style=flat-square&label=CI)](.github/workflows/ci.yml)

_AdonisJS API, TanStack Start web app, and shared UI packages connected by Tuyau and pnpm workspaces._

[Overview](#overview) • [Stack](#stack) • [Getting Started](#getting-started) • [Commands](#commands) • [Testing](#testing) • [Architecture](#architecture)

</div>

---

## Overview

**e5.stack** is a pnpm/Turborepo workspace with an **AdonisJS** JSON API, a **TanStack Start** React app, and split UI packages for React components and generated Tailwind CSS. The web app consumes the API through **Tuyau**, so route definitions generate the typed client surface used by React Query hooks.

## Features

- **Typed API Client:** Tuyau exposes generated API query and mutation helpers from the Adonis route registry.
- **Feature-First API:** User-management code is grouped by domain under `apps/backend/src/features/frontend/account_management`.
- **TanStack Start Web App:** File routes use custom `layout.tsx` and `page.tsx` tokens, plus route groups for guest/private flows.
- **Profile Settings Flow:** Authenticated profile UI is tabbed across `/profile`, `/profile/security`, and `/profile/privacy`.
- **Shared UI Packages:** `@workspace/ui-react` provides Storybook-backed components; `@workspace/ui-theme` generates checked-in Tailwind CSS from tokens.
- **French i18n Build:** Source `locales/fr.json` files compile into a generated web bundle during install and development.

## Project Structure

```text
e5.stack/
├── apps/
│   ├── backend/                 # AdonisJS API, queue worker, Docker Compose sidecars
│   └── frontend/                 # TanStack Start app, Tuyau client, French i18n build
├── packages/
│   └── ui/
│       ├── react/           # @workspace/ui-react, Storybook component package
│       └── theme/           # @workspace/ui-theme, token source + generated CSS
├── biome.json               # Biome formatting, linting, organize imports
├── package.json             # Root scripts, Node/pnpm pins
├── pnpm-workspace.yaml      # Workspace globs: apps/*, packages/**
└── turbo.json               # Turbo task graph
```

## Stack

| Area        | Technologies                                                                                       |
| :---------- | :------------------------------------------------------------------------------------------------- |
| **Core**    | TypeScript 6.0.3, Node 24, pnpm 10.33.2, Turborepo 2.9.16                                          |
| **API**     | AdonisJS 7.3.4, Lucid, Bouncer, Session Auth, Queue, Mail, Tuyau, Japa                             |
| **Web**     | React 19.2.7, TanStack Start 1.168.20, TanStack Router, TanStack Query, TanStack Form, Vite 8.0.16 |
| **UI**      | Tailwind CSS 4.3.0, Base UI, tailwind-variants, lucide-react, sonner, Storybook 10.4.2             |
| **Tooling** | Biome 2.4.16, Docker, GitHub Actions                                                               |

## Getting Started

### Prerequisites

- **Node.js** `24` (`.npmrc` enforces engine strictness)
- **pnpm** `10.33.2`
- **Docker & Docker Compose** for the API database, Redis, and mail sidecars

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eloitsme/e5.stack.git
   cd e5.stack
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   `apps/frontend` runs `i18n:merge` during `postinstall`, generating the French i18n bundle.

3. Configure the API environment from `apps/backend/.env.example`, then start Docker.

   To preview emails in your browser instead of sending them via SMTP, set
   `MAIL_MAILER=browser`. SMTP remains available with `MAIL_MAILER=smtp`.
   Browser previews open on the machine running the email worker (or the API when
   `QUEUE_DRIVER=sync`), so use this transport with a local desktop process.
   It writes previews to the system temporary directory and does not deliver emails
   to recipients or launch the iOS Simulator.

4. Start development:

   ```bash
   pnpm dev
   ```

> [!NOTE]
> Root `pnpm dev` runs Turbo with Portless. On its first run, Portless creates and trusts a
> local certificate authority and may ask for your system password. Development servers are
> available at:
>
> - Web: `https://frontend.e5.localhost`
> - API: `https://api.e5.localhost`
> - UI: `https://ui.e5.localhost`
>     >
      The theme package keeps its direct file-watcher command. The API database, Redis, mail
> sidecars, and email worker remain available through their dedicated commands.

Storybook is available at the UI URL above. Existing stories are grouped under `V1/`
in the navigation; future V2 stories should use a `V2/` CSF title prefix. Story files
remain colocated with their components.

## Commands

Run root commands from the repository root:

| Command                 | Description                                          |
| :---------------------- | :--------------------------------------------------- |
| `pnpm dev`              | Starts the Portless-enabled Turbo development graph. |
| `pnpm build`            | Builds the workspace with dependency ordering.       |
| `pnpm typecheck`        | Runs workspace TypeScript checks.                    |
| `pnpm test`             | Runs all workspace test suites through Turbo.        |
| `pnpm test:unit`        | Runs workspace unit suites.                          |
| `pnpm test:e2e`         | Runs workspace end-to-end suites.                    |
| `pnpm code-quality`     | Runs Biome checks.                                   |
| `pnpm code-quality:fix` | Runs Biome safe fixes.                               |
| `pnpm adonis`           | Forwards to the API Ace CLI.                         |

## Testing

API tests live in `apps/backend/tests/` and run through Japa. Feature tests mirror the source hierarchy under `tests/features/`, without the `frontend` segment:

- `*.unit.spec.ts` covers policies, jobs, and mails.
- `*.e2e.spec.ts` covers HTTP controllers with the Japa API client.
- `apps/backend/tests/bootstrap.ts` runs database migrations/truncation and starts the HTTP server for e2e suites.

Run all workspace suites with `pnpm test` (`turbo test`), individual suites with `pnpm test:unit` and `pnpm test:e2e`, or target the API with `pnpm --filter @workspace/backend test`. Turbo runs each package's `test` script; the backends use `node ace test` to run every configured suite. CI runs both unit and e2e jobs.

The example API has HTTP coverage for credential login, logout, and the public profile in `examples/backend/tests/features/frontend/`. Requests use `client.visit` with the existing named routes instead of hard-coded URLs and HTTP methods. Run it with `pnpm --filter @examples/backend test:e2e`; PostgreSQL must be available with the `e5_test` database and connection settings from `examples/backend/.env`. The runner migrates and truncates the test database. Every example API test, grouped or ungrouped and in every suite, runs inside a global database transaction that is rolled back after the test. Rate limiting is disabled in the test environment. Protected endpoint tests authenticate real database records with `withGuard("frontend").loginAs(user)`, while session assertions check authentication effects without claiming browser cookie persistence.

Example test scenarios are separate, explicitly named cases without datasets.

### Peer Dependency Validation

`pnpm-workspace.yaml` enables `strictPeerDependencies`, so missing or incompatible
peer dependencies are errors rather than warnings. CI explicitly re-runs dependency
resolution to validate peers even when the checked-in lockfile is already up to date:

```bash
pnpm install --resolution-only --no-frozen-lockfile --ignore-scripts
```

Resolve incompatible versions instead of disabling strict validation. The existing
`🔎 Type check` CI job runs this check after the frozen-lockfile installation.
Configure that job as required in GitHub branch protection to block incompatible
dependency updates, including Dependabot pull requests.

### Targeted Execution

Use pnpm filters when working on one surface:

```bash
pnpm --filter @workspace/backend dev
pnpm --filter @workspace/backend dev:app
pnpm --filter @workspace/backend worker
pnpm --filter @workspace/backend docker-compose
pnpm --filter @workspace/backend test

pnpm --filter @workspace/frontend dev
pnpm --filter @workspace/frontend dev:app
pnpm --filter @workspace/frontend preview
pnpm --filter @workspace/frontend i18n:merge

pnpm --filter @workspace/ui-react dev
pnpm --filter @workspace/ui-react dev:app
pnpm --filter @workspace/ui-react typecheck

pnpm --filter @workspace/ui-theme dev
pnpm --filter @workspace/ui-theme generate:tailwind
pnpm --filter @workspace/ui-theme build
```

The `dev` commands use Portless and the stable URLs above. Use `dev:app` to run an underlying
development process directly on its configured port, without the Portless proxy.

## Example Backend: Yaak

`examples/backend/yaak.json` contains the saved requests for `@examples/backend`,
grouped into Authentication, OAuth / GitHub, and Profile.

```bash
yaak import examples/backend/yaak.json
pnpm --filter @examples/backend dev:app
```

The `BASE_URL` variable defaults to `http://localhost:3333`. When running
`pnpm --filter @examples/backend dev` through Portless, set it locally to
`https://api.examples.localhost` instead. All environment variables use UPPERCASE.

- Set `EMAIL` and `PASSWORD` locally before sending **Log in with credentials**.
  Authentication uses the shared cookie jar, not a bearer token. An existing
  account is required; create one with
  `pnpm --filter @examples/backend exec node ace create:account`.
- After logging in, send **Profile / View profile** (`GET /profile`) with the same
  cookie jar. It returns the current user's `id`, `name`, `email`, `createdAt`, and
  `updatedAt` directly as JSON, without a wrapper or password. No body or parameters
  are required. Without an authenticated session, it returns HTTP 401.
- OAuth requests live in **OAuth / GitHub**. Redirect following is disabled so the
  authorization URL remains visible. Complete authorization in a browser with
  configured GitHub credentials; successful callbacks need fresh `OAUTH_CODE` and
  `OAUTH_STATE` values and the original state cookies. The saved callback defaults
  to an access-denied example; disable `error` and enable `code`/`state` when
  completing a real flow. `OAUTH_PROVIDER` defaults to `github`.
- Each endpoint description lists its error conditions, HTTP statuses, and exact
  application codes where present. OAuth callback errors returned with HTTP 200
  are documented as such; not every failure has an application code.
- Nonempty environment values use Yaak's native `secure()` encryption
  (XChaCha20-Poly1305); empty values contain no data to encrypt. When setting or
  replacing values, keep encryption enabled and use **Encrypt All Variables**.
- After importing on another machine, enter the workspace key in Yaak's desktop
  encryption settings before sending requests. The key is not included in the
  export; back it up in a password manager and never commit or share it alongside
  the workspace. See [Yaak's encryption documentation](https://yaak.app/docs/collaboration/secrets-encryption).
- The export contains no session cookies. Encryption does not erase older
  plaintext exports, backups, or Git history; protect those separately.

## Architecture

<details>
<summary><strong>API</strong></summary>

- Boot files live in `apps/backend/start`; runtime entries are `bin/server.ts`, `bin/console.ts`, and `bin/test.ts`.
- Routes are imported from `apps/backend/start/routes.ts`, then declared inside feature modules under `src/features/frontend/account_management/*/routes.ts`.
- Generated Adonis/Tuyau artifacts power controller imports and the `@workspace/backend/registry` client export.
- Mail side effects run through queue jobs on queue `emails`; local compose services are Postgres, Redis, and smtp4dev.
- Keep `@adonisjs/redis` on `10.0.2` while Queue `0.6.2`, Session `8.1.0`, and Limiter `3.0.1` require Redis package major 10. This is the AdonisJS client package version, not the Redis server version.

</details>

<details>
<summary><strong>Web</strong></summary>

- TanStack Start uses `src/routes` with `layout.tsx` and `page.tsx` route tokens from `vite.config.ts`.
- `src/router.tsx` wires the QueryClient, generated route tree, and SSR query integration.
- Frontend features remain under `user_management`; backend routes use `frontend/account_management`. Route files compose feature components.
- The profile section is route-tabbed: profile update, password security, and privacy/delete account.

</details>

<details>
<summary><strong>UI & Theme</strong></summary>

- `@workspace/ui-react` exports `components/*`, `icons`, and `hooks/*`; it has Storybook and typecheck scripts, but no build script.
- `@workspace/ui-theme` exports `tokens` and `tailwind`; edit `src/tokens.ts`, then regenerate `src/tailwind.css`.
- Web and Storybook both import the generated Tailwind CSS from the theme package.

</details>

## Generated Files

Do not edit generated files manually:

- `apps/backend/.adonisjs/**`
- `apps/backend/ace.js`
- `apps/backend/database/schema.ts`
- `apps/frontend/src/routeTree.gen.ts`
- `apps/frontend/src/libs/i18n/build/**`
- `packages/ui/theme/src/tailwind.css`

## CI & Deployment

GitHub Actions runs on pull requests: Biome, affected typecheck/build, and unit/e2e tests.

The API Docker image prunes/builds the API package, exposes `8080`, then runs migrations before `node apps/backend/bin/server.js`. The web Docker image builds with `VITE_API_BASE_URL` and serves `apps/frontend/dist/client` through nginx on port `80`.

---

<div align="center">
  <i>Built with pnpm, Turbo, and the modern TypeScript web stack.</i>
</div>
