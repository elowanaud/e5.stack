---
name: best-practices
description: Route planning, analysis, review, and edits for e5.stack code through stack-specific best-practice references. Use this skill when a task may touch documented project standards, then load every active reference that matches the task surface before acting.
---

# Best Practices

Use this skill as the thin router for repo-specific implementation standards. Match the task
surface to the domain sections below, load all active references that apply, and let those
references shape the plan, review, and edits.
- Read every matching active reference before planning, analyzing, reviewing, or editing.
- When multiple entries match, load each one; when none match, continue without a reference.
- `_template.md` is an authoring scaffold only, not runtime guidance.
- Runtime references must stay stack-specific generic: no application repo file paths inside
  reference docs, mostly prose rules, and minimal snippets only when prose is insufficient.

### API references
| Reference | Call it when |
| --- | --- |
| `references/api/controller.md` | The task touches AdonisJS API controllers, generated controller imports, controller routes, route middleware that defines controller access, Tuyau-facing controller contracts, or Japa controller tests. |
| `references/api/policy.md` | The task touches Bouncer policies, authorization checks, ownership rules, access denials, or controller and service boundaries for permissions. |
| `references/api/validation.md` | The task touches request validators, input normalization, validation error behavior, or controller contracts that depend on validated data. |
| `references/api/service.md` | The task touches API domain services, business workflows, transaction boundaries, reusable orchestration, or side-effect coordination. |
| `references/api/job.md` | The task touches queued jobs, job payloads, queue names, retry behavior, or background side effects. |
| `references/api/mail.md` | The task touches mail classes, mail rendering data, notification content, queued mail delivery, or mail tests. |
| `references/api/presenter.md` | The task touches response presenters, JSON response shape, serialization, or API output contracts. |
| `references/api/testing.md` | The task touches Japa tests, controller e2e coverage, unit tests, fixtures, assertions, or test isolation. |
| `references/api/model.md` | The task touches Lucid models, model serialization, relationships, hooks, casts, or auth-related model behavior. |
| `references/api/migration.md` | The task touches database migrations, schema changes, indexes, constraints, or rollback-safe data structure changes. |
| `references/api/factory.md` | The task touches model factories, test data builders, states, relations, or fake data for API tests. |

### Web references
| Reference | Call it when |
| --- | --- |
| `references/web/routes.md` | The task touches TanStack Start routes, route layouts, loaders, redirects, route groups, or navigation behavior. |
| `references/web/client.md` | The task touches the Tuyau client, typed API calls, query options, request contracts, or client-side API error handling. |
| `references/web/forms.md` | The task touches TanStack Form setup, form fields, validation wiring, submission state, or reusable form components. |
| `references/web/mutations.md` | The task touches TanStack Query mutations, cache invalidation, optimistic updates, mutation errors, or post-mutation navigation. |
| `references/web/i18n.md` | The task touches translation keys, locale source files, compiled locale output expectations, or user-facing copy. |

### UI references
| Reference | Call it when |
| --- | --- |
| `references/ui/component.md` | The task touches shared React UI components, component APIs, composition, variants, accessibility, or exported component contracts. |
| `references/ui/storybook.md` | The task touches Storybook stories, examples, controls, visual states, or shared UI component documentation. |
| `references/ui/theme-tokens.md` | The task touches design tokens, semantic color or spacing values, font tokens, or token naming. |
| `references/ui/theme-generator.md` | The task touches generated theme CSS behavior, token-to-CSS generation, Tailwind integration, or theme package outputs. |
