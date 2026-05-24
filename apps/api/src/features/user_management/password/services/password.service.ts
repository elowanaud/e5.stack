import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import { DateTime } from "luxon";
import InvalidCredentialsException from "#features/user_management/authentication/exceptions/invalid_credentials.exception";
import InvalidTokenException from "#features/user_management/password/exceptions/invalid_token.exception";
import SendPasswordChangedNotification from "#features/user_management/password/jobs/send_password_changed_notification.job";
import SendResetPasswordInstruction from "#features/user_management/password/jobs/send_reset_password_instruction.job";
import User from "#models/user";
import { UserTokenType } from "#models/user_token";
import UserTokenService from "#services/user_token.service";
import env from "#start/env";

@inject()
export default class PasswordService {
	constructor(
		protected ctx: HttpContext,
		protected userTokenService: UserTokenService,
	) {}

	async update(params: UpdateDTO["params"]) {
		const { currentPassword, newPassword } = params;

		const user = this.ctx.auth.user!;

		if (!(await user.verifyPassword(currentPassword))) {
			throw new InvalidCredentialsException();
		}

		await user.merge({ password: newPassword }).save();
		await SendPasswordChangedNotification.dispatch({
			user,
			loginUrl: new URL("/login", env.get("FRONTEND_URL")),
		});
		await this.ctx.auth.use("web").logout();
	}

	async forgot(email: string) {
		const user = await User.findBy("email", email);
		if (!user) return;

		const token = await this.userTokenService.generate({
			user,
			type: UserTokenType.RESET_PASSWORD,
			expiresAt: DateTime.now().plus({ hours: 1 }),
		});
		const resetPasswordUrl = new URL("/reset-password", env.get("FRONTEND_URL"));
		resetPasswordUrl.searchParams.set("token", token);

		await SendResetPasswordInstruction.dispatch({ user, resetPasswordUrl });
	}

	async reset(params: ResetPasswordDTO["params"]) {
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

		await SendPasswordChangedNotification.dispatch({
			user,
			loginUrl: new URL("/login", env.get("FRONTEND_URL")),
		});
	}
}

type UpdateDTO = {
	params: {
		currentPassword: string;
		newPassword: string;
	};
};

type ResetPasswordDTO = {
	params: {
		token: string;
		newPassword: string;
	};
};
