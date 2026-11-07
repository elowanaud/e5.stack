# AdonisJS v7 Best Practices

An independent community skill containing 72 practical rules for AdonisJS v7 and its independently versioned ecosystem. Start with [SKILL.md](SKILL.md). This is not an official AdonisJS publication or endorsement.

## Structure

- `SKILL.md` — Agent entrypoint, compatibility guard, prioritized categories, and all rule identifiers
- `AGENTS.md` — Compiled guide containing every substantive rule
- `metadata.json` — Guide version, authorship, date, abstract, and official source sites
- `rules/` — Self-contained recommendations, one per file
  - `_sections.md` — Category order, prefixes, impacts, and descriptions
  - `_template.md` — Authoring template, not a substantive rule

There are no bundled documentation mirrors, scripts, runtime dependencies, or evaluation tools. Read individual rules for focused work or `AGENTS.md` for the complete guide. Rules link directly to official documentation; network access is needed only to consult those external sources.

## Compatibility

Use this skill only for AdonisJS v7. Inspect installed package versions and application conventions before choosing APIs. Lucid, VineJS, Edge, Japa, BentoCache, FlyDrive, Verrou, and other integrations have independent release numbers. A framework major does not guarantee a companion feature or codegen setup exists. Consult the rule's official URLs and installed declarations when versions differ; do not use a generated API manual for an older framework major as v7 evidence.

## Manual Authoring and Compiled Sync

1. Choose one of the eight prefixes in `rules/_sections.md`: `security-`, `db-`, `http-`, `validation-`, `core-`, `ops-`, `test-`, or `view-`.
2. Copy `rules/_template.md` to a descriptive `rules/<prefix><decision>.md` filename. Files beginning with `_` are authoring metadata, not rules.
3. Explain one actionable decision with incorrect/correct examples, the actual failure boundary, and necessary setup and version caveats. Keep the rule understandable without another local document. Link directly to specific official pages; do not copy a manual or invent quantitative impact claims.
4. Update `SKILL.md` with the identifier and a concise summary. Keep category names, ordering, and impacts aligned with `_sections.md`.
5. Manually synchronize `AGENTS.md`: preserve its introduction and metadata, group rules in section order, and include every substantive rule's title, impact, explanation, examples, caveats, and official URLs. Order rules alphabetically by filename within each category. Do not include `_sections.md` or `_template.md` as recommendations. Reflect any rule additions/removals in counts and the compiled table of contents.
6. Update `metadata.json` and the entrypoint version when publishing a revised guide. Keep dates and authorship truthful. Review the compiled text against the changed source rules; there is no bundled build or validation command.

Category impact guides reading order; individual rules retain their own severity. Security-sensitive view or validation rules can be critical even in a lower-ranked category. Apply rules only when relevant, without adding unnecessary architecture.

## Sources and Attribution

`metadata.json` lists official framework and ecosystem documentation sites. Individual rules identify the authoritative pages for each recommendation. Examples are guidance, not a promise of compatibility with every package release or proof of application behavior.

The skill is independently curated and retains no scraped documentation corpus. External documentation remains the work of its respective authors; linking to it grants no redistribution rights or endorsement. No upstream documentation license grant is asserted here.
