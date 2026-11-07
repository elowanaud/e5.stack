---
title: Treat access tokens as opaque capabilities with bounded scope
impact: CRITICAL
impactDescription: The official access-tokens guard uses database-backed opaque tokens, not JWT claims
tags: [adonisjs, security]
---

# Treat access tokens as opaque capabilities with bounded scope

The official access-tokens guard uses database-backed opaque tokens, not JWT claims. Authenticate through the guard, restrict abilities and lifetime, and check token abilities in addition to resource authorization. Only release the plaintext token at issuance; never log or persist it as application plaintext.

## Incorrect

```ts
const token = request.header('authorization')!.split(' ')[1]
const claims = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString())
return { userId: claims.sub }
```

## Correct

```ts
// After validated credentials (User has an accessTokens provider):
const user = await User.verifyCredentials(email, password)
const token = await User.accessTokens.create(user, ['projects:read'], {
  expiresIn: '7 days',
  name: 'Read-only client',
})
return { type: 'bearer', value: token.value!.release() }
```

## Caveats and versions

v7 official opaque guard only; a custom JWT guard has a different contract. These scope/lifetime values are application policy, not mandatory official defaults (tokens do not expire by default). Protect consumers with the api guard, then check user.currentAccessToken.allows('projects:read') and resource permissions. Revoke through the owning user's provider; never grant arbitrary clients wildcard abilities.

## References

- https://docs.adonisjs.com/guides/auth/access-tokens-guard.md
