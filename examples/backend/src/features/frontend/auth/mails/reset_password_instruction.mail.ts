import { BaseMail } from "@adonisjs/mail";

import UserPresenter from "#presenters/user.presenter";

type ResetPasswordInstructionMailParams = {
	user: ReturnType<typeof UserPresenter.prototype.toJSON>;
	resetUrl: string;
};

export default class ResetPasswordInstructionMail extends BaseMail {
	subject = "Réinitialisation de votre mot de passe";

	constructor(private params: ResetPasswordInstructionMailParams) {
		super();
	}

	prepare() {
		this.message.to(this.params.user.email);
		this.message.htmlView("../features/frontend/auth/mails/reset_password_instruction.html", {
			user: this.params.user,
			resetUrl: this.params.resetUrl,
		});
	}
}
