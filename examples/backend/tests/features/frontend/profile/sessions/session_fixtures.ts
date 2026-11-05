import app from "@adonisjs/core/services/app";
import { SessionCollection } from "@adonisjs/session";
import type { SessionData } from "@adonisjs/session/types";
import type { ApiClient, ApiRequest } from "@japa/api-client";

export async function createSessionFixtures(
	client: ApiClient,
	cleanup: (callback: () => Promise<void>) => void,
) {
	const collection = await app.container.make(SessionCollection);
	const sessionIds = new Set<string>();

	cleanup(async () => {
		for (const sessionId of sessionIds) {
			await collection.destroy(sessionId);
		}
	});

	return {
		collection,
		async create(data: SessionData, userId?: number) {
			// Allocate a client for the configured real store without sending an HTTP request.
			const session = client.visit("frontend.profile.sessions.list").sessionClient;
			sessionIds.add(session.sessionId);
			session.merge(data);
			await session.commit();
			if (userId !== undefined) {
				await collection.tag(session.sessionId, String(userId));
			}
			return session.sessionId;
		},
		async tagCurrent(request: ApiRequest, userId: number) {
			const sessionId = request.sessionClient.sessionId;
			sessionIds.add(sessionId);
			// loginAs writes auth data, but does not apply the user tag used by these endpoints.
			await collection.tag(sessionId, String(userId));
			return sessionId;
		},
	};
}
