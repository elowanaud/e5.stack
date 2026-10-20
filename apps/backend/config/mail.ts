import { defineConfig, transports } from "@adonisjs/mail";

import { browserTransport } from "@workspace/adonis-mail-browser-transport";

import env from "#start/env";

const mailConfig = defineConfig({
	default: env.get("MAIL_MAILER"),

	from: {
		address: env.get("MAIL_FROM_ADDRESS"),
		name: env.get("MAIL_FROM_NAME"),
	},

	mailers: {
		browser: browserTransport({
			openSimulator: false,
		}),
		brevo: transports.brevo({
			baseUrl: env.get("BREVO_BASE_URL", ""),
			key: env.get("BREVO_API_KEY", ""),
		}),
	},
});

export default mailConfig;

declare module "@adonisjs/mail/types" {
	export interface MailersList extends InferMailers<typeof mailConfig> {}
}
