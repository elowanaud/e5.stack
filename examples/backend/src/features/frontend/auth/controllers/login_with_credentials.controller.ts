import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

import User from "#models/user";
import UserPresenter from "#presenters/user.presenter";

@inject()
export default class LoginWithCredentialsController {
	constructor(protected userPresenter: UserPresenter) {}

	async handle({ request, auth }: HttpContext) {
		const payload = await request.validateUsing(LoginWithCredentialsController.payloadSchema);

		const currentUser = await User.verifyCredentials(payload.uid, payload.password);
		await auth.use("frontend").login(currentUser);

		return this.userPresenter.toJSON(currentUser);
	}

	static payloadSchema = vine.create({
		uid: vine.string(),
		password: vine.string(),
	});
}
