import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

import env from "#start/env";

export default class OAuthRedirectController {
	async handle({ request, ally, session }: HttpContext) {
		const { params } = await request.validateUsing(
			vine.create({ params: vine.object({ provider: vine.enum(ally.configuredProviderNames()) }) }),
		);

		session.put("redirect.previousUrl", `${env.get("FRONTEND_URL")}/login`);

		return ally.use(params.provider).redirect();
	}
}
