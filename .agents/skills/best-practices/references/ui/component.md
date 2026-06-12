# React Component Reference

## Scope
- Use this reference when adding, changing, or reviewing shared React components.
- It covers component folder shape, component API design, prop typing, public exports, composition, accessibility, variant styling, hooks boundaries, icons boundaries, and manual QA for UI package work.
- Use it for reusable component code, component barrels, primitive wrappers, compound component APIs, and component-level behavior.
- Keep design-token source, generated style output, build configuration, and application integration guidance outside this reference.

## Workflow
- Start by identifying the public component surface. Decide which root component, subcomponents, primitive aliases, and prop types are intended for consumers.
- Keep the implementation local to the component folder. Put reusable component behavior in the component file, public exports in the barrel, and examples in the colocated Storybook story.
- Model the React API before styling. Confirm controlled and uncontrolled behavior, composition points, forwarded attributes, children behavior, and event handlers.
- Type props from the underlying primitive or native element when one exists. Add variant prop types from the variant definition instead of widening them by hand.
- Style through existing utility and variant patterns. Keep variants small, named by behavior or state, and easy to combine with consumer class names.
- Check accessibility while coding. Confirm semantic roles, labels, keyboard flow, focus handling, disabled states, error states, and screen-reader text where the component owns them.
- Finish with Storybook-driven manual QA. Exercise the documented stories, variants, states, keyboard paths, and accessibility-relevant cases before calling the component ready.

## Required Rules
- Every public React component must have a component file, an index barrel, and a colocated Storybook story unless the component is intentionally internal.
- Consumers must import from the public barrel, not from implementation files.
- The barrel must export only the intended public API: component object, named subcomponents, public prop types, and approved primitive aliases.
- Compound components should expose subcomponents from the root component when that is the established API shape.
- Prop types must preserve the underlying element or primitive contract. Don't replace a precise primitive prop type with a loose object type.
- Variant props must be derived from the variant definition when variants exist.
- Styling must stay component-local and composable. Preserve `className` composition unless a component contract explicitly forbids it.
- Components that render interactive UI must support keyboard use, visible focus, accessible names, disabled behavior, and correct state attributes.
- Hooks belong in the hooks surface only when they are reusable outside one component. Component-private hooks stay private.
- Icons belong behind the icon surface or a component API. Don't make consumers reach into an implementation detail to render an icon.
- Manual QA for UI package work must use Storybook as the real surface. Open the story, interact with it, and verify the changed states by sight and keyboard.

## Key Considerations
- React components should expose the smallest stable API that covers real composition needs. Prefer children and subcomponents over many narrowly scoped props.
- Primitive wrappers should keep primitive behavior intact. Add styling, naming, and composition, but don't hide required accessibility contracts.
- Variant names should describe component intent, such as size, tone, orientation, or interactive state. They should not encode one application use case.
- Accessibility requirements differ by component. A visual wrapper may only need semantic passthrough, while dialogs, menus, comboboxes, and tabs need focus and keyboard checks.
- Public exports are a compatibility boundary. Removing or renaming an export is a breaking change for consumers.
- Storybook stories are part of the review surface. If a prop or state matters enough to support, it usually needs a story or story control.

## Examples
**Do**
```text
Create a React component with a local implementation file, an index barrel that exports Component, ComponentProps, and approved primitive aliases, typed variants from the variant definition, and stories for default, variant, disabled, and composed states.
```

**Don't**
```text
Export an implementation file directly, type props as any, add ad hoc variant strings that bypass the component variant definition, and rely on an application page as the only manual QA surface.
```

## Anti-Patterns
- Adding a component folder without a public barrel.
- Exporting private helpers, local state hooks, or implementation-only primitives from the public API.
- Recreating native or primitive prop contracts by hand instead of extending the source type.
- Adding variants that only serve one screen or one temporary layout.
- Styling with non-composable classes that ignore `className` when the component should allow composition.
- Shipping interactive React UI without keyboard, focus, label, and disabled-state checks.
- Treating Storybook as optional after changing a shared component.
