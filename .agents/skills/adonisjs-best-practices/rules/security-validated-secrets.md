---
title: Validate secrets at startup and keep configuration server-side
impact: CRITICAL
impactDescription: Required secrets should fail startup when absent instead of silently using an insecure fallback
tags: [adonisjs, security]
---

# Validate secrets at startup and keep configuration server-side

Required secrets should fail startup when absent instead of silently using an insecure fallback. Define validated environment fields and consume them in configuration. Keep APP_KEY secret, stable within an environment, and distinct across environments; never return the full configuration tree or bundle secrets into frontend code.

## Incorrect

```ts
const paymentKey = process.env.PAYMENT_KEY || 'development-secret'
router.get('/debug/config', () => process.env)
```

## Correct

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

## Caveats and versions

v7. Merge PAYMENT_KEY into the existing Env.create schema; do not replace the other startup fields. Prefer Env.schema.secret() where the consuming API supports the Secret wrapper, release only at the required boundary. Do not commit real .env files or add secrets to generated client manifests. Rotation affects sessions/encrypted data; plan it rather than generating a new APP_KEY at every boot.

## References

- https://docs.adonisjs.com/configuration.md
- https://docs.adonisjs.com/guides/digging-deeper/logger.md
