## Why the change

Locale bundles need to stay synchronized during both web builds and development without relying on a separate watcher process.

## Special things to note

- The merger is also exposed as a CLI so locale generation can run outside Vite.
- The legacy locale compiler and watcher scripts are removed; postinstall now runs the new merger CLI.

## Change outline

Locale merging moves from app-specific scripts into a reusable workspace package.

```text
packages/i18next-merger/
├── src/core.ts       # discovers and merges locale JSON files
├── src/cli.ts        # exposes the core merger as a command
└── src/vite.ts       # integrates merging with Vite builds and file watching

apps/web/
├── package.json               # runs the CLI during postinstall
├── scripts/compile-locales.js # removed
└── vite.config.ts             # configures the merger plugin
```

Postinstall, builds, and development now use the same merge behavior.

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
