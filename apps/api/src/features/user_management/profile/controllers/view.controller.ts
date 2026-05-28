import { HttpContext } from "@adonisjs/core/http";
import UserPresenter from "#presenters/user.presenter";

export default class ViewProfileController {
	constructor(protected userPresenter: UserPresenter) {}

	async handle({ auth }: HttpContext) {
		const user = auth.user!;

		return this.userPresenter.toJSON(user);
	}
}
