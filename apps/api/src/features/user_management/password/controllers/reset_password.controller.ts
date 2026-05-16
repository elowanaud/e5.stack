import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";
import PasswordService from "#features/user_management/password/services/password.service";
import User from "#models/user";

@inject()
export default class ResetPasswordController {
	constructor(protected passwordService: PasswordService) {}

	async handle({ request }: HttpContext) {
		const { token, newPassword } = await request.validateUsing(
			ResetPasswordController.payloadSchema,
		);

		await this.passwordService.resetPassword({ token, newPassword });

		return null;
	}

	static payloadSchema = vine.create({
		token: vine.string(),
		newPassword: User.createSchema.pick(["password"]).password,
	});
}
