# apps/backend/src/features/frontend/account_management/password KNOWLEDGE BASE

## OVERVIEW

Password recovery and authenticated password update feature using user tokens, queued mail jobs, and Edge/MJML mail templates.

Scope: existing distinct feature workflow; retained in update mode. Reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Routes | `routes.ts` | Guest `POST /frontend/account-management/password/forgot`, `POST /frontend/account-management/password/reset`; auth `PUT /frontend/account-management/password`. |
| Controllers | `controllers/*.controller.ts` | Forgot/reset/update handlers. |
| Workflow service | `services/password.service.ts` | Token verification, password updates, mail sending. |
| Token service | `../../../../services/otp.service.ts` | Redis OTP generation, one-use verification, and group revocation. |
| Jobs | `jobs/*.job.ts` | Dispatch reset/changed emails on queue `emails`. |
| Mail classes | `mails/*.mail.ts` | Build reset/changed emails. |
| Mail templates | `mails/*.html.edge` | Edge/MJML templates. |

## CONVENTIONS

- Forgot/reset routes are guest-only under `/frontend/account-management/password`.
- Update password route is authenticated under `/frontend/account-management/password`.
- Reset tokens use `OtpService<{ userId: number }>`: 32 alphanumeric characters, 15-minute expiry.
- Password schemas come from `#validators/user.validator`.

## ANTI-PATTERNS

- Do not casually rename `password_changed_notifiction.mail.ts`; current code references the typoed filename.
- Do not create password tokens without revoking existing tokens of the same type.
- Do not send password mail from controllers; keep mail orchestration in `PasswordService`.

## NOTES

- Reset/login links use `FRONTEND_URL`; authenticated password update logs out the web guard.
- Mail template filenames and mail class filenames are intentionally colocated for this feature.
