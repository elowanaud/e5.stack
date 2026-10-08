# packages/ui/react KNOWLEDGE BASE

## OVERVIEW

React 19 UI component package with Base UI wrappers, composite components, Tailwind 4 tokens, tailwind-variants, lucide icons, sonner toasts, and Storybook docs.

Scope: measured score 6; existing UI package boundary retained in update mode. Symbol density, exports, and reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Public exports | `package.json` | Exposes `components/*`, `icons`, and `hooks/*` directly from TypeScript source. |
| Storybook | `.storybook/main.ts`, `.storybook/preview.ts` | Centered layout, data-theme decorator, autodocs. |
| Global CSS | `src/globals.css` | Imports Tailwind and `@workspace/ui-theme/tailwind`. |
| Icons | `src/icons.ts` | Re-exports `lucide-react`. |
| Shared hook | `src/hooks/use-element-size.ts` | Used by input slot sizing. |
| Components | `src/components/*`, `src/components/AGENTS.md` | Folder-per-component implementation + barrel + story. |

## STRUCTURE

```text
src/components/button/
├── button.tsx
├── button.stories.tsx
└── index.ts
```

Component implementation details and the inventory live in `src/components/AGENTS.md`.

## CONVENTIONS

- Wrap Base UI primitives where useful; `toast`, `sidebar`, `card`, and `link` are composite/custom surfaces.
- Export public component APIs from `index.ts`; many components use `Object.assign(Root, { Sub })`.
- Type root props as primitive props plus `VariantProps<typeof variants>` when using `tv`.
- Styling uses Tailwind utility strings through `tv`/`cn`, data attributes, and theme token names.
- Stories colocate with components and use `Meta` / `StoryObj` from `@storybook/react-vite`.
- Component public imports should go through `@workspace/ui-react/components/<name>`.

## ANTI-PATTERNS

- Do not import implementation files from consumers; use package export subpaths.
- Do not bypass `src/globals.css` theme import in Storybook/app styling.
- `className?.toString()` appears in current components; preserve behavior unless intentionally cleaning it up.
- Check the password input composition and slot sizing before changing its input wrapper.

## COMMANDS

```bash
pnpm --filter @workspace/ui-react dev
pnpm --filter @workspace/ui-react typecheck
```

## NOTES

- There is no `build` script for this package today.
- Biome Tailwind class sorting is configured for `tv`.
- Storybook docs are the primary manual QA surface for components.
- `dev` uses Portless (`ui.e5`); `dev:app` launches Storybook.
- Component-folder rules live in `src/components/AGENTS.md`; keep package-level docs focused on exports/package behavior.
