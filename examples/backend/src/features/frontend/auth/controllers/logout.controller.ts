import type { HttpContext } from "@adonisjs/core/http";

import User from "#models/user";

export default class LogoutController {
	async handle({ response, auth, session }: HttpContext) {
		const currentUser = auth.user! as User;

		if (session.supportsTagging()) {
			await session.untag(String(currentUser.id));
		}

		await auth.use("frontend").logout();

		return response.noContent();
	}
}
