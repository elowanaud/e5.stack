import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import { SessionCollection } from "@adonisjs/session";

import User from "#models/user";

@inject()
export default class ProfileSessionsDeleteOthersController {
	constructor(protected sessionCollection: SessionCollection) {}

	async handle({ response, auth, session }: HttpContext) {
		const currentUser = auth.user! as User;

		const sessions = await this.sessionCollection.tagged(String(currentUser.id));

		for (const taggedSession of sessions) {
			if (taggedSession.id !== session.sessionId) {
				await this.sessionCollection.destroy(taggedSession.id);
			}
		}

		return response.noContent();
	}
}
