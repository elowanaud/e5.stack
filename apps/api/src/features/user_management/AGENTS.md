# apps/api/src/features/user_management KNOWLEDGE BASE

## OVERVIEW

User account domain split into authentication, password, and profile feature modules.

## STRUCTURE

```text
user_management/
├── authentication/       # login/logout, auth guards, auth exceptions
├── password/             # forgot/reset/update password, token mail flow
└── profile/              # view/update/delete authenticated profile
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Login/logout | `authentication/` | Session auth service and guard middleware. |
| Password reset/update | `password/` | Uses `UserTokenService`, mailer, env app URL. |
| Current user profile | `profile/` | Requires auth middleware with web guard. |
| Shared user payloads | `../../validators/user.validator.ts` | Imported by password/profile controllers. |
| User model shape | `../../models/user.ts` | `toJSON()` controls API user response. |

## CONVENTIONS

- Route groups use route names matching Tuyau client paths: `auth.*`, `profile.*`.
- Authenticated routes use `middleware.auth({ guards: ["web"] })` when guard specificity matters.
- Guest-only auth/password routes use `middleware.guest()`.
- Keep feature-specific exceptions inside the feature folder.

## ANTI-PATTERNS

- Do not move feature controllers to `src/controllers`; the generated registry indexes them from `src`.
- Do not return raw `User` instances when profile/user JSON shape matters; use `user.toJSON()`.
- Do not rename route groups without checking the web Tuyau consumers.
