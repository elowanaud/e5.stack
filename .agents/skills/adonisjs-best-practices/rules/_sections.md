# Sections

This file defines category order, impact levels, and descriptions. The section ID in parentheses is the filename prefix used to group substantive rules. Category impact guides selection; each rule retains its own impact, including critical rules within lower-ranked categories.

---

## 1. Security and Trust Boundaries (security)

**Impact:** CRITICAL  
**Description:** Protect authentication, authorization, tenant boundaries, credentials, sessions, uploads, and browser-facing security controls before optimizing implementation details.

## 2. Data Integrity and Queries (db)

**Impact:** CRITICAL  
**Description:** Preserve durable invariants, transaction boundaries, ownership, safe schema evolution, and explicit serialization while keeping queries bounded and relationship loading deliberate.

## 3. HTTP Boundaries and Lifecycle (http)

**Impact:** HIGH  
**Description:** Preserve routing, middleware, exception, validated-input, and public-response contracts throughout the request lifecycle.

## 4. Runtime Validation (validation)

**Impact:** HIGH  
**Description:** Convert untrusted input into explicit runtime contracts, distinguish optional and nullable values, and keep validation preflight separate from durable database guarantees.

## 5. Framework Architecture (core)

**Impact:** HIGH  
**Description:** Match installed v7 APIs, preserve request isolation, respect dependency injection and generated modules, and separate registration from runtime effects.

## 6. Production Reliability (ops)

**Impact:** HIGH  
**Description:** Deploy complete artifacts and operate jobs, caches, locks, storage, connections, and diagnostics with explicit ownership, visibility, durability, and lifecycle semantics.

## 7. Testing and Isolation (test)

**Impact:** HIGH  
**Description:** Exercise denial paths and isolate databases, storage, fakes, and process-wide substitutions without destructive cleanup reaching shared resources.

## 8. Rendering and Client Contracts (view)

**Impact:** MEDIUM-HIGH  
**Description:** Keep rendered output and client contracts safe through escaping, explicit browser-visible data, request-local SSR state, and runtime authorization independent of TypeScript types.
