import { MailResponse } from "@adonisjs/mail";
import type {
	MailManagerTransportFactory,
	MailTransportContract,
	NodeMailerMessage,
} from "@adonisjs/mail/types";
import nodemailer from "nodemailer";
import previewEmail from "preview-email";

export type BrowserConfig = previewEmail.Options;

export class BrowserTransport implements MailTransportContract {
	#config: BrowserConfig;
	#transporter = nodemailer.createTransport({ jsonTransport: true });

	constructor(config: BrowserConfig) {
		this.#config = config;
	}

	async send(message: NodeMailerMessage, config?: BrowserConfig) {
		await previewEmail(message, { ...this.#config, ...config });
		const response = await this.#transporter.sendMail(message);
		return new MailResponse(response.messageId, response.envelope, response);
	}
}

export function browserTransport(config: BrowserConfig): MailManagerTransportFactory {
	return () => new BrowserTransport(config);
}
