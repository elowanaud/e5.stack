## Why the change

Locale bundles need to stay synchronized during both web builds and development without relying on a separate watcher process.

## Special things to note

- The merger is also exposed as a CLI so locale generation can run outside Vite.
- The existing locale compilation scripts remain available; this change only moves the default web development path to the Vite plugin.

## Change outline

The workspace package owns locale discovery, merging, CLI parsing, and Vite lifecycle integration.

```text
packages/i18next-merger/
├── src/core.ts       # merges locale JSON files into one bundle per locale
├── src/cli.ts        # exposes the merger as i18next-merger
└── src/vite.ts       # runs merges on build and locale file changes

apps/web/
├── package.json      # depends on the workspace package and simplifies dev startup
└── vite.config.ts    # configures French locale inputs and generated output
```

Builds and development now share the same merge path.

```diff
 web build or dev server
   Vite loads i18nextMerger({ locales, glob, outputDir })
+    buildStart
+      merge matching locale files
+      write one generated JSON bundle per locale
+    configureServer
+      watch matching locale files
+      merge again on add, change, or unlink
```
