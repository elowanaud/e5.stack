import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

export default class OAuthRedirectController {
	async handle({ request, ally }: HttpContext) {
		const { params } = await request.validateUsing(
			vine.create({ params: vine.object({ provider: vine.enum(ally.configuredProviderNames()) }) }),
		);

		return ally.use(params.provider).redirect();
	}
}
