import mail from "@adonisjs/mail/services/main";
import { Job } from "@adonisjs/queue";
import type { JobOptions } from "@adonisjs/queue/types";

import ResetPasswordInstructionMail from "#features/frontend/auth/mails/reset_password_instruction.mail";
import UserPresenter from "#presenters/user.presenter";

type SendResetPasswordInstructionJobPayload = {
	user: ReturnType<typeof UserPresenter.prototype.toJSON>;
	resetUrl: string;
};

export default class SendResetPasswordInstructionJob extends Job<SendResetPasswordInstructionJobPayload> {
	static options: JobOptions = {
		queue: "emails",
	};

	async execute() {
		const { user, resetUrl } = this.payload;

		await mail.send(new ResetPasswordInstructionMail({ user, resetUrl }));
	}
}
