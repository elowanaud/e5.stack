# Docs App Notes

- TanStack Start app dedicated to public documentation.
- Keep it decoupled from `@workspace/api`; do not add Tuyau, auth, or private app dependencies without an explicit product decision.
- Documentation content lives in `content/docs`.
- Fumadocs MDX generates `.source/**`; treat it as generated.
- TanStack Router generates `src/routeTree.gen.ts`; treat it as generated.
- Keep the app statically deployable. Server route handlers must be prerenderable.
