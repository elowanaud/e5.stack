import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";
import UserPresenter from "#presenters/user.presenter";
import { UpdateUserSchema } from "#validators/user.validator";

export default class UpdateProfileController {
	constructor(protected userPresenter: UserPresenter) {}

	async handle({ request, auth }: HttpContext) {
		const user = auth.user!;

		const payload = await request.validateUsing(UpdateProfileController.payloadSchema);

		await user.merge(payload).save();

		return this.userPresenter.toJSON(user);
	}

	static payloadSchema = vine.create(UpdateUserSchema);
}
