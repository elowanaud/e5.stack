import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

import User from "#models/user";
import UserPresenter from "#presenters/user.presenter";
import { CreateUserValidator } from "#validators/user.validator";

@inject()
export default class RegisterController {
	constructor(protected userPresenter: UserPresenter) {}

	async handle({ request, auth }: HttpContext) {
		const { passwordConfirmation, ...payload } = await request.validateUsing(
			RegisterController.payloadSchema,
		);

		const user = await User.create(payload);
		await auth.use("frontend").login(user);

		return this.userPresenter.toJSON(user);
	}

	static payloadSchema = vine.create(CreateUserValidator);
}
