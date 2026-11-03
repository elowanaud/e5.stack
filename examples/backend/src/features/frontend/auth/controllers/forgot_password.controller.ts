import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

import SendResetPasswordInstructionJob from "#features/frontend/auth/jobs/send_reset_password_instruction.job";
import User from "#models/user";
import UserPresenter from "#presenters/user.presenter";
import OtpService from "#services/otp.service";
import env from "#start/env";

@inject()
export default class ForgotPasswordController {
	resetUrl = new URL("/reset-password", env.get("FRONTEND_URL"));

	constructor(
		protected otpService: OtpService<{ userId: number }>,
		protected userPresenter: UserPresenter,
	) {}

	async handle({ request, response }: HttpContext) {
		const { email } = await request.validateUsing(ForgotPasswordController.payloadSchema);

		const user = await User.findBy("email", email);
		if (!user) return response.noContent();

		const token = await this.otpService.generate({
			key: `user:${user.id}:reset-password`,
			type: "alphanumeric",
			length: 32,
			expireIn: 60 * 15, // 15 minutes
			data: { userId: user.id },
		});
		this.resetUrl.searchParams.set("token", token);

		await SendResetPasswordInstructionJob.dispatch({
			user: this.userPresenter.toJSON(user),
			resetUrl: this.resetUrl.toString(),
		});

		return response.noContent();
	}

	static payloadSchema = vine.create({
		email: vine.string().email(),
	});
}
