# UI Theme Tokens Reference

## Scope
- INCLUDE: guidance for Tailwind theme token source of truth decisions, token naming, semantic color scales, font tokens, and token review.
- INCLUDE: decisions about whether a value belongs in shared theme tokens or remains local to a component or consuming app.
- EXCLUDE: editing generated CSS output, generator implementation details, and application specific styling decisions.
- EXCLUDE: standalone theme domain guidance. Theme token references live with shared UI guidance.

## Workflow
- Step 1: Start from the editable token source and identify whether the change is a new shared token, an update to an existing token, or a local style that should stay outside the theme package.
- Step 2: Name tokens by their design role first, then by scale or variant. Prefer stable semantic names such as neutral, primary, success, warning, error, or info before adding raw brand or one off names.
- Step 3: Keep color scales complete across light and dark values, and keep font tokens as reusable named font stacks.
- Step 4: Regenerate the generated Tailwind CSS after token edits and inspect the resulting token surface at a docs level before asking consumers to use it.
- Step 5: Validate that the token change is visible through the shared UI surface that needs it, without documenting application specific paths.

## Required Rules
- The editable token source is the source of truth for Tailwind theme values. Do not patch generated CSS to change tokens.
- Generated Tailwind CSS is a do-not-edit output. Treat it as a checked result produced from tokens.
- Token names must describe durable design intent, not a single page, feature, campaign, or temporary visual tweak.
- Color tokens must keep paired light and dark values for every scale step the generator expects.
- Font tokens must remain named string stacks that can be reused by UI consumers.
- Keep theme guidance inside the UI reference area. Do not create a separate theme reference domain.

## Key Considerations
- Semantic tokens are safest when they describe purpose, such as success or warning, rather than the literal color value.
- Scale based colors should stay predictable across families so component variants can map steps consistently.
- A token promoted to the theme package becomes a shared package contract. Check that more than one UI surface can reasonably use it, or keep the value local.
- Updating a token can change many components at once. Review contrast, dark theme behavior, disabled states, focus states, and any Storybook or visual examples that rely on the token.
- Runtime docs should describe the package boundary and validation expectations without naming application repository paths.

## Examples
**Do**
```text
Add a semantic color family with complete light and dark scale values, regenerate the generated Tailwind CSS, then verify the affected component examples still show the intended contrast.
```

**Don't**
```text
Add a single page color token named after one feature, patch generated CSS by hand, and skip dark theme review.
```

## Anti-Patterns
- Treating generated Tailwind CSS as the place to fix a token mistake.
- Naming tokens after implementation details, routes, screens, or temporary campaigns.
- Adding a light value without the matching dark value expected by the token model.
- Promoting one off component spacing, colors, or fonts into shared tokens before they prove reusable.
- Documenting application repository paths instead of reusable UI package rules.
