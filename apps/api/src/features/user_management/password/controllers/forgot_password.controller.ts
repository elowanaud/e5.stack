import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";
import PasswordService from "#features/user_management/password/services/password.service";

@inject()
export default class ForgotPasswordController {
	constructor(protected passwordService: PasswordService) {}

	async handle({ request }: HttpContext) {
		const { email } = await request.validateUsing(ForgotPasswordController.payloadSchema);

		await this.passwordService.forgotPassword(email);

		return null;
	}

	static payloadSchema = vine.create({
		email: vine.string().email(),
	});
}
