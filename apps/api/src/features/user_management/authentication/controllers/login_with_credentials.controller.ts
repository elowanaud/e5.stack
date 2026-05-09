import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";
import AuthService from "#features/user_management/authentication/services/auth.service";

@inject()
export default class LoginWithCredentialsController {
	constructor(protected authService: AuthService) {}

	async handle({ request }: HttpContext) {
		const { uid, password } = await request.validateUsing(
			LoginWithCredentialsController.payloadSchema,
		);

		const user = await this.authService.loginWithCredentials(uid, password);

		return user.toJSON();
	}

	static payloadSchema = vine.create({
		uid: vine.string(),
		password: vine.string(),
	});
}
