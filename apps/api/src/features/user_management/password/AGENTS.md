# apps/api/src/features/user_management/password KNOWLEDGE BASE

## OVERVIEW

Password recovery and authenticated password update feature using user tokens and mail templates.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Routes | `routes.ts` | Guest `/auth/forgot-password`, `/auth/reset-password`; auth `/profile/password`. |
| Controllers | `controllers/*.controller.ts` | Forgot/reset/update handlers. |
| Workflow service | `services/password.service.ts` | Token verification, password updates, mail sending. |
| Token service | `../../../services/user_token.service.ts` | Generate/verify/revoke token lifecycle. |
| Mail classes | `mails/*.mail.ts` | Build reset/changed emails. |
| Mail templates | `mails/*.html.edge` | Edge/MJML templates. |

## CONVENTIONS

- Forgot/reset routes are guest-only and share `/auth` prefix.
- Update password route is authenticated and mounted under `/profile` as `profile.updatePassword`.
- Token type comes from `UserTokenType` in `src/models/user_token.ts`.
- Password schemas come from `#validators/user.validator`.

## ANTI-PATTERNS

- Do not casually rename `password_changed_notifiction.mail.ts`; current code references the typoed filename.
- Do not create password tokens without revoking existing tokens of the same type.
- Do not send password mail from controllers; keep mail orchestration in `PasswordService`.

## NOTES

- Reset links depend on app URL/env configuration read by `PasswordService`.
- Mail template filenames and mail class filenames are intentionally colocated for this feature.
