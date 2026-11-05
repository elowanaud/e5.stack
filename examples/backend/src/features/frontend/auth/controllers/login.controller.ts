import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

import User from "#models/user";
import UserPresenter from "#presenters/user.presenter";

@inject()
export default class LoginController {
	constructor(protected userPresenter: UserPresenter) {}

	async handle({ request, auth, session }: HttpContext) {
		const payload = await request.validateUsing(LoginController.payloadSchema);

		const user = await User.verifyCredentials(payload.uid, payload.password);
		await auth.use("frontend").login(user);

		if (session.supportsTagging()) {
			await session.tag(String(user.id));
			session.put("device", {
				userAgent: request.header("user-agent"),
				ip: request.ip(),
				loggedInAt: new Date().toISOString(),
			});
		}

		return this.userPresenter.toJSON(user);
	}

	static payloadSchema = vine.create({
		uid: vine.string(),
		password: vine.string(),
	});
}
