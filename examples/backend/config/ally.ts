import { defineConfig, services } from "@adonisjs/ally";

import env from "#start/env";

const allyConfig = defineConfig({
	github: services.github({
		clientId: env.get("GITHUB_CLIENT_ID"),
		clientSecret: env.get("GITHUB_CLIENT_SECRET"),
		callbackUrl: `${env.get("APP_URL")}/frontend/oauth/github/callback`,
	}),
});

export default allyConfig;

declare module "@adonisjs/ally/types" {
	interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
