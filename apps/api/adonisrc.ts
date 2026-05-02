import { indexEntities } from "@adonisjs/core";
import { defineConfig } from "@adonisjs/core/app";
import { generateRegistry } from "@tuyau/core/hooks";

export default defineConfig({
	directories: {
		config: "src/infrastructure/config",
		migrations: "src/infrastructure/database/migrations",
		factories: "src/infrastructure/database/factories",
		seeders: "src/infrastructure/database/seeders",
		models: "src/application/models",
		transformers: "src/application/transformers",
	},

	experimental: {},

	commands: [() => import("@adonisjs/core/commands"), () => import("@adonisjs/lucid/commands")],

	providers: [
		() => import("@adonisjs/core/providers/app_provider"),
		() => import("@adonisjs/core/providers/hash_provider"),
		{
			file: () => import("@adonisjs/core/providers/repl_provider"),
			environment: ["repl", "test"],
		},
		() => import("@adonisjs/core/providers/vinejs_provider"),
		() => import("@adonisjs/lucid/database_provider"),
	],

	preloads: [
		() => import("#infrastructure/http/routes"),
		() => import("#infrastructure/http/kernel"),
	],

	tests: {
		suites: [
			{
				files: ["tests/unit/**/*.spec.{ts,js}"],
				name: "unit",
				timeout: 2000,
			},
			{
				files: ["tests/functional/**/*.spec.{ts,js}"],
				name: "functional",
				timeout: 30000,
			},
			{
				files: ["tests/browser/**/*.spec.{ts,js}"],
				name: "browser",
				timeout: 300000,
			},
		],
		forceExit: false,
	},

	hooks: {
		init: [
			indexEntities({
				controllers: {
					enabled: true,
					source: "src/domains",
					importAlias: "#domains",
					glob: ["**/*.controller.{ts,js}"],
				},
				events: {
					enabled: true,
					source: "src/domains",
					importAlias: "#domains",
					glob: ["**/*.event.{ts,js}"],
				},
				listeners: {
					enabled: true,
					source: "src/domains",
					importAlias: "#domains",
					glob: ["**/*.listener.{ts,js}"],
				},
				transformers: {
					enabled: false,
					source: "src/application/transformers",
					importAlias: "#application/transformers",
					glob: ["**/*.transformer.{ts,js}"],
				},
			}),
			generateRegistry(),
		],
	},
});
