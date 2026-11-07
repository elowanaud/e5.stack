import path from "node:path";

import type { Plugin } from "vite";

import merge, { type MergeOptions } from "./core.ts";

export default function vitePlugin(options: MergeOptions): Plugin {
	const patterns = options.locales.map((locale) =>
		path.join(process.cwd(), `${options.glob}/${locale}.json`),
	);
	const mergeLocales = () => merge(options);

	return {
		name: "i18next-merger",
		buildStart: mergeLocales,
		configureServer(server) {
			const mergeWatchedLocale = (file: string) => {
				if (patterns.some((pattern) => path.matchesGlob(file, pattern))) {
					try {
						mergeLocales();
					} catch (error) {
						server.config.logger.error(String(error));
					}
				}
			};
			server.watcher.add(patterns);
			server.watcher.on("add", mergeWatchedLocale);
			server.watcher.on("change", mergeWatchedLocale);
			server.watcher.on("unlink", mergeWatchedLocale);
		},
	};
}
