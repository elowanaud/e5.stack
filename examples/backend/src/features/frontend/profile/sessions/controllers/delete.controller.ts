import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import { SessionCollection } from "@adonisjs/session";

import AuthorizationFailureException from "#exceptions/authorization_failure.exception";
import User from "#models/user";

@inject()
export default class ProfileSessionsDeleteController {
	constructor(protected sessionCollection: SessionCollection) {}

	async handle({ params, response, auth, session }: HttpContext) {
		const { sessionId } = params;

		const currentUser = auth.user! as User;

		const sessions = await this.sessionCollection.tagged(String(currentUser.id));
		const sessionToDelete = sessions.find((session) => session.id === sessionId);

		if (!sessionToDelete) return response.notFound();
		if (sessionToDelete.id === session.sessionId) throw new AuthorizationFailureException();

		await this.sessionCollection.destroy(sessionToDelete.id);

		return response.noContent();
	}
}
