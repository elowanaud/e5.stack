import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import { SessionCollection } from "@adonisjs/session";
import vine from "@vinejs/vine";

import User from "#models/user";
import OtpService from "#services/otp.service";
import { passwordValidator } from "#validators/password.validator";

@inject()
export default class ResetPasswordController {
	constructor(
		protected otpService: OtpService<{ userId: number }>,
		protected sessionCollection: SessionCollection,
	) {}

	async handle({ request, response, session }: HttpContext) {
		const { token, password } = await request.validateUsing(ResetPasswordController.payloadSchema);

		const { userId } = await this.otpService.verify(token);
		const user = await User.findOrFail(userId);

		await user.merge({ password: password }).save();

		if (session.supportsTagging()) {
			const sessions = await this.sessionCollection.tagged(String(user.id));
			for (const session of sessions) {
				await this.sessionCollection.destroy(session.id);
			}
		}

		return response.noContent();
	}

	static payloadSchema = vine.create({
		token: vine.string(),
		password: passwordValidator.confirmed({ as: "passwordConfirmation" }),
		passwordConfirmation: vine.string(),
	});
}
