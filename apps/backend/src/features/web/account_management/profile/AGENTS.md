# apps/backend/src/features/web/account_management/profile KNOWLEDGE BASE

## OVERVIEW

Authenticated profile view/update/delete feature with policy checks, user presentation, and queued account-deleted mail.

Scope: existing distinct feature workflow; retained in update mode. Reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Routes | `routes.ts` | Authenticated `GET`, `PUT`, `DELETE /web/account-management/profile`. |
| Controllers | `controllers/*.controller.ts` | View/update/delete handlers with policy checks. |
| Workflow service | `services/profile.service.ts` | Deletes current user, dispatches mail job, logs out web guard. |
| Policies | `policies/*.policy.ts` | Bouncer gates for view/update/delete. |
| Job | `jobs/send_account_deleted_notification.job.ts` | Queue `emails`; sends account-deleted mail. |
| Mail | `mails/account_deleted_notification.*` | Mail class plus Edge/MJML template. |

## CONVENTIONS

- Routes use `middleware.auth({ guards: ["web"] })` at group level.
- View/update responses use `UserPresenter` to control user shape.
- Delete flow lives in `ProfileService.delete()` so mail dispatch and logout stay together.
- Update payload uses `UpdateUserSchema` from `#validators/user.validator`.

## ANTI-PATTERNS

- Do not return raw user data when presenter/toJSON shape matters.
- Do not delete accounts directly in controllers; keep side effects in `ProfileService`.
- Do not remove profile cache invalidation on the web consumer when changing route names.

## NOTES

- Delete returns `null` after service completion.
- Account-deleted notification runs after `user.delete()` through the queue job.
