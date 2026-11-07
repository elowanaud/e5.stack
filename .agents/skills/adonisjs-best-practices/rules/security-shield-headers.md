---
title: Configure browser security headers without discarding existing guards
impact: HIGH
impactDescription: Shield guards omitted from configuration are disabled
tags: [adonisjs, security]
---

# Configure browser security headers without discarding existing guards

Shield guards omitted from configuration are disabled. Preserve protections when adding one option and tailor CSP to the actual assets rather than disabling it to fix one blocked script. Enable HSTS only after HTTPS readiness; protect against framing and MIME sniffing too.

## Incorrect

```ts
// Replacing the entire Shield config to fix an asset problem:
export default defineConfig({ csp: { enabled: false } })
```

## Correct

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

## Caveats and versions

v7 config excerpt: retain the existing csrf block as well. CSP sources/nonces must match templates and the stack, including required Vite/Inertia assets. DENY is inappropriate for intentional embedding; use a reviewed policy. HSTS persists in browsers; only include subdomains when they all support HTTPS. Report-only CSP does not enforce protection.

## References

- https://docs.adonisjs.com/guides/security/securing-ssr-applications.md
