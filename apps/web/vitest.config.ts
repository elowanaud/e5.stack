import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [tailwindcss(), viteReact(), babel({ presets: [reactCompilerPreset()] })],
	test: {
		include: ["src/**/*.browser.{test,spec}.{ts,tsx}"],
		setupFiles: ["./src/test/setup.ts"],
		browser: {
			enabled: true,
			headless: true,
			provider: playwright(),
			instances: [{ browser: "chromium" }],
		},
	},
});

export default config;
