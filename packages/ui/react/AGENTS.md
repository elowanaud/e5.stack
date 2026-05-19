# packages/ui/react KNOWLEDGE BASE

## OVERVIEW

React 19 UI component package wrapping Base UI primitives with Tailwind 4 tokens, tailwind-variants, lucide icons, and Storybook docs.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Public exports | `package.json` | Exposes `components/*`, `icons`, `providers/*`, `hooks/*`. |
| Storybook | `.storybook/main.ts`, `.storybook/preview.ts` | Centered layout, data-theme decorator, autodocs. |
| Global CSS | `src/globals.css` | Imports Tailwind and `@workspace/ui-theme/tailwind`. |
| Icons | `src/icons.ts` | Re-exports `lucide-react`. |
| Shared hook | `src/hooks/use-element-size.ts` | Used by input slot sizing. |
| Components | `src/components/*` | Folder-per-component implementation + barrel + story. |

## STRUCTURE

```text
src/components/button/
├── button.tsx
├── button.stories.tsx
└── index.ts
```

Same shape applies to avatar, field, input, menu, password-input, sidebar, skeleton, spinner.

## CONVENTIONS

- Wrap Base UI primitives; re-export primitive namespaces where useful.
- Export public component APIs from `index.ts`; many components use `Object.assign(Root, { Sub })`.
- Type root props as primitive props plus `VariantProps<typeof variants>` when using `tv`.
- Styling uses Tailwind utility strings through `tv`/`cn`, data attributes, and theme token names.
- Stories colocate with components and use `Meta` / `StoryObj` from `@storybook/react-vite`.
- Component public imports should go through `@workspace/ui-react/components/<name>`.

## ANTI-PATTERNS

- Do not import implementation files from consumers; use package export subpaths.
- Do not bypass `src/globals.css` theme import in Storybook/app styling.
- `className?.toString()` appears in current components; preserve behavior unless intentionally cleaning it up.
- Password input has typo-ish internal state names; rename only with a focused cleanup.

## COMMANDS

```bash
pnpm --filter @workspace/ui-react dev
pnpm --filter @workspace/ui-react typecheck
```

## NOTES

- There is no `build` script for this package today.
- Biome Tailwind class sorting is configured for `tv`.
- Storybook docs are the primary manual QA surface for components.
