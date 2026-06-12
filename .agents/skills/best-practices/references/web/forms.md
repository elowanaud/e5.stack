# Web Forms Reference

## Scope
- INCLUDE: TanStack Form wrapper usage, field wiring, validation, submit handling, submission state, and reusable form components.
- INCLUDE: Decisions about default values, client validation, server error mapping, and form hook composition.
- EXCLUDE: Mutation cache invalidation details, route redirects, API validators, and shared UI component implementation.
- EXCLUDE: Browser-only validation that bypasses the app form wrapper.

## Workflow
- Step 1: Create a feature form hook with the app TanStack Form wrapper and typed default values.
- Step 2: Wire fields through the app field components so labels, errors, descriptions, and controls share one pattern.
- Step 3: Put schema or field validators in the form hook, close to default values and submission logic.
- Step 4: Submit through the matching mutation hook from `onSubmit`, and keep submit buttons bound to form submission state.
- Step 5: Map API validation failures to field errors or form-level messages in the form boundary.

## Required Rules
- Use the app `useAppForm` wrapper instead of calling TanStack Form primitives directly in feature code.
- Keep form components presentational. The hook should own defaults, validators, submit behavior, and mutation calls.
- Use app field components for field rendering so accessible labels, errors, and layout stay consistent.
- Prevent native form submission in the component and call the TanStack Form submit handler.
- Disable or mark submit actions while submission is pending. Don't allow double-submit paths.
- Keep client validation consistent with the server contract, but don't duplicate server-only rules that depend on trusted backend state.
- Keep translated labels, descriptions, and error copy in the relevant i18n namespace.

## Key Considerations
- The form hook is the boundary between UI fields and domain actions. It should be easy to test without rendering the whole route.
- Default values should match the shape expected by the mutation. Avoid optional field drift between form state and API input.
- Cross-field validation belongs in the form hook, not in individual input components.
- Field components should receive field state from TanStack Form instead of deriving errors from unrelated local state.
- Submission state should reflect both form validation and mutation progress when the mutation is async.
- Server validation errors should keep users on the form with clear field-level feedback when a field caused the error.

## Examples
**Do**
```tsx
const form = useAppForm({
	defaultValues,
	validators: { onSubmit: schema },
	onSubmit: async ({ value }) => updateMutation.mutateAsync({ body: value }),
});

<form.AppField name="email">
	{(field) => <field.TextField label={t("email.label")} />}
</form.AppField>
```

**Don't**
```tsx
const [email, setEmail] = useState("");

<input value={email} onChange={(event) => setEmail(event.target.value)} />
<button onClick={() => fetchUpdate({ email })}>Save</button>
```

## Anti-Patterns
- Splitting a form between TanStack Form state and local `useState` for the same fields.
- Rendering inputs without the app field components when the field needs labels or errors.
- Putting mutation cache invalidation inside the visual form component.
- Letting a pending mutation submit again because the button ignores submission state.
- Hard-coding French copy in JSX instead of using i18n keys.
