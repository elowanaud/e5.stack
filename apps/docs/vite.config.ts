import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	server: {
		port: 3001,
	},
	resolve: {
		tsconfigPaths: true,
		alias: {
			tslib: "tslib/tslib.es6.js",
		},
		noExternal: ["fumadocs-core", "fumadocs-ui", "fumadocs-mdx", "@fumadocs/tailwind"],
	},
	plugins: [
		mdx(),
		tailwindcss(),
		tanstackStart({
			router: {
				routeToken: "layout",
				indexToken: "page",
			},
			spa: {
				enabled: true,
				prerender: {
					enabled: true,
					crawlLinks: true,
				},
			},
			pages: [
				{ path: "/docs" },
				{ path: "/api/search" },
				{ path: "/llms.txt" },
				{ path: "/llms-full.txt" },
			],
		}),
		react(),
		nitro(),
	],
});

export default config;
