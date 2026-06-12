# Storybook Reference

## Scope
- Use this reference when adding, changing, or reviewing Storybook stories for shared React UI components.
- It covers story coverage, examples, controls, state coverage, accessibility-relevant cases, and manual QA expectations.
- Use it for colocated component stories, component examples, interactive state demos, and docs that explain public component usage.
- Keep component implementation rules in the React component reference. Keep design-token source, generated style output, and application route examples outside this reference.

## Workflow
- Start from the component public API. List the props, variants, subcomponents, and states a consumer needs to understand.
- Create a typed Storybook meta object for the public component surface, then define stories with typed story objects.
- Add controls only for useful public props. Hide internal implementation details, primitive internals, and callbacks that don't help manual review.
- Cover the default story first, then variants, composition examples, disabled or loading states, validation states, empty states, overflow states, and controlled examples when supported.
- Include accessibility-relevant examples for interactive components. Show labels, descriptions, error text, focusable triggers, keyboard-reachable content, and disabled behavior where the component owns them.
- Keep story render functions small and realistic. Use short sample data and clear labels that help reviewers understand the state under test.
- Use Storybook for manual QA before finishing UI package work. Open the stories, interact with controls, click and type through interactive states, and check keyboard navigation.

## Required Rules
- Every public React component needs a colocated Storybook story unless there is a documented reason it is not user-facing.
- Stories must import from the component public barrel, not from implementation files.
- Story metadata and stories must be typed with the active Storybook React types.
- Story names and examples must describe supported public behavior, not application-specific use cases.
- Controls must map to public props and variant values. Don't expose private implementation state as controls.
- At least one story must show the default supported usage.
- Components with variants must have story coverage for each supported variant family, either through controls, separate stories, or a compact matrix.
- Components with interaction must include accessibility-relevant states such as disabled, invalid, open, selected, checked, focused, empty, or overflow when those states apply.
- Manual QA notes for changed UI must be grounded in Storybook interaction, not static code inspection.

## Key Considerations
- Stories are both documentation and review fixtures. They should be stable enough for repeated manual QA.
- A good story shows how consumers should compose the public API. Avoid examples that require private imports or hidden setup.
- Controls are useful when they help compare variants quickly. Too many controls can hide the important state under noise.
- Accessibility examples should make required names, descriptions, keyboard paths, and error relationships visible to reviewers.
- Interactive stories should avoid brittle timing and side effects. Prefer deterministic local state.
- Story coverage should grow with the component contract. New public props, variants, or subcomponents need matching story updates.

## Examples
**Do**
```text
Add a typed Storybook meta for a React component, import from the public barrel, provide Default, Variant Matrix, Disabled, Invalid, and Composed stories, and verify the changed story with mouse and keyboard in Storybook.
```

**Don't**
```text
Create one story that imports private component files, hard-codes a single happy path, exposes internal callbacks as controls, and leaves keyboard and accessibility states untested.
```

## Anti-Patterns
- Treating Storybook as a screenshot gallery instead of an interactive manual QA surface.
- Importing implementation files in stories.
- Writing stories that depend on application data, routing, or network services.
- Adding a new variant without a story, control, or matrix entry that demonstrates it.
- Hiding disabled, invalid, empty, overflow, loading, selected, checked, or open states when the component supports them.
- Using story examples to prescribe visual design instead of documenting supported component behavior.
- Shipping component changes after only reading code, without opening and interacting with the relevant stories.
