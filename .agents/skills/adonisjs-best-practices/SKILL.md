---
name: adonisjs-best-practices
description: AdonisJS v7 correctness, security, and performance guidelines. Use when writing, reviewing, debugging, or refactoring AdonisJS v7 applications, including Lucid queries and migrations, VineJS validation, HTTP middleware, auth and sessions, providers, Ace/codegen, queues, caching, uploads, deployment, Japa tests, Edge, Inertia, and Tuyau. Apply even when best practices are not explicitly requested. Not a legacy AdonisJS migration or generic Node.js/React skill.
metadata:
  author: community
  version: "1.0.1"
---

# AdonisJS Best Practices

Independent community guidance for **AdonisJS v7**, with 72 rules across 8 categories, prioritized by consequence. Not an official publication or endorsement by the AdonisJS team. Each rule is self-contained, with examples, compatibility caveats, and direct official source URLs.

## When to Apply

Reference these guidelines when:
- Implementing routes, middleware, authentication, authorization, or input/output boundaries
- Writing Lucid queries, relationships, transactions, factories, or migrations
- Configuring providers, code generation, background work, storage, caching, or deployment
- Testing behavior and isolation, including denial and cross-tenant paths
- Integrating Edge, Inertia, Tuyau, or real-time clients
- Reviewing or debugging existing AdonisJS v7 code

## Compatibility First

Inspect the application's `package.json`, lockfile, `adonisrc.ts`, TypeScript configuration, and existing conventions before selecting APIs. This skill covers v7 only: report an older major rather than silently upgrading or applying these examples as a migration. v7 requires Node.js 24+; generated imports also require the relevant codegen configuration.

Lucid, VineJS, auth, Edge, Japa, BentoCache, FlyDrive, Verrou, and other ecosystem packages have **independent versions**, not a shared v7 API. Read each applicable rule's caveats and official URLs; reconcile examples with installed declarations and current official package documentation. Do not assume a generated framework API reference describes v7 merely because it is hosted on an official domain. State unresolved API uncertainty rather than inventing imports or methods.

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Security and Trust Boundaries | CRITICAL | `security-` |
| 2 | Data Integrity and Queries | CRITICAL | `db-` |
| 3 | HTTP Boundaries and Lifecycle | HIGH | `http-` |
| 4 | Runtime Validation | HIGH | `validation-` |
| 5 | Framework Architecture | HIGH | `core-` |
| 6 | Production Reliability | HIGH | `ops-` |
| 7 | Testing and Isolation | HIGH | `test-` |
| 8 | Rendering and Client Contracts | MEDIUM-HIGH | `view-` |

Category impact is a selection aid, not a ceiling on individual rules: a critical escaping or runtime-validation boundary still takes priority. Apply only relevant rules; do not introduce queues, locks, caches, or abstraction layers without a requirement.

## Quick Reference

### 1. Security and Trust Boundaries (CRITICAL)

- `security-authfinder-passwords` - Verify credentials with AuthFinder and one hashing owner
- `security-authorize-before-mutation` - Authorize the loaded resource before changing it
- `security-cors-allowlist` - Explicitly allowlist production browser origins
- `security-csrf-cookie-mutations` - Protect cookie-authenticated mutations against CSRF
- `security-explicit-guards-session` - Enforce the guard intended for the transport
- `security-opaque-token-capabilities` - Bound opaque access-token capabilities
- `security-private-storage-keys` - Authorize objects and control storage paths server-side
- `security-session-device-management` - Manage and revoke devices without exposing session capabilities
- `security-shared-rate-limits` - Share limiter state and use trustworthy keys
- `security-shield-headers` - Preserve existing guards when configuring browser headers
- `security-tenant-query-boundaries` - Derive tenant authority from authenticated membership
- `security-trusted-proxies` - Trust only the deployed proxy boundary
- `security-validate-upload-boundaries` - Restrict multipart parsing and validate before storage
- `security-validated-secrets` - Validate startup secrets and keep configuration server-side

### 2. Data Integrity and Queries (CRITICAL)

- `db-bind-values-allowlist-identifiers` - Bind values and allowlist dynamic SQL identifiers
- `db-bound-list-queries` - Bound list queries and order pagination deterministically
- `db-bulk-writes-hook-semantics` - Account for hooks and timestamps when choosing bulk writes
- `db-concurrent-read-modify-write` - Protect read-modify-write operations against races
- `db-database-constraints` - Enforce durable invariants in the database
- `db-explicit-public-serialization` - Allowlist public fields rather than exposing model state
- `db-factories-test-isolation` - Match factory overrides and persistence to assertions
- `db-generated-schema-ownership` - Separate generated columns from model behavior
- `db-hooks-transaction-effects` - Do not confuse after-save hooks with committed state
- `db-managed-transactions` - Keep atomic writes in a managed transaction
- `db-migration-deferred-data` - Use defer and its client for migration data operations
- `db-migration-deployment-safety` - Stage compatible schema changes with recovery in mind
- `db-preload-avoid-n-plus-one` - Preload required relationships instead of querying in loops
- `db-preload-per-parent-limit` - Use groupLimit for top-N children per parent
- `db-scope-relationship-ownership` - Resolve children through an authorized parent
- `db-transaction-client-propagation` - Propagate the caller's transaction through every query

### 3. HTTP Boundaries and Lifecycle (HIGH)

- `http-await-next-and-return` - Await downstream middleware and return on rejection
- `http-middleware-stack-order` - Order middleware by lifecycle dependencies
- `http-preserve-exception-handling` - Preserve exception semantics and disable production debug output
- `http-route-specific-before-dynamic` - Register specific routes before overlapping dynamic routes
- `http-validate-query-and-params` - Validate route and query input before use

### 4. Runtime Validation (HIGH)

- `validation-compile-once-safe-reuse` - Reuse validators and clone mutable schema fragments
- `validation-cross-field-contracts` - Express cross-field requirements in the schema
- `validation-database-checks-not-constraints` - Treat unique and exists checks as preflight only
- `validation-optional-nullable-patch` - Distinguish omission from null in PATCH requests
- `validation-trusted-runtime-metadata` - Supply trusted context as typed validator metadata
- `validation-use-validated-output` - Persist validated output, not the original request

### 5. Framework Architecture (HIGH)

- `core-context-outside-http` - Pass durable identity to jobs, not ambient HTTP context
- `core-inject-runtime-values` - Import injectable constructors as runtime values
- `core-inspect-installed-version` - Inspect installed versions before choosing APIs
- `core-provider-registration` - Keep provider registration synchronous and lazy
- `core-request-context-isolation` - Keep request context out of shared singletons
- `core-respect-generated-code` - Regenerate indexes rather than editing generated modules
- `core-warmup-side-effects` - Separate framework registration from runtime side effects

### 6. Production Reliability (HIGH)

- `ops-build-runtime-assets` - Deploy the standalone build with dependencies and assets
- `ops-cache-invalidation` - Invalidate affected variants after successful writes
- `ops-cache-key-isolation` - Include every visibility and query dimension in cache keys
- `ops-cache-multitier` - Synchronize process-local cache layers across replicas
- `ops-codegen-warmup` - Refresh route-derived contracts before CI typechecking
- `ops-health-readiness` - Separate liveness, readiness, and private diagnostics
- `ops-jobs-durable-workers` - Use persistent queues and explicitly deploy workers
- `ops-jobs-idempotency` - Make retries safe beyond dispatch deduplication windows
- `ops-jobs-json-payloads` - Dispatch serializable identifiers and reload authoritative state
- `ops-jobs-transaction-boundary` - Dispatch after commit and decide durability separately
- `ops-lock-lease` - Treat lock TTL as a lease, not permanent exclusivity
- `ops-lock-ownership` - Acquire and release the same owned lock with bounded waiting
- `ops-logging-redaction` - Log structured context and redact secrets at known paths
- `ops-mail-deferred-durability` - Do not equate sendLater with durable or completed delivery
- `ops-redis-lifecycle` - Reuse managed Redis connections and close owned resources
- `ops-sse-channel-authorization` - Authenticate subscriptions and authorize private channels

### 7. Testing and Isolation (HIGH)

- `test-database-isolation` - Match rollback or truncation to actual database execution
- `test-fakes-cleanup` - Register fake cleanup before assertions or side effects
- `test-negative-authorization` - Exercise anonymous, non-owner, and cross-tenant HTTP requests
- `test-redis-storage-isolation` - Use dedicated test storage before destructive cleanup

### 8. Rendering and Client Contracts (MEDIUM-HIGH)

- `view-edge-escaping` - Escape untrusted output and preserve context boundaries
- `view-inertia-public-props` - Treat Inertia props and shared data as browser-visible
- `view-inertia-ssr-boundaries` - Keep SSR request data local and deploy the server entrypoint
- `view-tuyau-runtime-boundary` - Use typed client contracts without assuming runtime trust

## How to Use

Read the relevant individual rules, for example:

```text
rules/security-tenant-query-boundaries.md
rules/db-managed-transactions.md
```

Each rule contains a rationale, incorrect and correct examples, applicability/version caveats, and official URLs. Those URLs are the authoritative references, not a bundled documentation mirror. Adapt examples to existing application imports, fields, configuration, and consumers.

Prioritize the actual trust boundary and failure consequence. Keep changes narrow, update affected consumers, and use the project's authorized verification workflow. Inspect test bootstrap and storage configuration before running commands that migrate or delete data. In reviews, report code-backed findings with location, failure scenario, correction, and applicable rule; distinguish demonstrated defects from unverified risks.

## Full Compiled Document

For the complete guide with all 72 rules expanded: `AGENTS.md`. Individual `rules/` files are the authoring source; keep the compiled guide synchronized when editing them. See `README.md` for manual maintenance.
