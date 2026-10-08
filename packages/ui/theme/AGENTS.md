# packages/ui/theme KNOWLEDGE BASE

## OVERVIEW

Theme token package where `src/tokens.ts` is the editable source of truth and `src/tailwind.css` is generated Tailwind 4 CSS.

Scope: existing distinct package boundary; retained in update mode. Reference centrality unmeasured.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Public exports | `package.json` | Exposes `./tokens` and `./tailwind`. |
| Token source | `src/tokens.ts` | Fonts plus color scales with light/dark values. |
| CSS generator | `scripts/generate-tailwind.js` | Validates token shape and writes CSS. |
| Generated CSS | `src/tailwind.css` | Checked in; do not edit manually. |
| Watch mode | `package.json` | `dev` watches `src/tokens.ts` and regenerates CSS. |
| Formatter scope | `biome.json` | Package-level Biome config. |

## CONVENTIONS

- Add/edit theme values in `src/tokens.ts`, then regenerate CSS.
- Use `pnpm --filter @workspace/ui-theme dev` while editing tokens for watch regeneration.
- Color token shape is `{ [scale]: { [step]: { light, dark } } }`.
- Fonts are string tokens under `fonts`.
- Generated CSS defines `@theme inline`, resets `--color-*`, emits light `:root`, dark `[data-theme="dark"]`, and reduced-motion rules.
- Consumers import `@workspace/ui-theme/tailwind` for CSS and `@workspace/ui-theme/tokens` for token data.

## ANTI-PATTERNS

- Do not edit `src/tailwind.css` manually.
- Do not add token values that fail generator validation: fonts must be strings; colors need both `light` and `dark` strings.
- Do not change export paths without checking `apps/frontend/src/styles/globals.css`, `packages/ui/react/src/globals.css`, and `apps/backend/start/view.ts`.

## COMMANDS

```bash
pnpm --filter @workspace/ui-theme generate:tailwind
pnpm --filter @workspace/ui-theme build
pnpm --filter @workspace/ui-theme dev
pnpm --filter @workspace/ui-theme typecheck
```

## NOTES

- `src/tokens.ts` concentrates the font and color scales; regenerate CSS after edits.
- `build` is just `pnpm generate:tailwind`.
- Web and Storybook visual output depend on regenerated CSS being current.
