## Why the change

Locale bundles need to stay synchronized during both web builds and development without relying on a separate watcher process.

## Special things to note

- The merger is also exposed as a CLI so locale generation can run outside Vite.
- The legacy locale compiler and watcher scripts are removed; postinstall now runs the new merger CLI.
- `dev:app2` remains in `apps/web/package.json` but still references the removed `i18n:dev` script.

## Change outline

The workspace package owns locale discovery, merging, CLI parsing, and Vite lifecycle integration.

```text
packages/i18next-merger/
├── src/core.ts       # merges locale JSON files into one bundle per locale
├── src/cli.ts        # exposes the merger as i18next-merger
└── src/vite.ts       # runs merges on build and locale file changes

apps/web/
├── package.json               # uses the merger for postinstall and Vite-only development
├── scripts/
│   └── compile-locales.js     # removed legacy compiler
└── vite.config.ts             # configures French locale inputs and generated output
```

Postinstall, builds, and development now share the package merger.

```diff
 locale generation
-  postinstall → compile-locales.js
-  dev → Vite + separate locale watcher
+  postinstall → i18next-merger CLI
+  build or dev → Vite loads i18nextMerger({ locales, glob, outputDir })
+    buildStart
+      merge matching locale files
+      write one generated JSON bundle per locale
+    configureServer
+      watch matching locale files
+      merge again on add, change, or unlink
```
