---
title: Trust only the deployed proxy boundary
impact: CRITICAL
impactDescription: Client IP and protocol detection affect throttling, secure-cookie behavior, and URL construction
tags: [adonisjs, security]
---

# Trust only the deployed proxy boundary

Client IP and protocol detection affect throttling, secure-cookie behavior, and URL construction. Trust forwarded headers only from the actual reverse proxies, and prevent direct public access that bypasses that boundary. Reading a CDN-specific header unconditionally lets direct clients spoof their address.

## Incorrect

```ts
export const http = defineConfig({
  trustProxy: true,
  getIp(request) { return request.header('cf-connecting-ip')! },
})
```

## Correct

```ts
import { defineConfig } from '@adonisjs/core/http'
import proxyAddr from 'proxy-addr'
export const http = defineConfig({
  trustProxy: proxyAddr.compile(['127.0.0.1', '::1']),
})
```

## Caveats and versions

v7 example assumes the only trusted reverse proxy connects over loopback. Use actual deployed addresses/CIDRs, not this example blindly. Restrict ingress and have proxies overwrite untrusted forwarded headers. A custom getIp hook must verify the peer boundary before trusting a CDN header and otherwise fall back to originalFn(). Do not derive canonical external URLs or redirect targets from arbitrary Host input.

## References

- https://docs.adonisjs.com/guides/basics/request.md
- https://docs.adonisjs.com/guides/basics/response.md
