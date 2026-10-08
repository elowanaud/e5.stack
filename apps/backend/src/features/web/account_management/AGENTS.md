# apps/backend/src/features/web/account_management KNOWLEDGE BASE

## OVERVIEW

User account domain split into authentication, password, and profile feature modules. Routes are exposed under `/web/account-management/*` and consumed through Tuyau paths.

## STRUCTURE

```text
account_management/
├── authentication/       # login/logout, auth guards, auth exceptions
├── password/             # forgot/reset/update password, token mail flow
└── profile/              # view/update/delete authenticated profile
```

Scope: existing distinct feature workflow; retained in update mode. Reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Login/logout | `authentication/` | Session auth service; routes prefix `/web/account-management/authentication`. |
| Password reset/update | `password/` | Uses Redis `OtpService`, queued mail, and `FRONTEND_URL`; routes prefix `/web/account-management/password`. |
| Current user profile | `profile/` | View/update/delete profile; routes prefix `/web/account-management/profile`. |
| Shared user payloads | `../../../validators/user.validator.ts` | Imported by password/profile controllers. |
| User model shape | `../../../models/user.ts`, `../../../presenters/user.presenter.ts` | `UserPresenter` controls profile responses. |

## CONVENTIONS

- Route groups use names matching Tuyau client paths: `web.account_management.authentication.*`, `web.account_management.password.*`, `web.account_management.profile.*`.
- Authenticated routes use `middleware.auth({ guards: ["web"] })` when guard specificity matters.
- Guest-only auth/password routes use `middleware.guest()`.
- Keep feature-specific exceptions inside the feature folder.
- Keep profile deletion mail orchestration in the profile service/job pair.

## ANTI-PATTERNS

- Do not move feature controllers to `src/controllers`; the generated registry indexes them from `src`.
- Use `UserPresenter` for profile responses; do not expose the raw model shape.
- Do not rename route groups without checking the web Tuyau consumers.
