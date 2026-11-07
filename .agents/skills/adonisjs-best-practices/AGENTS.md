# AdonisJS Best Practices

**Version 1.0.1**  
Independent community contributors  
November 2026

> This guide is optimized for agents and developers maintaining, generating, or refactoring AdonisJS v7 applications. Individual `rules/` files are the authoring source. This is independent community guidance, not an AdonisJS publication.

## Compatibility

Target AdonisJS v7 and Node.js 24+. Inspect installed package declarations and application configuration before applying examples. Lucid, VineJS, auth, Edge, Japa and other companions have independent versions. Examples assume their stated application setup; types do not replace runtime validation or authorization. Apply relevant rules rather than adding architecture without a requirement.

## Abstract

Independent community guidance for AdonisJS v7 applications, designed for AI agents and developers. Contains 72 self-contained rules across 8 prioritized categories: security and trust boundaries, data integrity and queries, HTTP boundaries and lifecycle, runtime validation, framework architecture, production reliability, testing and isolation, and rendering and client contracts. Rules include rationale, incorrect and correct examples, compatibility caveats, and direct official references. Ecosystem packages are independently versioned. This guide is not endorsed by the AdonisJS team.

## Table of Contents

1. [Security and Trust Boundaries](#1-security-and-trust-boundaries) — **CRITICAL**
   - 1.1 [Use AuthFinder credential verification and one hashing owner](#11-use-authfinder-credential-verification-and-one-hashing-owner)
   - 1.2 [Authorize the loaded resource before mutating it](#12-authorize-the-loaded-resource-before-mutating-it)
   - 1.3 [Allowlist browser origins explicitly in production](#13-allowlist-browser-origins-explicitly-in-production)
   - 1.4 [Keep CSRF protection on cookie-authenticated mutations](#14-keep-csrf-protection-on-cookie-authenticated-mutations)
   - 1.5 [Choose and enforce the intended auth guard](#15-choose-and-enforce-the-intended-auth-guard)
   - 1.6 [Treat access tokens as opaque capabilities with bounded scope](#16-treat-access-tokens-as-opaque-capabilities-with-bounded-scope)
   - 1.7 [Authorize stored objects and keep paths server-controlled](#17-authorize-stored-objects-and-keep-paths-server-controlled)
   - 1.8 [Manage device sessions without exposing session capabilities](#18-manage-device-sessions-without-exposing-session-capabilities)
   - 1.9 [Enforce rate limits in a shared backend with trustworthy keys](#19-enforce-rate-limits-in-a-shared-backend-with-trustworthy-keys)
   - 1.10 [Configure browser security headers without discarding existing guards](#110-configure-browser-security-headers-without-discarding-existing-guards)
   - 1.11 [Derive tenant boundaries from authenticated membership](#111-derive-tenant-boundaries-from-authenticated-membership)
   - 1.12 [Trust only the deployed proxy boundary](#112-trust-only-the-deployed-proxy-boundary)
   - 1.13 [Restrict multipart routes and validate files before storage](#113-restrict-multipart-routes-and-validate-files-before-storage)
   - 1.14 [Validate secrets at startup and keep configuration server-side](#114-validate-secrets-at-startup-and-keep-configuration-server-side)
2. [Data Integrity and Queries](#2-data-integrity-and-queries) — **CRITICAL**
   - 2.1 [Bind SQL values and allowlist dynamic identifiers](#21-bind-sql-values-and-allowlist-dynamic-identifiers)
   - 2.2 [Bound list queries and paginate with a deterministic order](#22-bound-list-queries-and-paginate-with-a-deterministic-order)
   - 2.3 [Choose bulk writes with their hook semantics in mind](#23-choose-bulk-writes-with-their-hook-semantics-in-mind)
   - 2.4 [Protect read-modify-write operations against concurrency](#24-protect-read-modify-write-operations-against-concurrency)
   - 2.5 [Enforce durable invariants with database constraints](#25-enforce-durable-invariants-with-database-constraints)
   - 2.6 [Allowlist public fields instead of exposing model state](#26-allowlist-public-fields-instead-of-exposing-model-state)
   - 2.7 [Match factory overrides and persistence to the assertion](#27-match-factory-overrides-and-persistence-to-the-assertion)
   - 2.8 [Keep generated schema columns separate from model behavior](#28-keep-generated-schema-columns-separate-from-model-behavior)
   - 2.9 [Do not confuse after-save hooks with committed state](#29-do-not-confuse-after-save-hooks-with-committed-state)
   - 2.10 [Keep atomic writes in a managed transaction](#210-keep-atomic-writes-in-a-managed-transaction)
   - 2.11 [Run migration data operations through defer and its client](#211-run-migration-data-operations-through-defer-and-its-client)
   - 2.12 [Deploy schema changes with compatibility and rollback safety](#212-deploy-schema-changes-with-compatibility-and-rollback-safety)
   - 2.13 [Preload required relationships instead of querying in loops](#213-preload-required-relationships-instead-of-querying-in-loops)
   - 2.14 [Use groupLimit for top-N children per parent](#214-use-grouplimit-for-top-n-children-per-parent)
   - 2.15 [Resolve child records through an authorized parent](#215-resolve-child-records-through-an-authorized-parent)
   - 2.16 [Propagate the caller transaction through every data access](#216-propagate-the-caller-transaction-through-every-data-access)
3. [HTTP Boundaries and Lifecycle](#3-http-boundaries-and-lifecycle) — **HIGH**
   - 3.1 [Await downstream middleware and return when rejecting](#31-await-downstream-middleware-and-return-when-rejecting)
   - 3.2 [Order middleware by lifecycle dependencies](#32-order-middleware-by-lifecycle-dependencies)
   - 3.3 [Preserve exception semantics and disable production debug output](#33-preserve-exception-semantics-and-disable-production-debug-output)
   - 3.4 [Declare specific routes before overlapping dynamic routes](#34-declare-specific-routes-before-overlapping-dynamic-routes)
   - 3.5 [Validate route and query input before using it](#35-validate-route-and-query-input-before-using-it)
4. [Runtime Validation](#4-runtime-validation) — **HIGH**
   - 4.1 [Create reusable validators once and clone mutable schema fragments](#41-create-reusable-validators-once-and-clone-mutable-schema-fragments)
   - 4.2 [Express cross-field requirements in the validation schema](#42-express-cross-field-requirements-in-the-validation-schema)
   - 4.3 [Treat unique and exists rules as preflight checks, not guarantees](#43-treat-unique-and-exists-rules-as-preflight-checks-not-guarantees)
   - 4.4 [Give omission and null distinct PATCH semantics](#44-give-omission-and-null-distinct-patch-semantics)
   - 4.5 [Pass trusted request context as typed validator metadata](#45-pass-trusted-request-context-as-typed-validator-metadata)
   - 4.6 [Persist the validated output, never the original request object](#46-persist-the-validated-output-never-the-original-request-object)
5. [Framework Architecture](#5-framework-architecture) — **HIGH**
   - 5.1 [Pass durable identity to jobs instead of an ambient HTTP context](#51-pass-durable-identity-to-jobs-instead-of-an-ambient-http-context)
   - 5.2 [Import injectable classes as runtime values](#52-import-injectable-classes-as-runtime-values)
   - 5.3 [Inspect installed versions before choosing APIs](#53-inspect-installed-versions-before-choosing-apis)
   - 5.4 [Keep provider registration synchronous and lazy](#54-keep-provider-registration-synchronous-and-lazy)
   - 5.5 [Keep request context out of shared singletons](#55-keep-request-context-out-of-shared-singletons)
   - 5.6 [Regenerate rather than hand-maintain generated indexes](#56-regenerate-rather-than-hand-maintain-generated-indexes)
   - 5.7 [Separate framework registration from runtime side effects](#57-separate-framework-registration-from-runtime-side-effects)
6. [Production Reliability](#6-production-reliability) — **HIGH**
   - 6.1 [Deploy the standalone build with runtime dependencies and assets](#61-deploy-the-standalone-build-with-runtime-dependencies-and-assets)
   - 6.2 [Invalidate affected cache variants after a successful write](#62-invalidate-affected-cache-variants-after-a-successful-write)
   - 6.3 [Isolate cache keys by every visibility and query dimension](#63-isolate-cache-keys-by-every-visibility-and-query-dimension)
   - 6.4 [Synchronize process-local cache layers across replicas](#64-synchronize-process-local-cache-layers-across-replicas)
   - 6.5 [Refresh route-derived output before CI typechecking](#65-refresh-route-derived-output-before-ci-typechecking)
   - 6.6 [Separate cheap liveness from dependency readiness and private diagnostics](#66-separate-cheap-liveness-from-dependency-readiness-and-private-diagnostics)
   - 6.7 [Use a persistent queue and deploy its workers explicitly](#67-use-a-persistent-queue-and-deploy-its-workers-explicitly)
   - 6.8 [Make retries safe beyond the dispatch deduplication window](#68-make-retries-safe-beyond-the-dispatch-deduplication-window)
   - 6.9 [Dispatch serializable identifiers and reload authoritative job state](#69-dispatch-serializable-identifiers-and-reload-authoritative-job-state)
   - 6.10 [Dispatch only after commit and choose durability separately](#610-dispatch-only-after-commit-and-choose-durability-separately)
   - 6.11 [Treat lock TTL as a lease, not permanent exclusivity](#611-treat-lock-ttl-as-a-lease-not-permanent-exclusivity)
   - 6.12 [Acquire and release the same owned lock with a bounded wait](#612-acquire-and-release-the-same-owned-lock-with-a-bounded-wait)
   - 6.13 [Log structured request context and redact secrets at known paths](#613-log-structured-request-context-and-redact-secrets-at-known-paths)
   - 6.14 [Do not mistake sendLater for durable or completed delivery](#614-do-not-mistake-sendlater-for-durable-or-completed-delivery)
   - 6.15 [Reuse managed Redis connections and close resources you own](#615-reuse-managed-redis-connections-and-close-resources-you-own)
   - 6.16 [Authenticate subscription requests and authorize every private channel](#616-authenticate-subscription-requests-and-authorize-every-private-channel)
7. [Testing and Isolation](#7-testing-and-isolation) — **HIGH**
   - 7.1 [Choose rollback or truncation to match actual database execution](#71-choose-rollback-or-truncation-to-match-actual-database-execution)
   - 7.2 [Register fake cleanup before any assertion or side effect can throw](#72-register-fake-cleanup-before-any-assertion-or-side-effect-can-throw)
   - 7.3 [Test anonymous, non-owner and cross-tenant requests through HTTP](#73-test-anonymous-non-owner-and-cross-tenant-requests-through-http)
   - 7.4 [Use dedicated test storage before destructive cleanup](#74-use-dedicated-test-storage-before-destructive-cleanup)
8. [Rendering and Client Contracts](#8-rendering-and-client-contracts) — **MEDIUM-HIGH**
   - 8.1 [Keep untrusted Edge output escaped and preserve context boundaries](#81-keep-untrusted-edge-output-escaped-and-preserve-context-boundaries)
   - 8.2 [Treat all Inertia props and shared data as browser-visible output](#82-treat-all-inertia-props-and-shared-data-as-browser-visible-output)
   - 8.3 [Keep SSR request data local and deploy the server entrypoint](#83-keep-ssr-request-data-local-and-deploy-the-server-entrypoint)
   - 8.4 [Use Tuyau for compile-time contracts, not runtime trust](#84-use-tuyau-for-compile-time-contracts-not-runtime-trust)

---

## 1. Security and Trust Boundaries

**Impact: CRITICAL**

Protect authentication, authorization, tenant boundaries, credentials, sessions, uploads, and browser-facing security controls before optimizing implementation details.

### 1.1 Use AuthFinder credential verification and one hashing owner

**Impact: CRITICAL** — Naive lookup-then-verify returns earlier for nonexistent users and permits account enumeration through timing

Naive lookup-then-verify returns earlier for nonexistent users and permits account enumeration through timing. For unknown users, AuthFinder calls `hashFactory().make(password)` to perform expensive hashing work that mitigates timing differences; for existing users, it verifies the supplied password against the stored hash. It also hashes changed passwords on model saves. Avoid duplicating that hook or bypassing it with bulk updates.

#### Incorrect

```ts
const user = await User.findBy('email', email)
if (!user) return response.unauthorized('Unknown email')
if (!(await hash.verify(user.password, password))) {
  return response.unauthorized('Wrong password')
}
```

#### Correct

```ts
// With User configured with the AuthFinder mixin:
const { email, password } = await request.validateUsing(loginValidator)
const user = await User.verifyCredentials(email, password)
await auth.use('web').login(user)

// A validated password change uses the model hook once:
await user.validatePassword(currentPassword)
user.password = newPassword
await user.save()
```

#### Caveats and versions

v7. User composes its actual generated schema export with withAuthFinder(hash), or the documented configured hasher callback. The primary Lucid schema-generation guide names the users-table export UsersSchema; some framework overview/auth examples use UserSchema. Inspect database/schema.ts rather than assuming either spelling. Controller excerpt assumes imported validators and validated currentPassword/newPassword. The current credential guide documents user.validatePassword(currentPassword) as throwing a validation error on mismatch. Model hooks do not run on raw query-builder updates. Use the hash service for non-AuthFinder storage, not reversible encryption. Keep generic credential errors and pair with rate limits.

#### References

- https://docs.adonisjs.com/guides/auth/verifying-user-credentials.md
- https://docs.adonisjs.com/guides/security/hashing.md
- https://lucid.adonisjs.com/docs/schema-generation
- https://github.com/adonisjs/auth/blob/10.x/src/mixins/lucid.ts

---

### 1.2 Authorize the loaded resource before mutating it

**Impact: CRITICAL** — Authentication identifies a user; it does not permit editing arbitrary IDs

Authentication identifies a user; it does not permit editing arbitrary IDs. Centralize resource rules in a Bouncer ability or policy and await authorization before database mutations or external side effects. Hiding UI controls is not enforcement.

#### Incorrect

```ts
const post = await Post.findOrFail(params.id)
await post.merge(payload).save()
await bouncer.with(PostPolicy).authorize('edit', post)
```

#### Correct

```ts
// Authenticated controller action; payload is allowlisted and validated.
const post = await Post.findOrFail(params.id)
await bouncer.with(PostPolicy).authorize('edit', post)
await post.merge(payload).save()
return { id: post.id }
```

#### Caveats and versions

v7; import Post and PostPolicy from their project aliases. The policy must actually check ownership/permissions, e.g. user.id === post.userId; the resource ID itself proves nothing. await allows/denies checks too. Keep Bouncer initialization middleware. v7 policy indexing uses indexPolicies and #generated/policies, not a hand-maintained policy registry.

#### References

- https://docs.adonisjs.com/guides/auth/authorization.md
- https://docs.adonisjs.com/v6-to-v7.md

---

### 1.3 Allowlist browser origins explicitly in production

**Impact: HIGH** — The default origin reflection is convenient locally but should not be deployed for private cookie-authenticated browser APIs

The default origin reflection is convenient locally but should not be deployed for private cookie-authenticated browser APIs. Use exact trusted origins and only needed methods/headers. CORS controls browser access, not server-side authentication or authorization.

#### Incorrect

```ts
import { defineConfig } from '@adonisjs/cors'
export default defineConfig({ origin: true, credentials: true })
```

#### Correct

```ts
import { defineConfig } from '@adonisjs/cors'
export default defineConfig({
  origin: ['https://app.example.com'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  headers: ['Content-Type', 'Accept', 'Authorization', 'X-CSRF-TOKEN'],
  credentials: true,
})
```

#### Caveats and versions

v7; customize origins and headers to the real frontend. Same-origin applications can disallow cross-origin access entirely. A deliberately public noncredentialed API may allow *. Do not use startsWith hostname checks or assume wildcard plus credentials is restrictive: this package can reflect the origin in that combination. Install CORS in the server stack for preflights.

#### References

- https://docs.adonisjs.com/guides/security/cors.md

---

### 1.4 Keep CSRF protection on cookie-authenticated mutations

**Impact: CRITICAL** — Browsers attach session cookies automatically; JSON bodies or an /api prefix do not make those mutations immune to CSRF

Browsers attach session cookies automatically; JSON bodies or an /api prefix do not make those mutations immune to CSRF. Keep Shield enabled for unsafe methods and submit its token. Exempt only precisely identified external endpoints with their own verified authentication.

#### Incorrect

```ts
// config/shield.ts
export default defineConfig({
  csrf: { enabled: false },
})
```

#### Correct

```ts
import { defineConfig } from '@adonisjs/shield'
export default defineConfig({
  csrf: {
    enabled: true,
    exceptRoutes: ['/webhooks/payment-provider'],
    enableXsrfCookie: false,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },
})
```

#### Caveats and versions

v7 partial Shield config: preserve other guards when merging. Register sessions before Shield; render csrfField() in Edge forms or use the documented token/header flow for JavaScript. The exempt webhook needs verified provider signatures before side effects. Bearer-only endpoints can have a different CSRF threat model, but mixed session/bearer endpoints still need cookie protection.

#### References

- https://docs.adonisjs.com/guides/security/securing-ssr-applications.md
- https://docs.adonisjs.com/guides/auth/session-guard.md

---

### 1.5 Choose and enforce the intended auth guard

**Impact: CRITICAL** — Use the configured guard matching the transport

Use the configured guard matching the transport. Session authentication is appropriate for browser apps on the same top-level domain; opaque bearer tokens fit non-cookie clients. Multiple accepted guards mean OR, not stronger combined authentication. Login and logout through the guard, not a hand-written session flag.

#### Incorrect

```ts
router.get('/api/profile', ({ session }) => {
  return { id: session.get('userId') }
})
```

#### Correct

```ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
router.get('/api/profile', async ({ auth }) => {
  const user = auth.getUserOrFail()
  return { id: user.id }
}).use(middleware.auth({ guards: ['api'] }))
```

#### Caveats and versions

v7; api must be a configured tokens guard in config/auth.ts. For a web/session endpoint use guards: ['web'], await auth.use('web').login(user) after verified credentials, and await auth.use('web').logout() on logout. Session middleware must precede auth initialization. Cookie-authenticated mutations need CSRF protection.

#### References

- https://docs.adonisjs.com/guides/auth/session-guard.md
- https://docs.adonisjs.com/guides/auth/access-tokens-guard.md

---

### 1.6 Treat access tokens as opaque capabilities with bounded scope

**Impact: CRITICAL** — The official access-tokens guard uses database-backed opaque tokens, not JWT claims

The official access-tokens guard uses database-backed opaque tokens, not JWT claims. Authenticate through the guard, restrict abilities and lifetime, and check token abilities in addition to resource authorization. Only release the plaintext token at issuance; never log or persist it as application plaintext.

#### Incorrect

```ts
const token = request.header('authorization')!.split(' ')[1]
const claims = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString())
return { userId: claims.sub }
```

#### Correct

```ts
// After validated credentials (User has an accessTokens provider):
const user = await User.verifyCredentials(email, password)
const token = await User.accessTokens.create(user, ['projects:read'], {
  expiresIn: '7 days',
  name: 'Read-only client',
})
return { type: 'bearer', value: token.value!.release() }
```

#### Caveats and versions

v7 official opaque guard only; a custom JWT guard has a different contract. These scope/lifetime values are application policy, not mandatory official defaults (tokens do not expire by default). Protect consumers with the api guard, then check user.currentAccessToken.allows('projects:read') and resource permissions. Revoke through the owning user's provider; never grant arbitrary clients wildcard abilities.

#### References

- https://docs.adonisjs.com/guides/auth/access-tokens-guard.md

---

### 1.7 Authorize stored objects and keep paths server-controlled

**Impact: CRITICAL** — Do not let a request choose an arbitrary filesystem path or object key for downloading, deleting, overwriting, or signing

Generate upload keys on the server and persist them on an authorized record. Never let a request choose arbitrary paths or keys for downloading, signing, deleting, or overwriting. Resolve the stored key through ownership checks before issuing a short-lived signed URL, and configure genuinely private storage.

#### Incorrect

```ts
const url = await drive.use().getSignedUrl(request.input('key'))
return { url }
```

#### Correct

```ts
import drive from '@adonisjs/drive/services/main'
import Invoice from '#models/invoice'

// Authenticated action: auth/params come from HttpContext.
// Assumes a private default disk and Invoice user_id/fileKey columns.
const user = auth.getUserOrFail()
const ownedInvoice = await Invoice.query()
  .where('id', params.id)
  .where('user_id', user.id)
  .firstOrFail()
return {
  url: await drive.use().getSignedUrl(ownedInvoice.fileKey, { expiresIn: '5 mins' }),
}
```

#### Caveats and versions

Use the installed v7 Drive integration and verify its independently versioned FlyDrive/driver APIs. Objects must not also be reachable through a public bucket or static route: signing cannot repair public visibility. Signed URLs are bearer capabilities until expiry; do not log them.

Never use `clientName` as a path or expose `tmpPath`. For direct uploads, issue server-generated scoped keys and verify ownership, completion, and uploaded content server-side before accepting a completion claim; signing is not validation. Multipart validation belongs to Adonis HTTP uploads, not Drive. Store durable files in cloud storage or a persistent location outside replaceable build directories.

#### References

- https://docs.adonisjs.com/guides/digging-deeper/drive.md
- https://docs.adonisjs.com/guides/basics/file-uploads.md
- https://docs.adonisjs.com/guides/auth/authorization.md
- https://flydrive.dev/docs/introduction
- https://docs.adonisjs.com/deployment.md

---

### 1.8 Manage device sessions without exposing session capabilities

**Impact: CRITICAL** — Session IDs are bearer capabilities, and incomplete revocation can leave other devices authenticated

An active-session endpoint must derive the user from authenticated context and return an allowlisted device representation, not raw session records or IDs. Session tagging is explicit: a user ID is not a session ID, and authentication does not automatically establish a queryable user-to-session index.

#### Incorrect

```ts
// Trusts another user's submitted ID and exposes bearer session IDs/data.
return sessionCollection.tagged(request.input('userId'))
```

#### Correct

```ts
import { inject } from '@adonisjs/core'
import { SessionCollection } from '@adonisjs/session'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ActiveSessionsController {
  constructor(protected sessionCollection: SessionCollection) {}

  // Protect this route with the configured session guard middleware.
  async index({ auth, session }: HttpContext) {
    const user = auth.getUserOrFail()
    const sessions = await this.sessionCollection.tagged(String(user.id))

    return sessions.map((entry) => {
      const loggedInAt = entry.data.device?.loggedInAt
      return {
        loggedInAt: typeof loggedInAt === 'string' ? loggedInAt : undefined,
        isCurrent: entry.id === session.sessionId,
      }
    })
  }
}
```

#### Applicability and caveats

**Applicability**

- Use AdonisJS 7 with `@adonisjs/session >=8.0` and a tagging-capable store: `memory`, `redis`, or `database`. Multi-process production requires an appropriate shared store, not process-local memory.
- Do not hide unsupported-store errors behind an empty list. Configure a suitable store or explain that the feature is unsupported.
- The example assumes the application records `device.loggedInAt` at login in its documented timestamp format. Check scalar types even for server-side metadata: legacy or malformed values must not turn a timestamp into an arbitrary nested object. Never return whole `device` or session objects, or bearer session IDs.

**Tag lifecycle**

- Call `session.tag(String(user.id))` **after** `auth.use('web').login(user)`, which regenerates the session ID. Query with the same string conversion.
- Untag on logout: logout alone preserves the session ID and other data. Before changing identity, untag the previous user; Redis retagging can retain the old user's index membership.
- To list sessions recreated by remember-me authentication, use the documented authentication-succeeded listener.

**Owned revocation**

- For “log out other devices,” enumerate only the authenticated user's tagged sessions and destroy selected owned sessions. A raw client-supplied session ID is not proof of ownership. Preserve the current session only when the product contract requires it.
- Revoke configured remember-me tokens when they must not recreate access; session invalidation alone is insufficient. Access-token guards use a separate revocation mechanism.
- Treat device headers as untrusted display data, never authorization evidence. Session metadata may contain personal information.

**Persistence and concurrency limits**

- Since `@adonisjs/session` 8.2, a newly tagged session and its tag persist with the end-of-request session write. Earlier versions wrote the tag immediately; the database store could create a row without session data.
- Redis Cluster cannot transact across keys in different slots. During separate data/index writes, concurrent `tagged()` cleanup can remove an ID, leaving an authenticated session absent from its user's tag set until tagged again.
- The database store writes `user_id` and session data in one query. That atomic row write does not make enumeration exclude concurrent logins or remember-me recreation.
- Enumeration alone is not universally race-free account-wide revocation. A stronger global revocation promise requires establishing the installed session version, store guarantees, and concurrent-authentication policy first. Do not invent a fallback or claim enumeration alone satisfies that policy.

#### Official sources

- https://docs.adonisjs.com/guides/basics/session-tagging.md
- https://docs.adonisjs.com/guides/auth/session-guard.md

---

### 1.9 Enforce rate limits in a shared backend with trustworthy keys

**Impact: HIGH** — Per-process memory limits multiply with replicas and disappear on restarts

Per-process memory limits multiply with replicas and disappear on restarts. Use a shared Redis/database store for deployment-wide quotas and key authenticated quotas by the authenticated identity. Keep unauthenticated/login limits as well; do not key by a user-supplied ID header.

#### Incorrect

```ts
export const expensive = limiter.define('expensive', ({ request }) =>
  limiter.allowRequests(10).every('1 minute')
    .usingKey(request.header('x-user-id')!)
    .store('memory')
)
```

#### Correct

```ts
import limiter from '@adonisjs/limiter/services/main'
export const expensive = limiter.define('expensive', ({ auth }) =>
  limiter.allowRequests(10).every('1 minute')
    .usingKey(`user:${auth.getUserOrFail().id}`)
    .store('redis')
)
```

#### Caveats and versions

v7; redis must be configured in config/limiter.ts. Apply this middleware after the auth middleware, e.g. route.use(middleware.auth()).use(expensive). Public/login throttles need pre-auth keys, typically IP with correctly configured trusted proxies; account-based limits need an explicit lockout-abuse tradeoff. These quota values are examples, not official defaults. Preserve 429/Retry-After behavior and choose a backend-outage policy deliberately.

#### References

- https://docs.adonisjs.com/guides/security/rate-limiting.md
- https://docs.adonisjs.com/guides/basics/request.md

---

### 1.10 Configure browser security headers without discarding existing guards

**Impact: HIGH** — Shield guards omitted from configuration are disabled

Shield guards omitted from configuration are disabled. Preserve protections when adding one option and tailor CSP to the actual assets rather than disabling it to fix one blocked script. Enable HSTS only after HTTPS readiness; protect against framing and MIME sniffing too.

#### Incorrect

```ts
// Replacing the entire Shield config to fix an asset problem:
export default defineConfig({ csp: { enabled: false } })
```

#### Correct

```ts
import { defineConfig } from '@adonisjs/shield'
export default defineConfig({
  csp: {
    enabled: true,
    directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", '@nonce'] },
    reportOnly: false,
  },
  hsts: { enabled: true, maxAge: '180 days', includeSubDomains: false },
  xFrame: { enabled: true, action: 'DENY' },
  contentTypeSniffing: { enabled: true },
})
```

#### Caveats and versions

v7 config excerpt: retain the existing csrf block as well. CSP sources/nonces must match templates and the stack, including required Vite/Inertia assets. DENY is inappropriate for intentional embedding; use a reviewed policy. HSTS persists in browsers; only include subdomains when they all support HTTPS. Report-only CSP does not enforce protection.

#### References

- https://docs.adonisjs.com/guides/security/securing-ssr-applications.md

---

### 1.11 Derive tenant boundaries from authenticated membership

**Impact: CRITICAL** — Tenant IDs in headers, params, or payloads are selectors, not authority

Tenant IDs in headers, params, or payloads are selectors, not authority. Scope reads, writes, lists, and nested resources to an authenticated membership or equivalent trusted tenant context. A Bouncer check on one action does not automatically scope every ORM query.

#### Incorrect

```ts
const post = await Post.findOrFail(params.id)
post.tenantId = request.input('tenantId')
await post.save()
```

#### Correct

```ts
// This application stores the active, authorized tenant on User.
const user = auth.getUserOrFail()
const post = await Post.query()
  .where('tenant_id', user.tenantId)
  .where('id', params.id)
  .firstOrFail()
await bouncer.with(PostPolicy).authorize('edit', post)
await post.merge(payload).save()
```

#### Caveats and versions

v7 application-level security pattern derived from resource authorization, not an automatic Adonis tenancy feature. user.tenantId must represent verified membership, not a copied client input. Multi-membership apps must explicitly resolve and verify the selected membership. payload must not include tenantId/ownerId. Also scope nested relation IDs and background jobs.

#### References

- https://docs.adonisjs.com/guides/auth/authorization.md
- https://docs.adonisjs.com/guides/basics/http-context.md

---

### 1.12 Trust only the deployed proxy boundary

**Impact: CRITICAL** — Client IP and protocol detection affect throttling, secure-cookie behavior, and URL construction

Client IP and protocol detection affect throttling, secure-cookie behavior, and URL construction. Trust forwarded headers only from the actual reverse proxies, and prevent direct public access that bypasses that boundary. Reading a CDN-specific header unconditionally lets direct clients spoof their address.

#### Incorrect

```ts
export const http = defineConfig({
  trustProxy: true,
  getIp(request) { return request.header('cf-connecting-ip')! },
})
```

#### Correct

```ts
import { defineConfig } from '@adonisjs/core/http'
import proxyAddr from 'proxy-addr'
export const http = defineConfig({
  trustProxy: proxyAddr.compile(['127.0.0.1', '::1']),
})
```

#### Caveats and versions

v7 example assumes the only trusted reverse proxy connects over loopback. Use actual deployed addresses/CIDRs, not this example blindly. Restrict ingress and have proxies overwrite untrusted forwarded headers. A custom getIp hook must verify the peer boundary before trusting a CDN header and otherwise fall back to originalFn(). Do not derive canonical external URLs or redirect targets from arbitrary Host input.

#### References

- https://docs.adonisjs.com/guides/basics/request.md
- https://docs.adonisjs.com/guides/basics/response.md

---

### 1.13 Restrict multipart routes and validate files before storage

**Impact: CRITICAL** — Multipart parsing can consume disk before the controller authenticates a user

Multipart parsing can consume disk before the controller authenticates a user. Only auto-process routes that accept uploads, bound request sizes, and validate size/type before moving files. A filename extension or a client-supplied Content-Type alone is not a sufficient file policy.

#### Incorrect

```ts
const avatar = request.file('avatar')!
await avatar.moveToDisk(avatar.clientName)
```

#### Correct

Prerequisite: register a `privateUploads` disk in `config/drive.ts` (and include it in the project's inferred `DriveDisks` types). For local storage, add this entry to the existing `services` object, using `app` from `@adonisjs/core/services/app` and `services` from `@adonisjs/drive`:

```ts
privateUploads: services.fs({
  location: app.makePath('storage/private-uploads'),
  visibility: 'private',
  serveFiles: false,
}),
```

Keep this directory outside public static directories and do not expose it through a web-server alias. With `serveFiles: false`, serve downloads only through an authenticated, authorized application action. If enabling Drive's local file serving instead, keep the disk private and use its signed URLs; a signed URL grants access to whoever possesses it.


```ts
// app/validators/profile.ts
import vine from '@vinejs/vine'
export const uploadAvatarValidator = vine.create({
  avatar: vine.file({ size: '2mb', extnames: ['jpg', 'png'] }),
})

// Authenticated action with the validator imported:
const { avatar } = await request.validateUsing(uploadAvatarValidator)
const key = `avatars/${auth.getUserOrFail().id}/${crypto.randomUUID()}.${avatar.extname}`
await avatar.moveToDisk(key, 'privateUploads')
return { key }
```

#### Caveats and versions

v7 with Drive installed. In config/bodyparser.ts restrict multipart.autoProcess to intended route patterns, such as ['/profile/avatar'], and configure parser limits for the deployment. File validation uses magic-number detection where supported; it is not antivirus scanning or proof that active content is safe to render inline. Bound file counts/aggregate upload resources too. Use import { randomUUID } from node:crypto instead of crypto.randomUUID if that is the project convention.

FlyDrive's filesystem driver ignores per-file visibility options and reports the disk-configured visibility. Passing `{ visibility: 'private' }` when uploading to a public filesystem disk does not make that file private. Local confidentiality depends on the disk configuration and every path that can serve its files, not a per-upload flag.

#### References

- https://docs.adonisjs.com/guides/basics/file-uploads.md
- https://docs.adonisjs.com/guides/basics/body-parser.md
- https://docs.adonisjs.com/guides/digging-deeper/drive.md
- https://flydrive.dev/docs/services/fs

---

### 1.14 Validate secrets at startup and keep configuration server-side

**Impact: CRITICAL** — Required secrets should fail startup when absent instead of silently using an insecure fallback

Required secrets should fail startup when absent instead of silently using an insecure fallback. Define validated environment fields and consume them in configuration. Keep APP_KEY secret, stable within an environment, and distinct across environments; never return the full configuration tree or bundle secrets into frontend code.

#### Incorrect

```ts
const paymentKey = process.env.PAYMENT_KEY || 'development-secret'
router.get('/debug/config', () => process.env)
```

#### Correct

```ts
// start/env.ts — keep the application's other required fields.
import { Env } from '@adonisjs/core/env'
export default await Env.create(new URL('../', import.meta.url), {
  PAYMENT_KEY: Env.schema.string(),
})

// config/payments.ts (PAYMENT_KEY must be in the actual Env.create schema):
import env from '#start/env'
export default { key: env.get('PAYMENT_KEY') }
```

#### Caveats and versions

v7. Merge PAYMENT_KEY into the existing Env.create schema; do not replace the other startup fields. Prefer Env.schema.secret() where the consuming API supports the Secret wrapper, release only at the required boundary. Do not commit real .env files or add secrets to generated client manifests. Rotation affects sessions/encrypted data; plan it rather than generating a new APP_KEY at every boot.

#### References

- https://docs.adonisjs.com/configuration.md
- https://docs.adonisjs.com/guides/digging-deeper/logger.md

---

## 2. Data Integrity and Queries

**Impact: CRITICAL**

Preserve durable invariants, transaction boundaries, ownership, safe schema evolution, and explicit serialization while keeping queries bounded and relationship loading deliberate.

### 2.1 Bind SQL values and allowlist dynamic identifiers

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x, VineJS 4; confirm installed package APIs.

Use query-builder value arguments or raw bindings for user-controlled values. Column identifiers and sort directions are a different concern: identifier quoting prevents SQL syntax injection but does not decide which columns a client may access. Allowlist dynamic identifiers and directions before query construction.

#### Incorrect

```ts
await db.rawQuery(`select * from users where email = '${email}'`)
await db.from('users').orderByRaw(`${request.input('sort')} ${request.input('direction')}`)
```

#### Correct

```ts
import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

// Current VineJS 4 / AdonisJS v7 validator syntax.
const sortValidator = vine.create({
  sort: vine.enum(['newest', 'name']).optional(),
  direction: vine.enum(['asc', 'desc']).optional(),
})
const input = await request.validateUsing(sortValidator)
const columns = { newest: 'created_at', name: 'full_name' } as const

const users = await db.from('users')
  .select('id', 'full_name')
  .where('email', email)
  .orderBy(columns[input.sort ?? 'newest'], input.direction ?? 'desc')
  .orderBy('id', 'desc')
  .limit(20)

await db.rawQuery('select id from users where email = ?', [email])
```

#### Caveats

Define the reusable validator at module scope in production code. Raw SQL uses `?` for values and `??` for identifiers (or named equivalents); neither is a replacement for an authorization allowlist. Never bind a whole SQL expression or direction as a value and expect it to become executable SQL.

#### Official sources

- https://lucid.adonisjs.com/docs/raw-query-builder
- https://vinejs.dev/docs/types/enum

---

### 2.2 Bound list queries and paginate with a deterministic order

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x, VineJS 4; confirm installed package APIs.

Validate page and page size, impose an application maximum, select only the columns needed, and order by a unique tie-breaker. Unbounded `all()` calls and arbitrary page sizes amplify database, hydration, and response costs. Sorting only by a non-unique timestamp does not totally order the results.

#### Incorrect

```ts
return Post.query().paginate(request.input('page'), request.input('perPage'))
```

#### Correct

```ts
import vine from '@vinejs/vine'
import Post from '#models/post'

// Module-scope validator: current VineJS 4 / AdonisJS v7 syntax.
const listPostsValidator = vine.create({
  page: vine.number().withoutDecimals().min(1).max(1000).optional(),
  perPage: vine.number().withoutDecimals().min(1).max(100).optional(),
})

const input = await request.validateUsing(listPostsValidator)
return Post.query()
  .select('id', 'title', 'created_at')
  .orderBy('created_at', 'desc')
  .orderBy('id', 'desc')
  .paginate(input.page ?? 1, input.perPage ?? 20)
```

#### Caveats

The page cap is an application policy, not an official universal value. Include primary/foreign keys required by selected preloads; do not save partially-selected models as though all attributes were loaded. Offset pagination runs a COUNT and still shifts under concurrent inserts/deletes: use an explicitly designed cursor/keyset contract for deep or continuously changing feeds, rather than claiming stable sorting creates a snapshot.

#### Official sources

- https://lucid.adonisjs.com/docs/pagination
- https://vinejs.dev/docs/types/number

---

### 2.3 Choose bulk writes with their hook semantics in mind

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Query-builder update/delete and table inserts do not execute the per-instance persistence pipeline. A bulk password update can store plaintext if hashing lives in `beforeSave`; a bulk delete can bypass model cleanup. Choose SQL bulk operations only when required invariants are handled explicitly or by the database.

#### Incorrect

```ts
// The User beforeSave hashing hook will not run here.
await User.query().where('id', userId).update({ password: payload.password })
```

#### Correct

```ts
import User from '#models/user'

const user = await User.findOrFail(userId)
user.password = payload.password
await user.save() // Runs this model's configured hashing hook.
```

#### Caveats

Use the existing AuthFinder hashing behavior when configured; do not add a second hashing hook. `Model.createMany` inserts instances individually in a managed transaction and runs hooks; it is not equivalent to a single bulk INSERT. Query-builder updates also bypass automatic model timestamps, so set them explicitly where needed. For large jobs that require hooks, process bounded batches rather than loading the entire table.

#### Official sources

- https://lucid.adonisjs.com/docs/crud-operations
- https://lucid.adonisjs.com/docs/model-hooks

---

### 2.4 Protect read-modify-write operations against concurrency

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

A transaction provides atomic commit, but an ordinary SELECT followed by UPDATE can still lose concurrent changes. Lock the row inside the transaction before checking an invariant, or use an atomic conditional update when that expresses the invariant more simply.

#### Incorrect

```ts
const inventory = await Inventory.findOrFail(productId)
if (inventory.stock < quantity) throw new Error('Insufficient stock')
inventory.stock -= quantity
await inventory.save()
```

#### Correct

```ts
import db from '@adonisjs/lucid/services/db'
import Inventory from '#models/inventory'

await db.transaction(async (trx) => {
  const inventory = await Inventory.query({ client: trx })
    .where('id', productId)
    .forUpdate()
    .firstOrFail()

  if (inventory.stock < quantity) throw new Error('Insufficient stock')
  inventory.stock -= quantity
  await inventory.save()
})
```

#### Caveats

Validate `quantity` as a positive bounded integer before this operation. Row-lock support and isolation semantics vary by dialect; SQLite does not provide the same row-lock behavior. Keep the locked section short and acquire multiple locks in a consistent order. A lock on a missing row does not establish uniqueness: retain database constraints.

#### Official sources

- https://lucid.adonisjs.com/docs/introduction
- https://lucid.adonisjs.com/docs/transactions

---

### 2.5 Enforce durable invariants with database constraints

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Put uniqueness, required values, and referential integrity in migrations as well as request validation. Two concurrent requests can both pass a SELECT-based uniqueness check. Database constraints arbitrate all writers, including jobs, commands, and direct SQL.

#### Incorrect

```ts
this.schema.createTable('memberships', (table) => {
  table.increments('id')
  table.integer('user_id')
  table.integer('team_id')
})
// An exists/unique validator is the only protection.
```

#### Correct

```ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('memberships', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id')
      table.integer('team_id').unsigned().notNullable().references('teams.id')
      table.unique(['team_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable('memberships')
  }
}
```

#### Caveats

Choose cascade/restrict behavior from the domain, not a blanket default. Backfill or deduplicate existing data before adding constraints. Tenant ownership may require a composite foreign key, not just a globally valid ID. Translate only recognized constraint violations into the project's conflict/validation response; do not hide unrelated database errors.

#### Official sources

- https://lucid.adonisjs.com/docs/table-builder
- https://lucid.adonisjs.com/docs/relationships
- https://lucid.adonisjs.com/docs/validation

---

### 2.6 Allowlist public fields instead of exposing model state

**Impact: CRITICAL**

**API baseline:** AdonisJS 7 core transformers; confirm installed package APIs and model types. No Lucid schema generation required.

Return an allowlisted representation so new model columns cannot silently expose credentials or internal flags. Reuse the application's existing serializers/transformers rather than creating a parallel convention. Authentication alone is not permission to expose private fields.

#### Incorrect

```ts
return { ...user.toAttributes() }
// Raw extraction/spreading bypasses the intended public representation.
```

#### Correct

```ts
// app/transformers/user_transformer.ts
import { BaseTransformer } from '@adonisjs/core/transformers'
import type User from '#models/user'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, ['id', 'fullName'])
  }
}

// Assumes a User model with id/fullName and configured v7 transformers.
```

```ts
// app/controllers/profile_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
    await auth.authenticate()
    const user = auth.getUserOrFail()
    return serialize(UserTransformer.transform(user))
  }
}
```

#### Caveats

A small endpoint can instead return a plain projection such as `{ id: user.id, fullName: user.fullName }`; transformers are not mandatory. Keep public and private variants explicitly allowlisted, never selected by a client-supplied field list. Review nested relations, `$extras`, and pivot values separately; transformers read already-loaded relations, so preload deliberately. Lucid's `serializeAs: null` hides a column during model serialization, but raw `$attributes` or `toAttributes()` extraction bypasses that protection. Spreading a model also exposes ORM state rather than a deliberate DTO.

#### Official sources

- https://docs.adonisjs.com/guides/frontend/transformers.md
- https://lucid.adonisjs.com/docs/serializing-models
- https://docs.adonisjs.com/guides/auth/session-guard.md
- https://docs.adonisjs.com/guides/basics/response.md
- https://docs.adonisjs.com/guides/auth/verifying-user-credentials.md

---

### 2.7 Match factory overrides and persistence to the assertion

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Factory defaults generate valid data; overrides make the behavior under test deterministic. With the standard Lucid factory implementation, defaults are instantiated, `merge` overrides are applied, states run in application order, and `tap` runs afterward. Calling `merge` later in the fluent chain does not make it run after a state. Lifecycle hooks can still modify the instance.

`Factory.define(...).build()` finalizes a reusable factory; it does not create a model or write a row. Use `make()` for an unsaved model, `makeStubbed()` for an unsaved model with a simulated primary key, and `create()` for database assertions.

**Prerequisites:** These examples assume a Lucid `Post` model with `title`, `content`, and `status` columns and no other required attributes. Database examples require a migrated, disposable test database. Use per-test rollback only when all participating queries share its transaction; committed work in separate processes needs truncation/reset after workers stop, with separate databases or schemas for parallel runners. The explicit transaction below only illustrates fixture/query transaction ownership.

#### Incorrect

```ts
// Alternative Japa test body, using the PostFactory defined below.
test('stores a draft', async ({ assert }) => {
  const post = await PostFactory
    .apply('published')
    .merge({ status: 'DRAFT' })
    .makeStubbed()

  assert.equal(post.status, 'DRAFT') // Fails: the state runs after merge.
  assert.isTrue(post.$isPersisted) // Fails: a stubbed id does not prove an INSERT.
})
```

#### Correct

```ts
// database/factories/post_factory.ts
import Post from '#models/post'
import { Factory } from '@adonisjs/lucid/factories'

export const PostFactory = Factory.define(Post, ({ faker }) => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  status: 'DRAFT',
}))
  .state('published', (post) => {
    post.status = 'PUBLISHED'
  })
  .build()
```

```ts
// Japa test module; aliases resolve to the app's model and factory above.
import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import Post from '#models/post'
import { PostFactory } from '#database/factories/post_factory'

test('persists a published post with an explicit title', async ({ assert }) => {
  const draft = await PostFactory.merge({ title: 'Unsaved draft' }).make()
  assert.equal(draft.status, 'DRAFT')
  assert.isFalse(draft.$isPersisted)

  const trx = await db.transaction()
  try {
    const post = await PostFactory
      .client(trx)
      .apply('published')
      .merge({ title: 'Release notes' })
      .create()

    const stored = await Post.query({ client: trx }).where('id', post.id).firstOrFail()
    assert.equal(stored.title, 'Release notes')
    assert.equal(stored.status, 'PUBLISHED')
    assert.isTrue(stored.$isPersisted)
  } finally {
    await trx.rollback()
  }
})
```

#### Caveats

Use a state for a reusable variation and `merge` for fields that state does not overwrite. If a deliberate final one-off override is needed, `tap` runs after states; do not assume fluent call order changes the compilation order. Custom factory `newUp`/`merge` implementations or hooks can change the result, so inspect existing factory definitions.

Pass the transaction client to both fixture creation and assertion queries; an unrelated connection cannot be assumed to see uncommitted fixtures. Factory creation uses a transaction (a savepoint when supplied an existing transaction client), so queries in factory hooks must use `ctx.$trx` to participate in those writes. Neither a generated id nor an assertion on the returned in-memory attributes proves database persistence, constraints, or commit behavior.

#### Official sources

- https://lucid.adonisjs.com/docs/model-factories
- https://lucid.adonisjs.com/docs/transactions
- https://github.com/adonisjs/lucid/blob/22.x/src/factories/factory_builder.ts
- https://docs.adonisjs.com/guides/testing/resetting-state-between-tests.md

---

### 2.8 Keep generated schema columns separate from model behavior

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x with schema generation; confirm installed Lucid APIs.

In the current Lucid workflow, migrations define the database, generated schema classes project its columns, and application models own relationships and behavior. Do not hand-edit `database/schema.ts`: regeneration overwrites it. Apply lasting changes in migrations, schema rules, or intentional model-level overrides.

#### Incorrect

```ts
// Hand-editing generated database/schema.ts:
export class UsersSchema extends BaseModel {
  @column()
  declare nickname: string
}
// This neither creates the database column nor survives regeneration.
```

#### Correct

```ts
// database/migrations/<timestamp>_add_nickname_to_users.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('nickname').nullable()
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('nickname')
    })
  }
}

// app/models/user.ts (separate file, after schema generation)
import { UsersSchema } from '#database/schema'
export default class User extends UsersSchema {}
```

#### Caveats

Regenerate from the intended database after applying migrations and commit the generated schema alongside the migration. Generated class names follow table names, for example users → UsersSchema. Use schema rules for persistent type customization, and model overrides for intentional per-model behavior; do not duplicate inherited columns by default. Generated TypeScript types are not runtime validation or database constraints. This workflow requires the current Lucid schema-generation feature, not merely a v7 core dependency.

#### Official sources

- https://lucid.adonisjs.com/docs/schema-generation
- https://lucid.adonisjs.com/docs/schema-classes

---

### 2.9 Do not confuse after-save hooks with committed state

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

`afterCreate` and `afterSave` run after the SQL statement, not necessarily after the outer transaction commits. Sending email, publishing an event, or updating a search index there can announce data that later rolls back. Keep database work on the transaction client and perform nontransactional effects only after the transaction resolves.

#### Incorrect

```ts
// Inside an afterCreate hook: outer transaction can still roll back.
@afterCreate()
static async announce(order: Order) {
  await mail.send((message) => {
    message.to(order.customerEmail).subject('Order created')
  })
}
```

#### Correct

```ts
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import Order from '#models/order'

const order = await db.transaction(async (trx) => {
  const created = await Order.create(payload, { client: trx })
  await created.related('items').createMany(items)
  return created
})

await mail.send((message) => {
  message.to(order.customerEmail).subject('Order created')
})
```

#### Caveats

The example orders an ordinary best-effort effect after commit; it does not provide exactly-once or crash-safe delivery. When durable delivery is a requirement, persist an outbox/job record in the same database transaction and use the project's actual delivery mechanism. Current Lucid also documents `trx.after('commit', ...)`, whose handler errors are swallowed: handle failures explicitly. Database writes inside hooks need the model's `$trx` propagated to their queries. Pure normalization hooks should check `$dirty` to avoid rehashing/recomputing unchanged values.

#### Official sources

- https://lucid.adonisjs.com/docs/model-hooks
- https://lucid.adonisjs.com/docs/transactions

---

### 2.10 Keep atomic writes in a managed transaction

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Use a managed transaction for writes that must succeed together. A failure in the second write must undo the first; a JavaScript callback alone does not provide atomicity. Let failures escape the callback so Lucid rolls back instead of committing partial work.

#### Incorrect

```ts
const order = await Order.create({ customerId, status: 'pending' })
await order.related('items').createMany(items)
// An item failure can leave an empty pending order.
```

#### Correct

```ts
import db from '@adonisjs/lucid/services/db'
import Order from '#models/order'

const order = await db.transaction(async (trx) => {
  const created = await Order.create(
    { customerId, status: 'pending' },
    { client: trx }
  )
  await created.related('items').createMany(items)
  return created
})
```

#### Caveats

All participating queries must use the transaction client. Do not catch and discard a write error inside the callback. Prefer manual transactions only when their lifetime genuinely needs explicit control, and ensure every path commits or rolls back. A transaction covers one database connection, not remote payment or mail operations.

#### Official sources

- https://lucid.adonisjs.com/docs/transactions
- https://lucid.adonisjs.com/docs/has-many

---

### 2.11 Run migration data operations through defer and its client

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Use `this.defer` for data operations that must happen after queued schema operations. Use the callback's database client rather than application models, whose columns/hooks may change before an old migration is replayed. Deferred operations also respect Lucid's dry-run behavior by not executing during dry runs.

#### Incorrect

```ts
this.schema.alterTable('users', (table) => {
  table.string('display_name')
})
await User.query().update({ displayName: 'Unknown' })
```

#### Correct

```ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('display_name')
    })

    this.defer(async (db) => {
      await db.from('users')
        .whereNull('display_name')
        .update({ display_name: db.raw('??', ['name']) })
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('display_name')
    })
  }
}
```

#### Caveats

This single-statement backfill suits a small table; on large live tables, use a separately controlled bounded backfill so transactions and locks remain short. A dry run does not show deferred data queries, so it is not complete evidence of migration safety. Avoid irreversible transformations unless the rollout and recovery plan explicitly account for data loss. This example assumes the existing name column has the desired values.

#### Official sources

- https://lucid.adonisjs.com/docs/migrations
- https://lucid.adonisjs.com/docs/raw-query-builder

---

### 2.12 Deploy schema changes with compatibility and rollback safety

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Treat production migrations as application deployments, not local rebuilds. Add compatible schema first, deploy code that can use it, backfill if needed, and only remove old columns after old application instances no longer depend on them. A `down` method cannot recover deleted production data.

#### Incorrect

```ts
// Same deploy still has old instances that read users.name.
this.schema.alterTable('users', (table) => {
  table.dropColumn('name')
  table.string('display_name').notNullable()
})
```

#### Correct

```ts
import { BaseSchema } from '@adonisjs/lucid/schema'

// Expansion migration; old code continues reading name.
export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('display_name').nullable()
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('display_name')
    })
  }
}
```

#### Caveats

The example is the expansion phase, not the entire cutover: backfill and move readers/writers before a separate reviewed constraint/removal migration. This staged deployment is an engineering recommendation derived from migration semantics, not an automatic Lucid guarantee. Keep applied migrations immutable; add a new forward migration. Inspect actual dialect locking and DDL transaction support. Use current Lucid's `disableRollbacksInProduction` where available, preserve migration locks, and never use fresh/refresh/reset on live data. Disable a migration's transaction only for operations that require it, such as PostgreSQL concurrent index creation.

#### Official sources

- https://lucid.adonisjs.com/docs/migrations
- https://lucid.adonisjs.com/docs/table-builder

---

### 2.13 Preload required relationships instead of querying in loops

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Declare the response's relationship graph on its query. Loading a relation for each result turns a list request into N additional database round trips. If the response only needs a count or existence test, use aggregates or relationship filtering rather than fetching all children.

#### Incorrect

```ts
const posts = await Post.query().limit(20)
for (const post of posts) {
  await post.load('author')
}
return posts.map((post) => ({ title: post.title, author: post.author.fullName }))
```

#### Correct

```ts
import Post from '#models/post'

const posts = await Post.query()
  .preload('author')
  .orderBy('id', 'desc')
  .limit(20)

return posts.map((post) => ({ title: post.title, author: post.author.fullName }))
```

#### Caveats

Preload only relationships the response uses: eager loading an unbounded child collection can be worse than a small explicit query. Use `withCount` when only the count is needed; its result lives in `$extras`. Transformers do not load missing relationships automatically. Ensure selected columns preserve the keys needed for relation hydration.

#### Official sources

- https://lucid.adonisjs.com/docs/has-many
- https://lucid.adonisjs.com/docs/serializing-models

---

### 2.14 Use groupLimit for top-N children per parent

**Impact: HIGH**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

A plain `limit` in a collection preload limits the combined child query, not each parent's children. Use Lucid's per-parent limit and ordering when an endpoint promises a bounded preview for every parent.

#### Incorrect

```ts
const users = await User.query().preload('posts', (posts) => {
  posts.orderBy('created_at', 'desc').limit(3)
})
```

#### Correct

```ts
import User from '#models/user'

const users = await User.query()
  .orderBy('id', 'asc')
  .limit(20)
  .preload('posts', (posts) => {
    posts.groupOrderBy('id', 'desc').groupLimit(3)
  })
```

#### Caveats

The grouped APIs use window functions and need a supporting database/version. Use a unique order (ID here) or an explicit tie-breaker when the installed API supports multiple grouped order columns. A plain `limit` is appropriate for `oneUser.related('posts').query()` because there is only one parent. Limit the parent query too.

#### Official sources

- https://lucid.adonisjs.com/docs/has-many

---

### 2.15 Resolve child records through an authorized parent

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

An existing ID is not evidence of ownership. Scope child reads and writes to an already-authorized parent or explicit tenant predicate before mutating data. This avoids updating another tenant's child merely because the caller knows its ID.

#### Incorrect

```ts
const project = await Project.findOrFail(params.projectId)
const task = await Task.findOrFail(params.taskId)
task.merge(payload)
await task.save()
```

#### Correct

```ts
import Project from '#models/project'

const project = await Project.query()
  .where('tenant_id', auth.user!.tenantId)
  .where('id', params.projectId)
  .firstOrFail()

const task = await project.related('tasks').query()
  .where('id', params.taskId)
  .firstOrFail()

task.merge(payload)
await task.save()
```

#### Caveats

The example assumes tenant membership authorizes this action; invoke the existing Bouncer policy for finer permissions. Never accept `tenantId` or owner IDs from a generic writable payload. Relationship `onQuery` filters constrain reads, but current Lucid does not apply them to relationship create/save helpers; set trusted ownership values explicitly and back them with constraints.

#### Official sources

- https://lucid.adonisjs.com/docs/has-many
- https://lucid.adonisjs.com/docs/relationships
- https://docs.adonisjs.com/guides/auth/authorization.md

---

### 2.16 Propagate the caller transaction through every data access

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

Pass the same client into helpers, model queries, raw queries, and writes that belong to the unit of work. Merely calling a helper inside `db.transaction` does not enlist its default-connection queries. Loaded model instances inherit the query client; existing instances need `useTransaction`.

#### Incorrect

```ts
await db.transaction(async (trx) => {
  await trx.table('orders').where('id', orderId).update({ status: 'paid' })
  await db.table('audit_logs').insert({ order_id: orderId, action: 'paid' })
})
```

#### Correct

```ts
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import db from '@adonisjs/lucid/services/db'
import Order from '#models/order'

async function markPaid(orderId: number, trx: TransactionClientContract) {
  const order = await Order.query({ client: trx })
    .where('id', orderId)
    .firstOrFail()
  order.status = 'paid'
  await order.save()
  await trx.table('audit_logs').insert({ order_id: order.id, action: 'paid' })
}

await db.transaction((trx) => markPaid(orderId, trx))
```

#### Caveats

Use `instance.useTransaction(trx)` before saving an instance loaded outside the transaction. Relationship writes inherit the parent instance's transaction. Start transactions on the intended named connection; a new default-connection transaction in a nested helper is not a savepoint of its caller. Build a savepoint from the existing client when needed.

#### Official sources

- https://lucid.adonisjs.com/docs/transactions
- https://lucid.adonisjs.com/docs/raw-query-builder

---

## 3. HTTP Boundaries and Lifecycle

**Impact: HIGH**

Preserve routing, middleware, exception, validated-input, and public-response contracts throughout the request lifecycle.

### 3.1 Await downstream middleware and return when rejecting

**Impact: HIGH** — Await next() to preserve the middleware pipeline and upstream response processing

Await next() to preserve the middleware pipeline and upstream response processing. A rejected request must not continue into the handler: return the rejection rather than sending a response and still invoking next.

#### Incorrect

```ts
async handle({ auth, response }: HttpContext, next: NextFn) {
  if (!auth.isAuthenticated) response.unauthorized()
  next()
}
```

#### Correct

```ts
async handle({ auth, response }: HttpContext, next: NextFn) {
  if (!auth.isAuthenticated) return response.unauthorized()
  await next()
}
```

#### Caveats and versions

HttpContext and NextFn are type imports from @adonisjs/core/http and @adonisjs/core/types/http. v7. This illustrates a gate after authentication has been attempted; use generated auth middleware to actually authenticate, not isAuthenticated alone. Upstream code executes before the HTTP response is flushed.

#### References

- https://docs.adonisjs.com/guides/basics/middleware.md

---

### 3.2 Order middleware by lifecycle dependencies

**Impact: HIGH** — Server middleware runs even for unmatched routes; router middleware runs after matching; named middleware runs only where applied

Server middleware runs even for unmatched routes; router middleware runs after matching; named middleware runs only where applied. Put CORS in the server stack so preflights are handled before authentication. Parse bodies before handlers, load sessions before session authentication, and authenticate before authorization.

#### Incorrect

```ts
// start/kernel.ts — misses unmatched requests and may reject preflights
router.use([
  () => import('#middleware/auth_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])
```

#### Correct

```ts
// Merge into start/kernel.ts, preserving other required middleware.
server.use([() => import('@adonisjs/cors/cors_middleware')])
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/session/session_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
])
```

#### Caveats and versions

v7 stack model. server and router are imports from @adonisjs/core/services/server and /router. Include session middleware only when sessions are installed. Project-generated container bindings and Bouncer initialization must remain registered; this is an ordering excerpt, not a replacement kernel.

#### References

- https://docs.adonisjs.com/guides/basics/middleware.md
- https://docs.adonisjs.com/guides/security/cors.md
- https://docs.adonisjs.com/guides/auth/session-guard.md

---

### 3.3 Preserve exception semantics and disable production debug output

**Impact: HIGH** — Let the framework handle validation, authentication, authorization, and not-found exceptions unless the endpoint contract genuinely differs

Let the framework handle validation, authentication, authorization, and not-found exceptions unless the endpoint contract genuinely differs. Catch-all responses erase status codes and can leak database errors or stack traces. Keep reporting separate from rendering.

#### Incorrect

```ts
try {
  return await request.validateUsing(createPostValidator)
} catch (error) {
  return response.ok({ error: String(error) })
}
```

#### Correct

```ts
import app from '@adonisjs/core/services/app'
import { ExceptionHandler } from '@adonisjs/core/http'
export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction
}
```

#### Caveats and versions

v7 global handler shape. Retain existing custom handling and report overrides; delegate unknown errors to super.handle. Do not expose raw exception messages in bespoke 500 responses. JSON clients should send the correct Accept header rather than forcing every SSR failure into JSON.

#### References

- https://docs.adonisjs.com/guides/basics/exception-handling.md
- https://docs.adonisjs.com/guides/basics/validation.md

---

### 3.4 Declare specific routes before overlapping dynamic routes

**Impact: MEDIUM** — Default registration-order matching can let broad routes capture fixed endpoints

Inspect `config/app.ts` to determine the route matcher before reasoning about precedence. With the default registration-order precedence, a broad parameter route declared first can capture a fixed endpoint and dispatch to the wrong controller. Keep static routes before overlapping parameter routes and constrain identifiers where appropriate. With the tree matcher and specificity prioritization enabled, static routes win independently of declaration order; registration order breaks equally specific ties.

#### Incorrect

Under default registration-order precedence (assumes the router and PostsController bindings shown below):

```ts
router.get('/posts/:id', [PostsController, 'show'])
router.get('/posts/create', [PostsController, 'create'])
```

#### Correct

```ts
import router from '@adonisjs/core/services/router'
const PostsController = () => import('#controllers/posts_controller')
router.get('/posts/create', [PostsController, 'create'])
router.get('/posts/:id', [PostsController, 'show']).where('id', router.matchers.number())
```

#### Caveats and versions

v7 lazy-controller style; preserve generated-controller conventions in v7 apps that use them. The example ordering is defensive for registration-order precedence, not a requirement for static-route precedence with the specificity-prioritizing tree matcher. A numeric matcher limits route shape, not authorization or full runtime validation. Review resource and wildcard routes for collisions too.

#### References

- https://docs.adonisjs.com/guides/basics/routing.md
- https://docs.adonisjs.com/guides/basics/routing#using-the-tree-matcher

---

### 3.5 Validate route and query input before using it

**Impact: HIGH** — URL parameters and query strings are untrusted too

URL parameters and query strings are untrusted too. Parse bounded pagination and allowlisted ordering at the boundary rather than forwarding raw input into database identifiers or relying on a TypeScript cast.

#### Incorrect

```ts
const limit = request.input('limit') as number
return Post.query().orderBy(request.input('sort')).limit(limit)
```

#### Correct

```ts
// v7 VineJS schema, defined at module scope:
const listPostsValidator = vine.create({
  limit: vine.number().withoutDecimals().min(1).max(100).optional(),
  sort: vine.enum(['created_at', 'title'] as const).optional(),
})

// Controller action with Post and validator imported:
const { limit, sort } = await request.validateUsing(listPostsValidator)
return Post.query().orderBy(sort ?? 'created_at').limit(limit ?? 20)
```

#### Caveats and versions

Import vine from @vinejs/vine. Use the documented v7 vine.create API and inspect installed VineJS. For route IDs, validate a nested params object through request.validateUsing. Filter identifiers must be allowlisted even when the query builder parameterizes values. Bound pagination does not replace tenant scoping.

Pagination counts are integers. Reject a fractional `limit` at the HTTP boundary rather than relying on a downstream query builder to truncate it. Keep monetary/measurement fields separate: their decimal policy depends on the domain.

#### References

- https://docs.adonisjs.com/guides/basics/validation.md
- https://docs.adonisjs.com/guides/basics/request.md
- https://vinejs.dev/docs/types/number

---

## 4. Runtime Validation

**Impact: HIGH**

Convert untrusted input into explicit runtime contracts, distinguish optional and nullable values, and keep validation preflight separate from durable database guarantees.

### 4.1 Create reusable validators once and clone mutable schema fragments

**Impact: MEDIUM**

**Version scope:** AdonisJS v7 integration with the independently versioned VineJS 4 API. Confirm the installed VineJS version supports the shown APIs.

VineJS precompiles a schema into an optimized validator. Create static validators at module scope rather than rebuilding them for every request. Schema builder methods mutate the underlying instances; clone fragments when deriving differently constrained fields so changes do not silently affect another validator.

#### Incorrect

```ts
const name = vine.string().trim()
const createSchema = vine.object({ name })
const patchSchema = vine.object({ name: name.maxLength(20).optional() })
// maxLength changed the shared name instance used by createSchema too.

async function store({ request }: HttpContext) {
  const validator = vine.create(createSchema)
  return request.validateUsing(validator)
}
```

#### Correct

```ts
import vine from '@vinejs/vine'

const name = vine.string().trim().minLength(1)

export const createUserValidator = vine.create({
  name: name.clone().maxLength(100),
})

export const updateUserValidator = vine.create({
  name: name.clone().maxLength(20).optional(),
})

// Controller action with createUserValidator imported:
const payload = await request.validateUsing(createUserValidator)
```

#### Caveats

Explicit independent schemas are often simpler than a generic schema composition framework. Keep create/update authorization differences visible rather than blindly making every create field optional. Supply request-specific options through typed metadata rather than mutating shared validators. `vine.create` is the current documented VineJS API; check the independently versioned installed package before introducing newly documented composition helpers.

#### Official sources

- https://vinejs.dev/docs/getting_started
- https://vinejs.dev/docs/schema_101
- https://docs.adonisjs.com/guides/basics/validation.md

---

### 4.2 Express cross-field requirements in the validation schema

**Impact: HIGH**

**Version scope:** AdonisJS v7 integration with the independently versioned VineJS 4 API. Confirm the installed VineJS version supports the shown APIs.

Independently optional fields do not express conditional requirements. Use conditional required rules for simple dependencies, and object groups/unions when the allowed output has distinct variants. This prevents invalid combinations from reaching persistence and gives consumers a usable type contract.

#### Incorrect

```ts
const checkoutValidator = vine.create({
  delivery: vine.enum(['pickup', 'shipping']),
  address: vine.string().optional(),
})
// Shipping without an address passes.
```

#### Correct

```ts
import vine from '@vinejs/vine'

export const checkoutValidator = vine.create({
  delivery: vine.enum(['pickup', 'shipping']),
  address: vine.string().trim().minLength(1).optional()
    .requiredWhen('delivery', '=', 'shipping'),
})
```

#### Caveats

A conditional required rule makes a field required under that condition; it does not automatically forbid it in other cases, nor does it create a TypeScript discriminated union. Use `vine.group` with literal discriminants or a union when the application needs mutually distinct shapes, and define an explicit fallback/error for unmatched cases. Conditions read untrusted input, so do not assume unrelated fields have already been validated or coerced. Database/domain checks still belong where they can be enforced atomically.

#### Official sources

- https://vinejs.dev/docs/conditional_validation
- https://vinejs.dev/docs/types/object

---

### 4.3 Treat unique and exists rules as preflight checks, not guarantees

**Impact: CRITICAL**

**Version scope:** AdonisJS v7 with independently versioned VineJS 4 and Lucid. The database validation and migration examples follow current Lucid 22.x documentation; confirm installed package support.

Database validation improves feedback but observes a moment in time. Another request can create the same value, delete a referenced row, or change ownership after validation. Preserve unique/foreign-key constraints and repeat ownership-sensitive decisions within the actual write's transaction when needed.

#### Incorrect

```ts
export const registerValidator = vine.create({
  email: vine.string().email().unique({ table: 'users', column: 'email' }),
})
// users.email has no unique index: concurrent requests can both insert.
```

#### Correct

```ts
// Validator: friendly preflight error.
import vine from '@vinejs/vine'

export const registerValidator = vine.create({
  email: vine.string().email().unique({ table: 'users', column: 'email' }),
})

// Migration fragment: definitive arbitration between concurrent writers.
this.schema.createTable('users', (table) => {
  table.increments('id')
  table.string('email').notNullable().unique()
})
```

#### Caveats

Handle recognized constraint failures using the project's established response policy; never catch every database error as a duplicate. `exists` alone proves neither tenant ownership nor permission: constrain its query with trusted metadata and scope the eventual write too. Supply the database `column` explicitly for camelCase input mapped to snake_case. Each unique/exists value runs a separate query, so large input arrays need bounds and may need a set-based design. Case-insensitive checks must agree with the actual database uniqueness policy and suitable indexes.

#### Official sources

- https://lucid.adonisjs.com/docs/validation
- https://lucid.adonisjs.com/docs/table-builder

---

### 4.4 Give omission and null distinct PATCH semantics

**Impact: HIGH**

**Version scope:** AdonisJS v7 integration with the independently versioned VineJS 4 API. The persistence example uses Lucid model `merge`/`save`; confirm the installed packages support the shown APIs.

Choose modifiers according to the endpoint contract. `optional()` alone accepts null but removes it from output, so it cannot represent clearing a nullable column. `nullable()` requires the key but preserves null. Combine `nullable().optional()` for a PATCH field where omission means unchanged and null means clear.

#### Incorrect

```ts
const updateProfileValidator = vine.create({
  bio: vine.string().optional(),
})
// { bio: null } becomes an omitted field, so merge will not clear bio.
```

#### Correct

```ts
import vine from '@vinejs/vine'

export const updateProfileValidator = vine.create({
  bio: vine.string().maxLength(2000).nullable().optional(),
})

const payload = await request.validateUsing(updateProfileValidator)
auth.user!.merge(payload)
await auth.user!.save()
// {}: unchanged; { bio: null }: cleared; { bio: 'Hello' }: updated.
```

#### Caveats

The database column must also permit null. Read the project's `convertEmptyStringsToNull` configuration: HTML empty fields may normalize to null and thus clear a nullable field. An absent nested object and an object containing absent children have different semantics; define them intentionally. Use merge rather than fill for partial updates because fill replaces the model's attribute set.

#### Official sources

- https://vinejs.dev/docs/schema_101
- https://vinejs.dev/docs/html_forms_and_surprises
- https://lucid.adonisjs.com/docs/crud-operations

---

### 4.5 Pass trusted request context as typed validator metadata

**Impact: CRITICAL**

**Version scope:** AdonisJS v7 with independently versioned VineJS 4 and Lucid. The `unique` extension follows current Lucid 22.x documentation; confirm installed package support.

Reusable validators should receive runtime identity and tenant context through metadata, not mutable module globals or user-supplied fields. Type metadata to make required context visible to callers. Exclude the authorized target's own row when checking uniqueness on update, and scope tenant-local checks to the trusted tenant.

#### Incorrect

```ts
const payload = await request.validateUsing(updateUserValidator, {
  meta: { userId: request.input('userId'), tenantId: request.input('tenantId') },
})
// The client chooses which row is excluded and which tenant is checked.
```

#### Correct

```ts
// app/validators/profile.ts
import vine from '@vinejs/vine'

export const updateUserValidator = vine
  .withMetaData<{ userId: number; tenantId: number }>()
  .create({
    email: vine.string().email().unique({
      table: 'users',
      column: 'email',
      filter: (query, _value, field) => {
        query.where('tenant_id', field.meta.tenantId)
          .whereNot('id', field.meta.userId)
      },
    }),
  })

// Authenticated self-update action:
const user = auth.user!
const payload = await request.validateUsing(updateUserValidator, {
  meta: { userId: user.id, tenantId: user.tenantId },
})
user.merge(payload)
await user.save()
```

#### Caveats

For administrative updates, derive metadata from the already-authorized target, not automatically the actor. Metadata typing is compile-time assistance, not runtime authentication; all callers must supply trusted values. Match the database uniqueness constraint to the same scope (tenant_id + email here). Validators are module-scoped and shared across concurrent requests, so never mutate their rules or a global currentUser variable per request.

#### Official sources

- https://docs.adonisjs.com/guides/basics/validation.md
- https://lucid.adonisjs.com/docs/validation
- https://vinejs.dev/docs/schema_101

---

### 4.6 Persist the validated output, never the original request object

**Impact: CRITICAL**

**Version scope:** AdonisJS v7 integration with independently versioned VineJS. Confirm the installed VineJS supports the shown `vine.create` API.

Persist the validator's typed, normalized output, not the original `request.all()`. Define an action-specific allowlist of writable fields; keep ownership, roles, and privileged flags server-controlled. Selecting input is not validation, and a `request.except(['password'])` denylist still admits every other present or future field.

#### Incorrect

```ts
const user = auth.getUserOrFail()
await request.validateUsing(updateProfileValidator)
user.merge(request.all()) // Discards the validated, normalized output.
await user.save()
```

#### Correct

```ts
// app/validators/profile.ts
import vine from '@vinejs/vine'

export const updateProfileValidator = vine.create({
  fullName: vine.string().trim().minLength(1).maxLength(100),
})

// Authenticated controller action; request/auth come from HttpContext,
// and updateProfileValidator is imported from #validators/profile.
const user = auth.getUserOrFail()
const payload = await request.validateUsing(updateProfileValidator)
user.merge(payload)
await user.save()
```

#### Caveats

Unknown object properties are stripped by default, not rejected. `allowUnknownProperties()` copies unvalidated unknown data into the output: avoid it for persistence payloads. If accepting an extension record, explicitly validate that subtree and keep it separate from model `merge`. Validation is not HTML sanitization, authorization, ownership enforcement, or a guarantee of future database state; retain authorization, database constraints, and upload/body-parser limits.

#### Official sources

- https://docs.adonisjs.com/guides/basics/validation.md
- https://vinejs.dev/docs/types/object
- https://docs.adonisjs.com/guides/basics/request.md

---

## 5. Framework Architecture

**Impact: HIGH**

Match installed v7 APIs, preserve request isolation, respect dependency injection and generated modules, and separate registration from runtime effects.

### 5.1 Pass durable identity to jobs instead of an ambient HTTP context

**Impact: HIGH** — An HTTP context is not a background-job identity or a durable authorization grant

An HTTP context is not a background-job identity or a durable authorization grant. Async-local lookup reads the current async scope, not whether a response is still active. Independent jobs normally have no request scope, while detached async descendants of a request may inherit its stale context after the response. Pass explicit identifiers to non-HTTP code and let it load current state; do not retain request objects after the response.

#### Incorrect

```ts
import { HttpContext } from '@adonisjs/core/http'
export async function generateReport() {
  const user = HttpContext.getOrFail().auth.getUserOrFail()
  return { requestedBy: user.id }
}
```

#### Correct

```ts
export async function generateReport(requestedBy: number) {
  return { requestedBy }
}

// Within the authenticated controller action:
const user = auth.getUserOrFail()
return generateReport(user.id)
```

#### Caveats and versions

Function returns report metadata to illustrate the boundary, not a queue API. Perform needed authorization again when a delayed operation executes. ALS requires explicit configuration. `HttpContext.getOrFail()` throws when ALS is disabled or its async-local store has no context; it does not check response completion and is not a lifecycle or authorization guard. Prefer explicit arguments or DI; do not enable ALS simply to avoid passing one argument.

#### References

- https://docs.adonisjs.com/guides/basics/http-context.md
- https://nodejs.org/api/async_context.html#asynclocalstoragegetstore
- https://github.com/adonisjs/http-server/blob/8.x/src/http_context/main.ts

---

### 5.2 Import injectable classes as runtime values

**Impact: HIGH** — The container needs class constructors at runtime

The container needs class constructors at runtime. Type-only imports and interfaces disappear after TypeScript compilation, so they cannot identify injectable dependencies. Use the existing container pattern rather than manually constructing a tree of services.

#### Incorrect

```ts
import type InvoiceService from '#services/invoice_service'
import { inject } from '@adonisjs/core'
@inject()
export default class InvoicesController {
  constructor(private invoices: InvoiceService) {}
}
```

#### Correct

```ts
import InvoiceService from '#services/invoice_service'
import { inject } from '@adonisjs/core'
@inject()
export default class InvoicesController {
  constructor(private invoices: InvoiceService) {}
}
```

#### Caveats and versions

v7 class injection. Keep type-only imports for ordinary annotations such as controller HttpContext when it is not being injected. Middleware supports constructor injection, not handle-method injection. Interfaces/configuration require explicit container factories or runtime tokens.

#### References

- https://docs.adonisjs.com/guides/concepts/dependency-injection.md
- https://docs.adonisjs.com/guides/basics/middleware.md

---

### 5.3 Inspect installed versions before choosing APIs

**Impact: CRITICAL** — Match the installed framework and companion packages, not the latest documentation banner

Inspect the installed v7 framework and companion packages, not just the documentation banner. Read package.json, the lockfile, adonisrc.ts, package import aliases, and generated files before choosing a syntax or migration. A dependency range alone does not identify the resolved version.

#### Incorrect

```ts
// Assuming optional scaffolding exists solely because core is v7.
import { controllers } from '#generated/controllers'
```

#### Correct

```ts
// Use lazy controller imports when this is
// the convention established by the installed application.
import router from '@adonisjs/core/services/router'
const PostsController = () => import('#controllers/posts_controller')
router.get('/posts', [PostsController, 'index'])
```

#### Caveats and versions

v7 only. v7 requires Node.js 24+ and configured codegen hooks for generated imports. Package majors are independent; inspect auth, Lucid, VineJS, and integration versions too. If the repository is not v7, report the incompatibility rather than silently upgrading it or applying these rules as a migration.

`HttpRequest` and `HttpResponse` are valid v7 exports from `@adonisjs/core/http` (renamed from `Request` and `Response`); do not mistake them for optional generated scaffolding.

#### References

- https://docs.adonisjs.com/v6-to-v7.md
- https://docs.adonisjs.com/guides/basics/routing.md

---

### 5.4 Keep provider registration synchronous and lazy

**Impact: HIGH** — Register factories before resolving dependencies

Register factories before resolving dependencies. During register, other providers may not yet have registered their bindings. Resolve services or perform asynchronous initialization in an appropriate later lifecycle hook.

#### Incorrect

```ts
async register() {
  const client = await this.app.container.make(ApiClient)
  this.app.container.singleton(Reports, () => new Reports(client))
}
```

#### Correct

```ts
register() {
  this.app.container.singleton(Reports, async (resolver) => {
    const client = await resolver.make(ApiClient)
    return new Reports(client)
  })
}
```

#### Caveats and versions

Provider methods shown belong to a provider receiving ApplicationService in its constructor; ApiClient and Reports are application classes. register is synchronous in v7. Choose singleton only for genuinely process-wide state, never request data.

#### References

- https://docs.adonisjs.com/guides/concepts/service-providers.md
- https://docs.adonisjs.com/guides/concepts/dependency-injection.md

---

### 5.5 Keep request context out of shared singletons

**Impact: CRITICAL** — HttpContext, authenticated users, tenant identity, and request loggers belong to one request

HttpContext, authenticated users, tenant identity, and request loggers belong to one request. Capturing them in process-global variables or singleton fields leaks state between concurrent users. Pass request-scoped values explicitly or resolve services with the request resolver.

#### Incorrect

```ts
import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'

let currentUserId: number
router.get('/me', async ({ auth }) => {
  currentUserId = auth.getUserOrFail().id
  const profile = await db.from('profiles')
    .where('user_id', currentUserId).select('display_name').first()
  // Another request can overwrite the global while the query is pending.
  return { id: currentUserId, displayName: profile?.display_name ?? null }
})
```

#### Correct

```ts
import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'

router.get('/me', async ({ auth }) => {
  const userId = auth.getUserOrFail().id
  const profile = await db.from('profiles')
    .where('user_id', userId).select('display_name').first()
  return { id: userId, displayName: profile?.display_name ?? null }
})
```

#### Caveats and versions

AdonisJS v7; the example assumes an existing `profiles` table with `user_id` and `display_name`, and authentication middleware protecting the route. Both variants perform the same useful database I/O; only request-state ownership differs. To reproduce the race, overlap two authenticated requests while the first query is deliberately held pending in an isolated test. A shared mutable ID can then mismatch the returned profile; a request-local ID cannot.

Do not register an injected context-bearing service as a singleton. Use `ctx.containerResolver`, rather than the global container, when manually constructing context-dependent services.

#### References

- https://docs.adonisjs.com/guides/basics/http-context.md
- https://docs.adonisjs.com/guides/concepts/dependency-injection.md

---

### 5.6 Regenerate rather than hand-maintain generated indexes

**Impact: HIGH** — In v7, generated modules are source inputs, not disposable build output

In v7, generated modules are source inputs, not disposable build output. Let configured generators discover entities and routes; commit .adonisjs files used by the application. Hand edits disappear on regeneration and can misrepresent real routes.

#### Incorrect

```ts
// Editing .adonisjs/server/controllers.ts by hand:
export const controllers = { Posts: () => import('#controllers/posts_controller') }
```

#### Correct

```ts
// adonisrc.ts — v7, minimal entity indexing configuration
import { defineConfig } from '@adonisjs/core/app'
import { indexEntities } from '@adonisjs/core/generators'
export default defineConfig({
  hooks: { init: [indexEntities()] },
})
```

#### Caveats and versions

v7-only generator configuration. Merge this into existing configuration, preserving providers and package hooks. After source changes or resolving conflicts, regenerate with node ace codegen when execution is authorized; do not run it merely to inspect an untrusted repository.

#### References

- https://docs.adonisjs.com/guides/concepts/codegen.md
- https://docs.adonisjs.com/v6-to-v7.md

---

### 5.7 Separate framework registration from runtime side effects

**Impact: HIGH** — v7 tooling warms up providers and preload files to inspect routes

v7 tooling warms up providers and preload files to inspect routes. Starting workers, timers, or external writes during warmup can unexpectedly run production operations during code generation. Put long-running runtime work in ready and release it in shutdown; keep route registration visible to tooling.

#### Incorrect

```ts
// v7 provider
async start() {
  await this.worker.start()
}
```

#### Correct

```ts
// Provider whose worker is an application-owned lifecycle service.
async ready() {
  await this.worker.start()
}

async shutdown() {
  await this.worker.stop()
}
```

#### Caveats and versions

v7 warmup/run-mode distinction. this.worker is an application service initialized by the provider, not a built-in Adonis property. Never hide route or binding registration behind run-mode checks.

#### References

- https://docs.adonisjs.com/guides/concepts/application-lifecycle.md
- https://docs.adonisjs.com/guides/concepts/service-providers.md
- https://docs.adonisjs.com/guides/concepts/codegen.md

---

## 6. Production Reliability

**Impact: HIGH**

Deploy complete artifacts and operate jobs, caches, locks, storage, connections, and diagnostics with explicit ownership, visibility, durability, and lifecycle semantics.

### 6.1 Deploy the standalone build with runtime dependencies and assets

**Impact: HIGH** — The TypeScript dev server is not the production artifact

#### Rationale

The TypeScript dev server is not the production artifact. Adonis builds JavaScript and copies configured meta files; missing templates, translations or runtime dependencies make a dev-working feature fail after deployment. Build tooling needs development dependencies, while the final runtime uses production dependencies.

#### Incorrect

```ts
// Partial adonisrc.ts: runtime templates are not copied.
metaFiles: [],
// Production must not depend on node ace serve --hmr or TypeScript loaders.
```

#### Correct

```ts
// Partial adonisrc.ts for an app using Edge and translations.
metaFiles: [
  { pattern: 'resources/views/**/*.edge', reloadServer: false },
  { pattern: 'resources/lang/**/*.{json,yaml,yml}', reloadServer: false },
  { pattern: 'public/**', reloadServer: false },
],
hooks: {
  buildStarting: [() => import('@adonisjs/vite/build_hook')],
},
```

Build with `node ace build` after installing build dependencies. Treat `build/` as the application root, install its locked production dependencies, supply environment configuration separately, and run `node bin/server.js` there.

#### Applicability and caveats

AdonisJS v7 production workflow and hooks; check exact installed package/minor requirements without silently upgrading.

AdonisJS v7 requires Node >=24; align development, CI, workers and production. Include Vite only when used; current integration targets Vite >=8. Run database migrations through the deployment lifecycle before serving incompatible traffic. Do not use ignore-ts-errors as a permanent deployment strategy. Package-manager workspace deployments may need their existing workspace-aware install/pruning convention, not blindly copied npm commands.

#### Sources

- https://docs.adonisjs.com/deployment.md
- https://docs.adonisjs.com/guides/frontend/vite.md
- https://docs.adonisjs.com/guides/digging-deeper/i18n.md

---

### 6.2 Invalidate affected cache variants after a successful write

**Impact: HIGH** — A TTL is a staleness policy, not a guarantee of correctness after writes

#### Rationale

A TTL is a staleness policy, not a guarantee of correctness after writes. Tag dependent representations and invalidate after the database commit, so a rolled-back write does not publish new state and every affected list variant can refresh.

#### Incorrect

```ts
await post.merge(payload).save()
await cache.delete({ key: `post:${post.id}` })
// Cached search results and paginated lists still contain the old title.
```

#### Correct

```ts
// Read path, partial: tenantId and page are already validated/scoped.
await cache.getOrSet({
  key: `posts:${tenantId}:page:${page}`,
  tags: [`tenant:${tenantId}:posts`],
  ttl: '5m',
  factory: async () => (await Post.query()
    .where('tenantId', tenantId).paginate(page, 20)).serialize(),
})

// Write path, after the enclosing transaction has committed.
await cache.deleteByTag({ tags: [`tenant:${tenantId}:posts`] })
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Tagging is a cache API, not a transactionally atomic DB/cache protocol. A crash or racing cache fill can still leave stale results; use an explicit recovery/invalidation strategy for stronger requirements. Avoid global clear for a tenant-local mutation. Grace periods and soft timeouts intentionally serve stale data and are unsuitable for security-critical revocation checks.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/cache.md
- https://lucid.adonisjs.com/docs/transactions

---

### 6.3 Isolate cache keys by every visibility and query dimension

**Impact: CRITICAL** — A cache hit bypasses the factory

#### Rationale

A cache hit bypasses the factory. A shared key can return one tenant’s private results to another, even when the factory has a correct SQL filter. Derive identity from authenticated context and include all dimensions that change the response.

#### Incorrect

```ts
// Partial authenticated controller action; tenant membership already resolved.
return cache.getOrSet({
  key: `projects:${page}`,
  factory: () => Project.query().where('tenantId', tenant.id).paginate(page, 20),
})
```

#### Correct

```ts
// Partial action: page and status were validated; tenant is trusted context.
return cache.getOrSet({
  key: JSON.stringify(['projects:v1', tenant.id, auth.user!.id, page, status]),
  ttl: '1m',
  factory: async () => {
    const projects = await Project.query()
      .where('tenantId', tenant.id)
      .where('status', status)
      .paginate(page, 20)
    return projects.serialize()
  },
})
```

#### Applicability and caveats

AdonisJS v7 with the installed compatible version of @adonisjs/cache.

Authorization still runs before lookup. Include locale, sort, filters, pagination and role/permission version when they affect the output; omit user identity only for genuinely shared data. Use JSON-safe outputs so hit and miss shapes match. Never cache authorization decisions as long-lived public content.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/cache.md

---

### 6.4 Synchronize process-local cache layers across replicas

**Impact: HIGH** — Sharing L2 Redis does not make each process’s L1 memory disappear

#### Rationale

Sharing L2 Redis does not make each process’s L1 memory disappear. Use the documented invalidation bus with multi-tier caches so writes and deletes can evict stale local copies on other instances.

#### Incorrect

```ts
// Partial config used by multiple replicas: no invalidation bus.
redis: store()
  .useL1Layer(drivers.memory({ maxSize: '100mb' }))
  .useL2Layer(drivers.redis({ connectionName: 'main' }))
```

#### Correct

```ts
// Partial config/cache.ts; import store and drivers from @adonisjs/cache.
redis: store()
  .useL1Layer(drivers.memory({ maxSize: '100mb' }))
  .useL2Layer(drivers.redis({ connectionName: 'main' }))
  .useBus(drivers.redisBus({ connectionName: 'main' }))
```

#### Applicability and caveats

AdonisJS v7 with the installed compatible version of @adonisjs/cache.

Single-instance apps may omit the bus; an L2-only cache is also valid. Bus invalidation is not a substitute for database consistency or authorization. Do not describe cache stampede protection as a general distributed business-operation lock.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/cache.md
- https://bentocache.dev/docs/introduction

---

### 6.5 Refresh route-derived output before CI typechecking

**Impact: HIGH** — A stale generated client contract can typecheck while omitting real route changes

CI has no development watcher to refresh route-derived modules. Typechecking against yesterday's generated registry can pass even though the application's routes changed. Regenerate from the resolved route table before checking consumers.

#### Incorrect

```sh
# Application root; route definitions changed, generated output did not.
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
node ace build
```

#### Correct

```sh
# Application root; dependencies and codegen integrations are configured.
pnpm install --frozen-lockfile
node ace codegen
pnpm exec tsc --noEmit
node ace build
```

Use the application's existing typecheck command where it differs. Commit the regenerated `.adonisjs` modules used as build inputs; resolve generated-file conflicts by merging their sources and regenerating, not hand-editing registry entries.

#### Applicability and caveats

AdonisJS v7 distinguishes file-based generation from route-based output. Test-runner/build initialization does not refresh every route-derived contract; do not infer freshness from a successful build alone.

Codegen warms up providers and preloads to discover routes. Registration must describe the running application's routes in that mode; operational work must not start merely because tooling inspects the app. Keep producer and consumer package versions compatible when distributing generated client contracts.

#### Sources

- https://docs.adonisjs.com/guides/concepts/codegen.md
- https://docs.adonisjs.com/guides/frontend/api-client.md

---

### 6.6 Separate cheap liveness from dependency readiness and private diagnostics

**Impact: HIGH** — A dependency outage should remove an instance from traffic, not trigger an endless restart loop

#### Rationale

A dependency outage should remove an instance from traffic, not trigger an endless restart loop. Keep liveness lightweight, reflect readiness failures with 503, and avoid exposing detailed infrastructure reports publicly.

#### Incorrect

```ts
// Partial controller action configured as the liveness probe.
async live({ response }: HttpContext) {
  const report = await healthChecks.run()
  return response.ok(report) // Also returns 200 when dependencies fail.
}
```

#### Correct

```ts
// Partial health controller; healthChecks is the configured checker.
async live({ response }: HttpContext) {
  return response.ok()
}

async ready({ response }: HttpContext) {
  const report = await healthChecks.run()
  if (!report.isHealthy) {
    return response.serviceUnavailable({ healthy: false })
  }
  return response.ok({ healthy: true })
}
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Register checks for dependencies actually needed to serve the relevant traffic. Keep detailed reports on a protected/network-restricted monitoring route; public minimal readiness may be acceptable. Avoid storing a monitoring secret in source. Caching readiness results trades check load for detection delay. Match orchestrator thresholds and startup/grace timing to real initialization behavior.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/health-checks.md

---

### 6.7 Use a persistent queue and deploy its workers explicitly

**Impact: HIGH** — Returning from a web request is not proof that background work will survive a restart

#### Rationale

Returning from a web request is not proof that background work will survive a restart. The sync adapter runs inline, while persistent Redis/database adapters need separately running workers for their selected queues and adapters.

#### Incorrect

```ts
// Production config fragment: executes work in the request process.
adapters: { sync: drivers.sync() },
default: 'sync',
```

#### Correct

```ts
import { defineConfig, drivers } from '@adonisjs/queue'

export default defineConfig({
  default: 'redis',
  adapters: { redis: drivers.redis({ connectionName: 'main' }) },
  worker: { concurrency: 5, idleDelay: '2s' },
  locations: ['./app/jobs/**/*.{ts,js}'],
})
```

Deploy a separate supervised process using the built application: `node ace queue:work --queue=emails`. Start a worker for each adapter used by the selected queues; configure concurrency against downstream and database capacity.

#### Applicability and caveats

V7-only integration: current @adonisjs/queue requires @adonisjs/core >=7.6 and is experimental.

Persistent storage still needs appropriate persistence/availability settings, failure monitoring, and shutdown grace. Pin the experimental package version and apply queue:migrate during upgrades before new processes use old storage. Check the installed core minor and package compatibility before adopting the integration; do not silently upgrade.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/queues.md
- https://github.com/boringnode/queue

---

### 6.8 Make retries safe beyond the dispatch deduplication window

**Impact: CRITICAL** — A retry may repeat work that already partially succeeded

#### Rationale

A retry may repeat work that already partially succeeded. Dispatch-time deduplication limits enqueueing; it does not make execution exactly-once or undo an external payment/email. Design the state transition or effect to tolerate repeated attempts.

#### Incorrect

```ts
// Partial retryable execute(): each attempt increments again.
await db.from('reports').where('id', this.payload.reportId)
  .increment('completed_exports', 1)
```

#### Correct

```ts
// Partial execute(): this job only marks an existing report as archived.
// Repeating this assignment has the same final state.
await db.from('reports')
  .where('id', this.payload.reportId)
  .update({ archived: true })
```

#### Applicability and caveats

V7-only dispatch/dedup details refer to experimental @adonisjs/queue; the idempotency principle also applies to BullMQ and other retrying workers.

For non-idempotent business operations use a stable operation ID with a database unique constraint/transaction and the external provider’s documented idempotency mechanism. A “processed” flag written after an external call still has a crash window. Current dedup applies only to single Redis/database dispatches, not sync, batches or schedules; TTL expiration and retention also affect its lifetime. Preserve causal errors for retries rather than swallowing them.

For a non-idempotent database increment, record consumption and apply the effect in one transaction:

```ts
import db from '@adonisjs/lucid/services/db'

// PostgreSQL illustration. processed_operations.operation_id has a UNIQUE
// constraint; reportId and operationId come from the durable job payload.
await db.transaction(async (trx) => {
  const claimed = await trx.table('processed_operations')
    .insert({ operation_id: operationId })
    .onConflict('operation_id').ignore()
    .returning('operation_id')
  if (claimed.length === 0) return // A committed attempt already applied it.

  const updated = await trx.from('reports').where('id', reportId)
    .increment('completed_exports', 1)
  if (Number(updated) !== 1) throw new Error('Report not found')
})
```

The unique operation ID must identify one immutable business operation across retries, not a fresh worker attempt. Keep the ledger entry for as long as replay remains possible. A competing insert waits for the first transaction's outcome: rollback permits a retry; commit makes the duplicate a no-op. The effect and ledger must use the same database transaction. This gives at-most-once committed database effects with retryable delivery, not exactly-once external calls. An external provider still needs its own durable idempotency key or reconciliation.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/queues.md
- https://docs.bullmq.io/patterns/idempotent-jobs
- https://lucid.adonisjs.com/docs/transactions
- https://lucid.adonisjs.com/docs/insert-query-builder
- https://www.postgresql.org/docs/current/sql-insert.html

---

### 6.9 Dispatch serializable identifiers and reload authoritative job state

**Impact: HIGH** — Queue payloads pass through JSON, including with the sync adapter

#### Rationale

Queue payloads pass through JSON, including with the sync adapter. Models lose prototypes and dates become strings; closures, request contexts, streams and BigInt cannot be treated as portable payloads. Prefer small identifiers and explicit primitives.

#### Incorrect

```ts
// Incorrect payload design: expects model methods and HTTP context in a worker.
await GenerateInvoice.dispatch({ order, auth, generatedAt: new Date() })
```

#### Correct

```ts
// Partial dispatch: GenerateInvoice declares this exact payload shape.
await GenerateInvoice.dispatch({
  orderId: order.id,
  requestedBy: auth.user!.id,
  requestedAt: new Date().toISOString(),
})

// Partial execute() of that existing job, not a full job implementation.
const order = await Order.findOrFail(this.payload.orderId)
```

#### Applicability and caveats

V7-only @adonisjs/queue example (core >=7.6, experimental); the serialization boundary also applies to other persistent queues.

Reload and recheck state or authorization when business rules require it; an identifier alone is not authorization. Explicitly decide which data must be snapshotted (for example an invoice revision) rather than silently recalculating changed values later. Keep secrets out of stored payloads and job diagnostics.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/queues.md

---

### 6.10 Dispatch only after commit and choose durability separately

**Impact: CRITICAL** — A worker can run before an enclosing database transaction commits, or after it rolls back

#### Rationale

A worker can run before an enclosing database transaction commits, or after it rolls back. Wait for commit before dispatching work that depends on those writes. A post-commit dispatch prevents that race but does not atomically guarantee delivery if the process dies between commit and enqueue.

#### Incorrect

```ts
await db.transaction(async (trx) => {
  const order = await Order.create(payload, { client: trx })
  await ProcessOrder.dispatch({ orderId: order.id })
})
```

#### Correct

```ts
import db from '@adonisjs/lucid/services/db'

// Partial action: validated payload and ProcessOrder job are in scope.
const order = await db.transaction(async (trx) => {
  return Order.create(payload, { client: trx })
})
await ProcessOrder.dispatch({ orderId: order.id })
```

#### Applicability and caveats

The job dispatch API shown is v7-only (core >=7.6, experimental). Lucid managed transactions and the side-effect design principle are independently applicable.

The corrected snippet is appropriate only when the commit-to-enqueue gap is acceptable or recoverable. For required durable delivery, persist an outbox row with the domain write in the same transaction, then have an idempotent relay enqueue/reconcile it. No undocumented afterCommit dispatcher API is implied. A database queue adapter does not automatically join your transaction. Mail, emitter listeners and SSE broadcasts have the same side-effect boundary.

For a durable outbox, give each intent a stable unique operation ID and insert it through the same transaction client as the order:

```ts
import { randomUUID } from 'node:crypto'
import Order from '#models/order'

// The outbox migration defines a unique operation_id and nullable
// delivered_at, lease_token and lease_until columns.
const operationId = randomUUID()
await db.transaction(async (trx) => {
  const order = await Order.create(payload, { client: trx })
  await trx.table('outbox_events').insert({
    operation_id: operationId,
    event_type: 'order.created',
    payload: JSON.stringify({ orderId: order.id }),
  })
})
```

A relay claims a bounded set of undelivered rows in a short transaction (for PostgreSQL, `FOR UPDATE SKIP LOCKED`), assigns each claim a fresh lease token and expiry, and commits before network dispatch. Select unclaimed or expired leases using database time. Enqueue outside the claim transaction using the stored operation ID, then mark delivery only if that row still has the same lease token; never mark before successful enqueue. Retry expired claims after crashes and conditionally release failed claims. A dispatch can succeed just before the relay dies, so duplicates are unavoidable: consumers must atomically record that stable ID with their database effect, or use a naturally idempotent transition. Lease expiry permits overlapping attempts and is not an exactly-once guarantee. Provider calls need provider idempotency/reconciliation separately. Keep pending rows and the consumer ledger long enough for recovery and replay, and supervise the relay independently of web traffic.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/queues.md
- https://lucid.adonisjs.com/docs/transactions
- https://lucid.adonisjs.com/docs/select-query-builder
- https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE

---

### 6.11 Treat lock TTL as a lease, not permanent exclusivity

**Impact: CRITICAL** — When a lease expires, another worker can acquire the same key while the original work continues

#### Rationale

When a lease expires, another worker can acquire the same key while the original work continues. Coordinate through a shared store, renew before expiry when needed, and keep correctness-critical uniqueness or transitions enforceable by the database or downstream system.

#### Incorrect

```ts
// Memory locks do not coordinate distinct production processes.
const lock = lockManager.use('memory').createLock('catalog:rebuild', '1s')
await lock.run(async () => {
  await rebuildCatalog() // Existing application operation can exceed one second.
})
```

#### Correct

```ts
import lockManager from '@adonisjs/lock/services/main'

// Partial worker: rebuildPage is an existing, bounded application operation.
const lock = lockManager.use('redis').createLock('catalog:rebuild', '30s')
if (!(await lock.acquireImmediately())) return
try {
  for (const page of pages) {
    await lock.extend('30s')
    await rebuildPage(page)
  }
} finally {
  await lock.release()
}
```

#### Applicability and caveats

**API baseline:** AdonisJS 7, `@adonisjs/lock` 2.1.0 with `@verrou/core` 0.5.2. The example assumes a configured shared Redis lock store named `redis`; `pages` and `rebuildPage` belong to the application. Confirm installed APIs when using other versions.

The example requires each page to complete comfortably within the lease; renewal cannot make an unbounded network call safe. Propagate renewal failures and stop new work. A paused/partitioned process can outlive a lease: use constraints, conditional state transitions, fencing where supported, or provider idempotency for irreversible effects. Null TTL risks unrecoverable locks after crashes.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/locks.md
- https://registry.npmjs.org/@adonisjs/lock/2.1.0 (package/dependency provenance)
- https://registry.npmjs.org/@verrou/core/0.5.2 (package provenance)

---

### 6.12 Acquire and release the same owned lock with a bounded wait

**Impact: HIGH** — Lock creation is not lock acquisition

#### Rationale

Lock creation is not lock acquisition. Check acquisition before doing work, release the same owned instance in finally, and bound request-time contention instead of waiting indefinitely. Force-releasing a competitor’s lock breaks mutual exclusion.

#### Incorrect

```ts
const lock = lockManager.createLock(`report:${reportId}`, '30s')
await lock.acquireImmediately()
await report.save()
await lockManager.createLock(`report:${reportId}`).forceRelease()
```

#### Correct

```ts
import lockManager from '@adonisjs/lock/services/main'

// Partial service method; report and reportId are in scope.
const lock = lockManager.createLock(`report:${reportId}`, '30s')
const acquired = await lock.acquire({ retry: { timeout: '2s' } })
if (!acquired) throw new Error('Report is already being processed')
try {
  await report.save()
} finally {
  await lock.release()
}
```

#### Applicability and caveats

**API baseline:** AdonisJS 7, `@adonisjs/lock` 2.1.0 with `@verrou/core` 0.5.2. The service import above assumes the lock provider is configured; the default store must be shared across coordinating processes. Confirm installed APIs when using other versions.

Use `run` for automatic release when indefinite waiting is acceptable; in this baseline it retries indefinitely and does not accept retry options. `runImmediately` skips work on contention and its acquired result must be handled. Reserve `forceRelease` for controlled administrative recovery. Serialized ownership credentials belong only in trusted storage.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/locks.md
- https://verrou.dev/docs/introduction
- https://registry.npmjs.org/@adonisjs/lock/2.1.0 (package/dependency provenance)
- https://registry.npmjs.org/@verrou/core/0.5.2 (package provenance)

---

### 6.13 Log structured request context and redact secrets at known paths

**Impact: HIGH** — Structured logs preserve request correlation and error details without dumping credentials or private payloads

#### Rationale

Structured logs preserve request correlation and error details without dumping credentials or private payloads. Redaction operates on object paths, not arbitrary strings; once a token is interpolated into a message it cannot be reliably removed by key-based redaction.

#### Incorrect

```ts
logger.info(`Authorization: ${request.header('authorization')}`)
logger.error(JSON.stringify(request.all()))
```

#### Correct

```ts
// Partial controller action: use the HttpContext logger.
logger.info({ userId: auth.user!.id, orderId: order.id }, 'Order submitted')
logger.error({ err: error, orderId: order.id }, 'Order processing failed')

// Fragment inside existing loggers.app options in config/logger.ts:
redact: {
  paths: ['password', '*.password', 'req.headers.authorization',
    'req.headers.cookie', 'token'],
  remove: true,
},
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Select redact paths from the actual log-object shape; they are case-sensitive, not universal secret detection. Merge the fragment into existing logger configuration instead of replacing it. Do not derive paths from user input. Prefer allowlisted identifiers over complete bodies, sessions, mail content, released Secret values, signed URLs or queue payloads. Capture structured stdout in production; do not enable raw SMTP content debugging. Redaction for logs does not automatically redact tracing attributes or external SDK telemetry.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/logger.md
- https://docs.adonisjs.com/guides/basics/http-context.md
- https://raw.githubusercontent.com/pinojs/pino/main/docs/redaction.md
- https://nodemailer.com/smtp

---

### 6.14 Do not mistake sendLater for durable or completed delivery

**Impact: HIGH** — The default mail messenger uses an in-memory queue

#### Rationale

The default mail messenger uses an in-memory queue. Awaiting sendLater confirms queuing through that messenger, not mailbox delivery, and pending messages disappear if the process terminates. Use a persistent messenger where delivery must survive restarts.

#### Incorrect

```ts
await mail.sendLater(new WelcomeEmail(user))
return { delivered: true } // Neither durable nor delivered with default messenger.
```

#### Correct

```ts
// Current v7 start/mail.ts; SendMail is the job from the official mail guide.
import mail from '@adonisjs/mail/services/main'
import SendMail from '#jobs/send_mail'

mail.setMessenger((mailer) => ({
  async queue({ message, views }) {
    await SendMail.dispatch({ mailerName: mailer.name, message, views })
  },
}))

// In the action, after commit, with a persistent adapter and live worker:
await mail.sendLater(new WelcomeEmail(user))
return { queued: true }
```

#### Applicability and caveats

Messenger payload shown follows the current v7 mail guide; verify the installed mail package signature before integrating it.

This is the messenger/dispatch portion, not a complete worker: register start/mail as a preload and use the official SendMail job with sendCompiled, which bypasses the messenger to avoid recursive enqueueing. Its payload and views must be JSON-serializable. The current Adonis queue option requires core >=7.6; BullMQ is another documented persistent messenger option. Queue retries may duplicate mail, and provider acceptance is not proof of final delivery.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/mail.md
- https://docs.adonisjs.com/guides/digging-deeper/queues.md
- https://nodemailer.com/smtp

---

### 6.15 Reuse managed Redis connections and close resources you own

**Impact: HIGH** — Creating clients per request leaks sockets and increases connection overhead

#### Rationale

Creating clients per request leaks sockets and increases connection overhead. The Redis service caches named connections for the process lifetime. Put custom clients and other long-lived resources under provider lifecycle ownership, with graceful cleanup rather than per-request disconnects.

#### Incorrect

```ts
import { Redis } from 'ioredis'

// Partial action: creates an unmanaged connection every request.
const connection = new Redis(process.env.REDIS_URL!)
return connection.get(`settings:${user.id}`)
```

#### Correct

```ts
import redis from '@adonisjs/redis/services/main'

// Partial action: reuse the framework-managed connection.
return redis.connection('main').get(`settings:${user.id}`)
```

For a custom client that cannot use the service, pair creation and cleanup:

```ts
import { Redis } from 'ioredis'
import env from '#start/env'

export default class CustomRedisProvider {
  #client?: Redis

  async ready() {
    // REDIS_URL must be declared in the application env schema.
    this.#client = new Redis(env.get('REDIS_URL'))
  }

  async shutdown() {
    await this.#client?.quit()
  }
}
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Register a custom provider only in the environments needing it. Do not close the shared framework connection after an individual HTTP request, or duplicate provider cleanup for resources you do not own. Quit is graceful; disconnect is immediate. Also clean up custom subscriptions, timers, workers and SDKs. Startup failures may require cleanup of partially initialized resources.

#### Sources

- https://docs.adonisjs.com/guides/database/redis.md
- https://docs.adonisjs.com/guides/concepts/service-providers.md
- https://github.com/redis/ioredis

---

### 6.16 Authenticate subscription requests and authorize every private channel

**Impact: CRITICAL** — Transmit channels without authorization callbacks are public

#### Rationale

Transmit channels without authorization callbacks are public. Authenticating the SSE connection alone does not populate the separate subscribe request’s user context or enforce resource ownership. Protect subscription requests and register an authorization rule for each sensitive channel pattern.

#### Incorrect

```ts
transmit.registerRoutes((route) => {
  if (route.getPattern() === '__transmit/events') {
    route.middleware(middleware.auth())
  }
})
// A user-specific name does not itself restrict subscriptions.
transmit.broadcast(`users/${user.id}`, { invoiceId: invoice.id })
```

#### Correct

```ts
// start/routes.ts
transmit.registerRoutes((route) => {
  if (route.getPattern() === '__transmit/subscribe') {
    route.middleware(middleware.auth())
  }
})

// start/transmit.ts, registered as a preload.
transmit.authorize<{ id: string }>('users/:id', (ctx, { id }) => {
  return String(ctx.auth.user?.id) === id && ctx.auth.user !== undefined
})
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Use tenant membership/policies for resource channels, not just an ID match. Token clients attach Authorization with beforeSubscribe; native browser EventSource cannot send arbitrary headers. Review post-subscription permission revocation separately; subscription authorization is not continuous reauthorization. Configure a shared transport when broadcasting across replicas and verify proxy buffering/timeouts. Transmit is not a durable replayable job/event log.

#### Sources

- https://docs.adonisjs.com/guides/digging-deeper/server-sent-events.md

---

## 7. Testing and Isolation

**Impact: HIGH**

Exercise denial paths and isolate databases, storage, fakes, and process-wide substitutions without destructive cleanup reaching shared resources.

### 7.1 Choose rollback or truncation to match actual database execution

**Impact: HIGH** — Tests need a disposable database and per-test cleanup

#### Rationale

Tests need a disposable database and per-test cleanup. Global transaction rollback is fast when the code uses the same process/connection transaction; it cannot isolate an external worker, browser server in another process or unrelated connection. Use truncation/reset for committed multi-process behavior.

#### Incorrect

```ts
// Wrong for tests asserting a separately running worker sees committed rows.
test.group('Worker integration', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())
})
```

#### Correct

```ts
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

// Dedicated integration database; no competing test processes share its tables.
test.group('Worker integration', (group) => {
  group.each.setup(() => testUtils.db().truncate())
})
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

The example configures a group’s isolation, not a complete integration test. Migrate once in runner setup or use the documented truncate hook; target every named database connection used. Configure .env.test to a separate database before executing destructive utilities. Await worker completion and stop external work before truncation. Transaction-wrapped tests do not exercise the real commit-to-queue boundary: include an appropriate committed integration test when changing it. Parallel workers need separate databases/schemas or coordinated ownership, not a shared global rollback/truncate assumption.

#### Sources

- https://docs.adonisjs.com/guides/testing/resetting-state-between-tests.md
- https://japa.dev/docs/lifecycle-hooks

---

### 7.2 Register fake cleanup before any assertion or side effect can throw

**Impact: HIGH** — Fakes and container swaps change process-wide service behavior

#### Rationale

Fakes and container swaps change process-wide service behavior. Restoring them only at the end of a happy path leaks state after failures, contaminating later tests. Use scoped explicit resource management or Japa cleanup registered immediately after setup.

#### Incorrect

```ts
test('queues a welcome email', async ({ client }) => {
  const fake = mail.fake()
  await client.post('/signup').json(payload)
  fake.mails.assertQueued(WelcomeEmail)
  mail.restore() // Skipped when the request or assertion throws.
})
```

#### Correct

```ts
// Partial test: payload and WelcomeEmail are existing application fixtures.
test('queues a welcome email', async ({ client, cleanup }) => {
  const fake = mail.fake()
  cleanup(() => mail.restore())

  await client.post('/signup').json(payload)
  fake.mails.assertQueued(WelcomeEmail)
})
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Current built-in fakes also support using fake = mail.fake() for automatic restoration when the runtime/toolchain supports Explicit Resource Management. Restore Drive disks, emitter/hash fakes, container swaps, clock stubs and custom resources similarly. Assert queued versus sent intentionally. A fake confirms an interaction, not durable dispatch, rendered template correctness or provider delivery. Keep real database tests for SQL constraints/queries; do not globally fake auth/hashing when testing those mechanisms.

#### Sources

- https://docs.adonisjs.com/guides/testing/test-doubles.md
- https://japa.dev/docs/lifecycle-hooks

---

### 7.3 Test anonymous, non-owner and cross-tenant requests through HTTP

**Impact: CRITICAL** — An authorized success test cannot detect a missing auth middleware or ownership filter

#### Rationale

An authorized success test cannot detect a missing auth middleware or ownership filter. Make real HTTP requests for denial paths and verify that forbidden operations do not mutate state or dispatch external effects. Use the application’s actual guard and expected non-disclosure policy.

#### Incorrect

```ts
// Partial test: proves only that the owner can update.
const response = await client.patch(`/posts/${post.id}`)
  .loginAs(owner).json({ title: 'Changed' })
response.assertStatus(200)
```

#### Correct

```ts
// Partial Japa test: owner-scoped API returns 404 for another user’s post.
// post, outsider and originalTitle are persisted fixtures from separate owners.
const anonymous = await client.patch(`/posts/${post.id}`)
  .header('Accept', 'application/json').json({ title: 'Changed' })
anonymous.assertStatus(401)

const denied = await client.patch(`/posts/${post.id}`)
  .header('Accept', 'application/json')
  .loginAs(outsider).json({ title: 'Changed' })
denied.assertStatus(404)
assert.equal((await Post.findOrFail(post.id)).title, originalTitle)
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Use 403 instead of 404 when that is the route’s documented policy; HTML/session routes may redirect rather than return JSON 401. For token routes use withGuard with the actual configured guard, and test missing/revoked/expired credentials as applicable. loginAs bypasses credential verification, so test the login endpoint itself separately when changing authentication. Add cross-tenant fixtures, malformed input, missing resources, private Inertia props and Transmit subscription denials when affected; do not replace policy/middleware with a fake in these tests.

#### Sources

- https://docs.adonisjs.com/guides/testing/api-tests.md
- https://docs.adonisjs.com/guides/auth/authorization.md
- https://japa.dev/docs/plugins/api-client

---

### 7.4 Use dedicated test storage before destructive cleanup

**Impact: HIGH** — Redis flushdb deletes the entire selected database; key prefixes do not protect other keys from it

#### Rationale

Redis flushdb deletes the entire selected database; key prefixes do not protect other keys from it. Tests and parallel workers must not share production/development Redis, queue storage or Drive paths. Isolate resources before enabling cleanup and restore them even when tests fail.

#### Incorrect

```ts
// A prefix is not an isolation boundary for FLUSHDB.
await redis.set('test:session', 'value')
await redis.flushdb() // Deletes unrelated keys in the selected database too.
```

#### Correct

```ts
// Partial group: “tests” is configured to a dedicated disposable Redis DB.
// Application code under test must use that same dedicated target.
const testRedis = redis.connection('tests')
test.group('Redis integration', (group) => {
  group.each.setup(async () => {
    await testRedis.flushdb()
    return () => testRedis.flushdb()
  })
})
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Only use whole-database cleanup when the process/group exclusively owns the target. Parallel tests need per-worker databases/instances, or delete only their owned keys when exercising prefix-compatible code. Redis Cluster does not provide ordinary selectable databases: use an isolated instance or explicit key ownership. Set the app’s effective test connection/storage configuration, not just unused .env names. Drive fakes or Japa filesystem cleanup avoid deleting real user uploads; drain/stop queue consumers before resetting queue state.

#### Sources

- https://docs.adonisjs.com/guides/testing/resetting-state-between-tests.md
- https://docs.adonisjs.com/guides/testing/test-doubles.md
- https://japa.dev/docs/lifecycle-hooks

---

## 8. Rendering and Client Contracts

**Impact: MEDIUM-HIGH**

Keep rendered output and client contracts safe through escaping, explicit browser-visible data, request-local SSR state, and runtime authorization independent of TypeScript types.

### 8.1 Keep untrusted Edge output escaped and preserve context boundaries

**Impact: CRITICAL** — Edge double braces HTML-escape output; triple braces and html.safe deliberately bypass that protection

#### Rationale

Edge double braces HTML-escape output; triple braces and html.safe deliberately bypass that protection. Stored user content is still untrusted. Keep normal content escaped and reserve raw HTML for audited trusted template output or content sanitized by an established policy.

#### Incorrect

```ts
// Partial controller action.
return view.render('comments/show', { comment })
```

```edge
{{-- resources/views/comments/show.edge --}}
<div>{{{ comment.body }}}</div>
```

#### Correct

```ts
// Same controller can safely pass plain text without manufacturing HTML.
return view.render('comments/show', { body: comment.body })
```

```edge
<div>{{ body }}</div>
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

HTML escaping does not make an attacker-controlled javascript: URL safe or safely encode arbitrary JavaScript/CSS contexts. Validate URL schemes and avoid interpolating untrusted data into inline scripts. Raw rendering of trusted framework slots is different from raw user input. Do not invent a sanitizer or treat a TypeScript string brand as sanitization. Keep Shield/CSRF/CSP protections appropriate to the app; escaping does not replace them.

#### Sources

- https://docs.adonisjs.com/guides/frontend/edgejs.md
- https://edgejs.dev/docs/syntax_specification

---

### 8.2 Treat all Inertia props and shared data as browser-visible output

**Impact: CRITICAL** — Both initial HTML and subsequent JSON contain serialized page props

#### Rationale

Both initial HTML and subsequent JSON contain serialized page props. A property that the current component never displays is still exposed to the browser. Select fields explicitly and keep request-specific shared data narrow, namespaced and authorized.

#### Incorrect

```ts
// Partial authenticated controller action: sends internal user attributes.
return inertia.render('settings/profile', {
  user: { ...user.$attributes },
  integration: { accessToken: integration.accessToken },
})
```

#### Correct

```ts
// Partial authenticated action; user is the authorized profile owner.
return inertia.render('settings/profile', {
  user: { id: user.id, fullName: user.fullName, email: user.email },
  integration: { connected: integration.accessToken !== null },
})
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Use existing serializers/transformers for repeated contracts, and test that private fields are absent. Deferred, optional, partial and once props are loading policies, not access controls. Recheck permissions in every data-producing route and request variant. History encryption reduces persisted-history exposure, not visibility to the current page, nor authorization requirements. Shared data increases every applicable payload; keep large queries page-specific.

#### Sources

- https://docs.adonisjs.com/guides/frontend/inertia.md
- https://inertiajs.com/docs/v3/data-props/shared-data.md

---

### 8.3 Keep SSR request data local and deploy the server entrypoint

**Impact: HIGH** — SSR executes frontend rendering inside a long-lived server process

#### Rationale

SSR evaluates frontend page modules on the server, not just in each visitor's browser. A module can survive multiple renders, so a cached identity or mutable store created outside the render can retain another visitor's data. Keep request-derived values in each render's props and configure the Adonis Vite server entrypoint so production contains the same SSR renderer used in development. Backend controllers and services must likewise keep HTTP context, authenticated identity and tenant data out of process-wide singletons; pass request-local values explicitly or use the request resolver.

#### Incorrect

**Prerequisites:** Both alternatives below are React Inertia page modules resolved by the starter kit's SSR entrypoint. The backend supplies a serializable `viewer` prop for the current request; `null` means a guest. They use the React starter's TSX configuration, not backend `HttpContext`.

```tsx
// inertia/pages/home.tsx — also evaluated by the server's SSR renderer.
type Viewer = { id: number; name: string } | null
let firstViewer: Viewer | undefined

export default function Home({ viewer }: { viewer: Viewer }) {
  if (firstViewer === undefined) firstViewer = viewer
  // The first signed-in visitor's name can appear in later visitors' HTML.
  return <h1>{firstViewer?.name ?? 'Guest'}</h1>
}
```

#### Correct

```tsx
// inertia/pages/home.tsx — no identity retained by the shared module.
type Viewer = { id: number; name: string } | null

export default function Home({ viewer }: { viewer: Viewer }) {
  const greeting = viewer?.name ?? 'Guest'
  return <h1>{greeting}</h1>
}
```

```ts
import adonisjs from '@adonisjs/vite/client'

// Partial vite.config.ts plugin options when config/inertia.ts enables SSR.
adonisjs({
  entryPoints: ['inertia/app.tsx'],
  serverEntryPoints: ['inertia/ssr.tsx'],
})
```

#### Applicability and caveats

Current AdonisJS v7 SSR/Vite integration; generic Inertia docs describe multiple adapters and must not override the Adonis setup.

The incorrect page retains the first render's identity even across sequential SSR requests; it does not require an artificial async race. Create any request-derived store or client inside the per-render scope rather than at module level. Do not access `window`/`localStorage` unconditionally in modules evaluated on the server or mutate a singleton API client's headers with a user token. Keep server-only secrets/modules out of the browser bundle. Use `@inertia` and `@inertiaHead` in the root Edge template instead of manual JSON/HTML concatenation. Preserve Shield XSRF configuration; neither SSR nor the `X-Inertia` header authenticates a request. Enable `ssr.enabled` in `config/inertia.ts` and keep its `ssr.entrypoint` identical to the Vite `serverEntryPoints` path. The Adonis integration loads its own bundled SSR entrypoint: do not copy Laravel-specific SSR commands from generic Inertia docs.

#### Sources

- https://docs.adonisjs.com/guides/frontend/inertia.md
- https://docs.adonisjs.com/guides/frontend/vite.md
- https://inertiajs.com/docs/v3/advanced/server-side-rendering.md

---

### 8.4 Use Tuyau for compile-time contracts, not runtime trust

**Impact: CRITICAL** — A type-safe client catches mistakes in cooperating TypeScript code; attackers and ordinary HTTP clients can bypass it

#### Rationale

A type-safe client catches mistakes in cooperating TypeScript code; attackers and ordinary HTTP clients can bypass it. Every server action still needs runtime validation, authentication and resource authorization. Keep generated registry and client package versions compatible.

#### Incorrect

```ts
// Partial action: the frontend uses Tuyau, so input was assumed safe.
const post = await Post.findOrFail(params.id)
await post.merge(request.all()).save()
return post
```

#### Correct

```ts
// Partial authenticated action; imports use the app’s existing validator/ability.
const payload = await request.validateUsing(updatePostValidator)
const post = await Post.findOrFail(params.id)
await bouncer.authorize(editPost, post)
await post.merge({ title: payload.title, body: payload.body }).save()
return { id: post.id, title: post.title, body: post.body }
```

#### Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Tuyau route types and type-level serialization do not validate arbitrary server responses or prove business permissions. Do not cast to any to bypass stale registry errors; regenerate and resolve the real contract mismatch. Current @tuyau/core registry producers and clients must share a version (encoding changed in 1.2.3). Review Ky retries/timeouts/hooks for the installed version; transport retries must respect mutation idempotency. Do not bundle backend runtime imports/secrets merely to share types.

#### Sources

- https://docs.adonisjs.com/guides/frontend/api-client.md
- https://docs.adonisjs.com/guides/basics/validation.md
- https://docs.adonisjs.com/guides/auth/authorization.md
- https://github.com/sindresorhus/ky

---

## Official Documentation

- https://docs.adonisjs.com
- https://lucid.adonisjs.com
- https://vinejs.dev
- https://edgejs.dev
- https://japa.dev
- https://bentocache.dev
- https://flydrive.dev
- https://verrou.dev
