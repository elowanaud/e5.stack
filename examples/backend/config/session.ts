import app from "@adonisjs/core/services/app";
import { defineConfig, stores } from "@adonisjs/session";

import env from "#start/env";

const sessionConfig = defineConfig({
	enabled: true,
	cookieName: "adonis-session",
	clearWithBrowser: false,
	age: "7days",

	cookie: {
		path: "/",
		httpOnly: true,
		secure: app.inProduction,
		sameSite: "lax",
	},

	store: env.get("SESSION_DRIVER"),
	stores: {
		redis: stores.redis({
			connection: env.get("REDIS_CONNECTION"),
		}),
	},
});

export default sessionConfig;
