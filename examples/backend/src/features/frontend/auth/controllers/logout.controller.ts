import type { HttpContext } from "@adonisjs/core/http";

export default class LogoutController {
	async handle({ response, auth }: HttpContext) {
		await auth.use("frontend").logout();

		return response.noContent();
	}
}
