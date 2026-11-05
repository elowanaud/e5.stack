import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

import User from "#models/user";
import UserPresenter from "#presenters/user.presenter";
import env from "#start/env";

@inject()
export default class OAuthCallbackController {
	constructor(protected userPresenter: UserPresenter) {}

	async handle({ request, response, ally, auth, session }: HttpContext) {
		const { params } = await request.validateUsing(
			vine.create({ params: vine.object({ provider: vine.enum(ally.configuredProviderNames()) }) }),
		);

		const provider = ally.use(params.provider);

		if (provider.accessDenied())
			return response.redirect(`${env.get("FRONTEND_URL")}/login?oauth_state=access_denied`);
		if (provider.stateMisMatch())
			return response.redirect(`${env.get("FRONTEND_URL")}/login?oauth_state=state_mismatch`);
		if (provider.hasError())
			return response.redirect(`${env.get("FRONTEND_URL")}/login?oauth_state=unexpected_error`);

		const providerUser = await provider.user();
		const user = await User.firstOrCreate(
			{ email: providerUser.email },
			{ email: providerUser.email, name: providerUser.name, password: crypto.randomUUID() },
		);

		await auth.use("frontend").login(user);

		if (session.supportsTagging()) {
			await session.tag(String(user.id));
			session.put("device", {
				userAgent: request.header("user-agent"),
				ip: request.ip(),
				loggedInAt: new Date().toISOString(),
			});
		}

		return response.redirect(`${env.get("FRONTEND_URL")}/login?oauth_state=success`);
	}
}
