---
title: "Keep untrusted Edge output escaped and preserve context boundaries"
impact: CRITICAL
impactDescription: "Edge double braces HTML-escape output; triple braces and html.safe deliberately bypass that protection"
tags: view, edge
---

# Keep untrusted Edge output escaped and preserve context boundaries

**Impact: CRITICAL**

## Rationale

Edge double braces HTML-escape output; triple braces and html.safe deliberately bypass that protection. Stored user content is still untrusted. Keep normal content escaped and reserve raw HTML for audited trusted template output or content sanitized by an established policy.

## Incorrect

```ts
// Partial controller action.
return view.render('comments/show', { comment })
```

```edge
{{-- resources/views/comments/show.edge --}}
<div>{{{ comment.body }}}</div>
```

## Correct

```ts
// Same controller can safely pass plain text without manufacturing HTML.
return view.render('comments/show', { body: comment.body })
```

```edge
<div>{{ body }}</div>
```

## Applicability and caveats

Current v7 documentation; verify the independently versioned package in the target app.

HTML escaping does not make an attacker-controlled javascript: URL safe or safely encode arbitrary JavaScript/CSS contexts. Validate URL schemes and avoid interpolating untrusted data into inline scripts. Raw rendering of trusted framework slots is different from raw user input. Do not invent a sanitizer or treat a TypeScript string brand as sanitization. Keep Shield/CSRF/CSP protections appropriate to the app; escaping does not replace them.

## Sources

- https://docs.adonisjs.com/guides/frontend/edgejs.md
- https://edgejs.dev/docs/syntax_specification
