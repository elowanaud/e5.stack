---
title: Authorize stored objects and keep paths server-controlled
impact: CRITICAL
impactDescription: Do not let a request choose an arbitrary filesystem path or object key for downloading, deleting, overwriting, or signing
tags: [adonisjs, security]
---

# Authorize stored objects and keep paths server-controlled

Generate upload keys on the server and persist them on an authorized record. Never let a request choose arbitrary paths or keys for downloading, signing, deleting, or overwriting. Resolve the stored key through ownership checks before issuing a short-lived signed URL, and configure genuinely private storage.

## Incorrect

```ts
const url = await drive.use().getSignedUrl(request.input('key'))
return { url }
```

## Correct

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

## Caveats and versions

Use the installed v7 Drive integration and verify its independently versioned FlyDrive/driver APIs. Objects must not also be reachable through a public bucket or static route: signing cannot repair public visibility. Signed URLs are bearer capabilities until expiry; do not log them.

Never use `clientName` as a path or expose `tmpPath`. For direct uploads, issue server-generated scoped keys and verify ownership, completion, and uploaded content server-side before accepting a completion claim; signing is not validation. Multipart validation belongs to Adonis HTTP uploads, not Drive. Store durable files in cloud storage or a persistent location outside replaceable build directories.

## References

- https://docs.adonisjs.com/guides/digging-deeper/drive.md
- https://docs.adonisjs.com/guides/basics/file-uploads.md
- https://docs.adonisjs.com/guides/auth/authorization.md
- https://flydrive.dev/docs/introduction
- https://docs.adonisjs.com/deployment.md
