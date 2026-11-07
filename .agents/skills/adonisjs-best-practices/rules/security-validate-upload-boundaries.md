---
title: Restrict multipart routes and validate files before storage
impact: CRITICAL
impactDescription: Multipart parsing can consume disk before the controller authenticates a user
tags: [adonisjs, security]
---

# Restrict multipart routes and validate files before storage

Multipart parsing can consume disk before the controller authenticates a user. Only auto-process routes that accept uploads, bound request sizes, and validate size/type before moving files. A filename extension or a client-supplied Content-Type alone is not a sufficient file policy.

## Incorrect

```ts
const avatar = request.file('avatar')!
await avatar.moveToDisk(avatar.clientName)
```

## Correct

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

## Caveats and versions

v7 with Drive installed. In config/bodyparser.ts restrict multipart.autoProcess to intended route patterns, such as ['/profile/avatar'], and configure parser limits for the deployment. File validation uses magic-number detection where supported; it is not antivirus scanning or proof that active content is safe to render inline. Bound file counts/aggregate upload resources too. Use import { randomUUID } from node:crypto instead of crypto.randomUUID if that is the project convention.

FlyDrive's filesystem driver ignores per-file visibility options and reports the disk-configured visibility. Passing `{ visibility: 'private' }` when uploading to a public filesystem disk does not make that file private. Local confidentiality depends on the disk configuration and every path that can serve its files, not a per-upload flag.

## References

- https://docs.adonisjs.com/guides/basics/file-uploads.md
- https://docs.adonisjs.com/guides/basics/body-parser.md
- https://docs.adonisjs.com/guides/digging-deeper/drive.md
- https://flydrive.dev/docs/services/fs
