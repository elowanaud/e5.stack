import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

import User from "#models/user";
import UserPresenter from "#presenters/user.presenter";

@inject()
export default class OAuthCallbackController {
	constructor(protected userPresenter: UserPresenter) {}

	async handle({ request, ally, auth }: HttpContext) {
		const { params } = await request.validateUsing(
			vine.create({ params: vine.object({ provider: vine.enum(ally.configuredProviderNames()) }) }),
		);

		const provider = ally.use(params.provider);

		if (provider.accessDenied()) return { error: "Access denied" };
		if (provider.stateMisMatch()) return { error: "State mismatch" };
		if (provider.hasError()) return { error: provider.getError() };

		const providerUser = await provider.user();
		const user = await User.firstOrCreate(
			{ email: providerUser.email },
			{ email: providerUser.email, name: providerUser.name, password: crypto.randomUUID() },
		);

		await auth.use("frontend").login(user);

		return this.userPresenter.toJSON(user);
	}
}
