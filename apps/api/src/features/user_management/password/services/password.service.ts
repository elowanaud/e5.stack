import { inject } from "@adonisjs/core";
import InvalidTokenException from "#features/user_management/password/exceptions/invalid_token.exception";
import User from "#models/user";
import { UserTokenType } from "#models/user_token";
import UserTokenService from "#services/user_token.service";
import env from "#start/env";

@inject()
export default class PasswordService {
	constructor(protected userTokenService: UserTokenService) {}

	async forgotPassword(email: string) {
		const user = await User.findBy("email", email);
		if (!user) return;

		const token = await this.userTokenService.generate({
			user,
			type: UserTokenType.RESET_PASSWORD,
		});
		const resetPasswordUrl = new URL("/reset-password", env.get("FRONTEND_URL"));
		resetPasswordUrl.searchParams.set("token", token);

		// send email with resetPasswordUrl
	}

	async resetPassword(params: ResetPasswordDTO["params"]) {
		const { token, newPassword } = params;

		const { valid, user } = await this.userTokenService.verify({
			token,
			type: UserTokenType.RESET_PASSWORD,
		});

		if (!valid) throw new InvalidTokenException();

		await user.merge({ password: newPassword }).save();
		await this.userTokenService.revoke({
			user,
			type: UserTokenType.RESET_PASSWORD,
		});

		// Send email notification about password change
	}
}

type ResetPasswordDTO = {
	params: {
		token: string;
		newPassword: string;
	};
};
