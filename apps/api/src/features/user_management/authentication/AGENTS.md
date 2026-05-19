# apps/api/src/features/user_management/authentication KNOWLEDGE BASE

## OVERVIEW

Session authentication feature for login/logout plus custom auth, guest, and silent auth middleware.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Routes | `routes.ts` | `/auth/login` guest-only; `/auth/logout` authenticated. |
| Login controller | `controllers/login_with_credentials.controller.ts` | Validates credentials then delegates to service. |
| Logout controller | `controllers/logout.controller.ts` | Delegates to service. |
| Session service | `services/auth.service.ts` | Owns `auth.use("web").attempt/logout`. |
| Middleware | `middleware/*.ts` | Registered in `start/kernel.ts`. |
| Exceptions | `exceptions/*.ts` | Auth error codes consumed by clients. |

## CONVENTIONS

- Controllers stay thin and call `AuthService`.
- Login payload uses `UserCredentialsSchema` from `#validators/user.validator`.
- `guest_middleware.ts` throws `GuestOnlyException` when an authenticated user hits guest routes.
- `silent_auth_middleware.ts` runs globally in router middleware to populate auth state without forcing auth.

## ANTI-PATTERNS

- Do not duplicate session login/logout logic in controllers.
- Do not remove `silent_auth_middleware` from router middleware without checking guest/auth gate behavior.
- Do not change exception codes without updating web error-message mappings.

## NOTES

- Web login/logout hooks consume the `auth.loginWithCredentials` and `auth.logout` Tuyau paths.
- Middleware in this folder is globally or named-registered from `apps/api/start/kernel.ts`.
