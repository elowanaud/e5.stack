import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

import User from "#models/user";
import UserPresenter from "#presenters/user.presenter";

@inject()
export default class ViewProfileController {
	constructor(protected userPresenter: UserPresenter) {}

	async handle({ auth }: HttpContext) {
		const currentUser = auth.user as User;

		return this.userPresenter.toJSON(currentUser);
	}
}
