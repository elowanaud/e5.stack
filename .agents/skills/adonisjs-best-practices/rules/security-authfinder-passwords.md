---
title: Use AuthFinder credential verification and one hashing owner
impact: CRITICAL
impactDescription: Naive lookup-then-verify returns earlier for nonexistent users and permits account enumeration through timing
tags: [adonisjs, security]
---

# Use AuthFinder credential verification and one hashing owner

Naive lookup-then-verify returns earlier for nonexistent users and permits account enumeration through timing. For unknown users, AuthFinder calls `hashFactory().make(password)` to perform expensive hashing work that mitigates timing differences; for existing users, it verifies the supplied password against the stored hash. It also hashes changed passwords on model saves. Avoid duplicating that hook or bypassing it with bulk updates.

## Incorrect

```ts
const user = await User.findBy('email', email)
if (!user) return response.unauthorized('Unknown email')
if (!(await hash.verify(user.password, password))) {
  return response.unauthorized('Wrong password')
}
```

## Correct

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

## Caveats and versions

v7. User composes its actual generated schema export with withAuthFinder(hash), or the documented configured hasher callback. The primary Lucid schema-generation guide names the users-table export UsersSchema; some framework overview/auth examples use UserSchema. Inspect database/schema.ts rather than assuming either spelling. Controller excerpt assumes imported validators and validated currentPassword/newPassword. The current credential guide documents user.validatePassword(currentPassword) as throwing a validation error on mismatch. Model hooks do not run on raw query-builder updates. Use the hash service for non-AuthFinder storage, not reversible encryption. Keep generic credential errors and pair with rate limits.

## References

- https://docs.adonisjs.com/guides/auth/verifying-user-credentials.md
- https://docs.adonisjs.com/guides/security/hashing.md
- https://lucid.adonisjs.com/docs/schema-generation
- https://github.com/adonisjs/auth/blob/10.x/src/mixins/lucid.ts
