import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import { SessionCollection } from "@adonisjs/session";

import User from "#models/user";

@inject()
export default class ProfileSessionsListController {
	constructor(protected sessionCollection: SessionCollection) {}

	async handle({ auth, session }: HttpContext) {
		const currentUser = auth.user! as User;

		const sessions = await this.sessionCollection.tagged(String(currentUser.id));

		return sessions.map((tagedSession) => ({
			id: tagedSession.id,
			device: tagedSession.data.device,
			isCurrent: tagedSession.id === session.sessionId,
		}));
	}
}
