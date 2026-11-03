import vine from "@vinejs/vine";

import { passwordValidator } from "#validators/password.validator";

export const CreateUserValidator = vine.object({
	name: vine.string().trim().minLength(2).maxLength(254),
	email: vine.string().email().maxLength(254).unique({ table: "users", column: "email" }),
	password: passwordValidator.confirmed({ as: "passwordConfirmation" }),
	passwordConfirmation: vine.string(),
});
