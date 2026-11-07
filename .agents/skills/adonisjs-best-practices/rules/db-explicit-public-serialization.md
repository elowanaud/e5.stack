---
title: "Allowlist public fields instead of exposing model state"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Allowlist public fields instead of exposing model state

**Impact: CRITICAL**

**API baseline:** AdonisJS 7 core transformers; confirm installed package APIs and model types. No Lucid schema generation required.

Return an allowlisted representation so new model columns cannot silently expose credentials or internal flags. Reuse the application's existing serializers/transformers rather than creating a parallel convention. Authentication alone is not permission to expose private fields.

## Incorrect

```ts
return { ...user.toAttributes() }
// Raw extraction/spreading bypasses the intended public representation.
```

## Correct

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

## Caveats

A small endpoint can instead return a plain projection such as `{ id: user.id, fullName: user.fullName }`; transformers are not mandatory. Keep public and private variants explicitly allowlisted, never selected by a client-supplied field list. Review nested relations, `$extras`, and pivot values separately; transformers read already-loaded relations, so preload deliberately. Lucid's `serializeAs: null` hides a column during model serialization, but raw `$attributes` or `toAttributes()` extraction bypasses that protection. Spreading a model also exposes ORM state rather than a deliberate DTO.

## Official sources

- https://docs.adonisjs.com/guides/frontend/transformers.md
- https://lucid.adonisjs.com/docs/serializing-models
- https://docs.adonisjs.com/guides/auth/session-guard.md
- https://docs.adonisjs.com/guides/basics/response.md
- https://docs.adonisjs.com/guides/auth/verifying-user-credentials.md
