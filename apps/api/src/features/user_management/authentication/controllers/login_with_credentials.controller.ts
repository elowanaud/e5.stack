import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";
import AuthService from "#features/user_management/authentication/services/auth.service";
import UserPresenter from "#presenters/user.presenter";

@inject()
export default class LoginWithCredentialsController {
	constructor(
		protected authService: AuthService,
		protected userPresenter: UserPresenter,
	) {}

	async handle({ request }: HttpContext) {
		const { uid, password } = await request.validateUsing(
			LoginWithCredentialsController.payloadSchema,
		);

		const user = await this.authService.loginWithCredentials(uid, password);

		return this.userPresenter.toJSON(user);
	}

	static payloadSchema = vine.create({
		uid: vine.string(),
		password: vine.string(),
	});
}
