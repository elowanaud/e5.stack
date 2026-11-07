---
title: "Log structured request context and redact secrets at known paths"
impact: HIGH
impactDescription: "Structured logs preserve request correlation and error details without dumping credentials or private payloads"
tags: ops, logging
---

# Log structured request context and redact secrets at known paths

**Impact: HIGH**

## Rationale

Structured logs preserve request correlation and error details without dumping credentials or private payloads. Redaction operates on object paths, not arbitrary strings; once a token is interpolated into a message it cannot be reliably removed by key-based redaction.

## Incorrect

```ts
logger.info(`Authorization: ${request.header('authorization')}`)
logger.error(JSON.stringify(request.all()))
```

## Correct

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

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

Select redact paths from the actual log-object shape; they are case-sensitive, not universal secret detection. Merge the fragment into existing logger configuration instead of replacing it. Do not derive paths from user input. Prefer allowlisted identifiers over complete bodies, sessions, mail content, released Secret values, signed URLs or queue payloads. Capture structured stdout in production; do not enable raw SMTP content debugging. Redaction for logs does not automatically redact tracing attributes or external SDK telemetry.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/logger.md
- https://docs.adonisjs.com/guides/basics/http-context.md
- https://raw.githubusercontent.com/pinojs/pino/main/docs/redaction.md
- https://nodemailer.com/smtp
