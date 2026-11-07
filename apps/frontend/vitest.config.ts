import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	resolve: { tsconfigPaths: true },
	test: {
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{ts,tsx}", "tests/**/*.{test,spec}.{ts,tsx}"],
		setupFiles: ["./tests/setup.ts"],
		passWithNoTests: true,
		allowOnly: !process.env.CI,
		retry: 0,
	},
});
