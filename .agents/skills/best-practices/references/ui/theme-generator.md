# UI Theme Generator Reference

## Scope
- INCLUDE: guidance for regenerating Tailwind theme CSS from shared tokens, reviewing generated output conceptually, and validating consumer facing theme behavior.
- INCLUDE: expectations for generated CSS guardrails, Tailwind integration, light and dark theme output, reduced motion output, and shared package boundaries.
- EXCLUDE: generator implementation design, helper scripts, and separate process reference docs.
- EXCLUDE: manual edits to generated CSS or application specific import paths.

## Workflow
- Step 1: Confirm token changes are complete in the editable token source before running the generator.
- Step 2: Run the theme package regeneration command or watch mode that produces the generated Tailwind CSS output.
- Step 3: Inspect the generated CSS at a docs level: it should declare Tailwind theme values, reset stale color variables, include light and dark theme values, and preserve global reduced motion rules.
- Step 4: Treat the generated CSS as a do-not-edit output. If the result is wrong, fix the tokens or generator behavior, then regenerate.
- Step 5: Validate the consuming UI surface that depends on the theme, especially component examples, dark theme behavior, focus states, contrast, and motion expectations.

## Required Rules
- Generated Tailwind CSS must be produced from the theme tokens and generator workflow. It must not be edited by hand.
- Regenerate after every token change that affects Tailwind theme output.
- Keep Tailwind integration centralized in the shared theme package boundary so consumers import theme CSS rather than copying token output.
- Do not create a separate process or theme reference domain for this guidance.
- Docs should explain generated output contracts without using application repository paths.
- Validation must include both the regeneration result and the user visible UI behavior that depends on it.

## Key Considerations
- The generated CSS is both an artifact and a contract. Consumers rely on the exported Tailwind theme variables staying consistent.
- Generator validation should fail before producing bad output when token shapes are incomplete.
- Tailwind theme output should preserve font variables, color variables, dark theme variants, and reduced motion behavior.
- A clean regeneration with no expected diff can be valid, but it should still be intentional and documented in review notes.
- When a generator change affects output shape, review package exports and consumer expectations before merging the documentation or implementation change.

## Examples
**Do**
```text
After changing shared color tokens, regenerate the Tailwind theme CSS, confirm the generated output is marked do-not-edit, and verify component examples still render correctly in light and dark themes.
```

**Don't**
```text
Patch the generated CSS directly, skip regeneration, and ask consumers to copy the patched variables into their own styles.
```

## Anti-Patterns
- Treating the generated Tailwind CSS as editable source.
- Changing generator behavior without reviewing the exported theme contract.
- Regenerating output without checking whether Tailwind variables, dark theme values, or reduced motion rules changed unexpectedly.
- Moving theme generator guidance into a standalone theme or process reference area.
- Naming application repository paths in runtime reference docs.
