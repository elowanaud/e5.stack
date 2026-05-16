import { Env } from "@adonisjs/core/env";
import app from "@adonisjs/core/services/app";

export default await Env.create(new URL("../", import.meta.url), {
	// Server Config
	NODE_ENV: Env.schema.enum(["development", "production", "test"] as const),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	APP_URL: Env.schema.string({ format: "url", tld: false }),
	HOST: Env.schema.string({ format: "host" }),
	LOG_LEVEL: Env.schema.string(),

	// Frontend Config
	FRONTEND_URL: Env.schema.string({ format: "url", tld: app.inProduction }),

	// Cookie Config
	COOKIE_DOMAIN: Env.schema.string.optionalWhen(process.env.NODE_ENV !== "production"),

	// Session Config
	SESSION_DRIVER: Env.schema.enum(["cookie", "memory"] as const),

	// CORS Config
	CORS_AUTHORIZED_ORIGINS: Env.schema.string.optionalWhen(process.env.NODE_ENV !== "production"),

	// Database Config
	DB_HOST: Env.schema.string({ format: "host" }),
	DB_PORT: Env.schema.number(),
	DB_USER: Env.schema.string(),
	DB_PASSWORD: Env.schema.string.optional(),
	DB_DATABASE: Env.schema.string(),
});
