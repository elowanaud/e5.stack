import { randomUUID } from "node:crypto";

import { test } from "@japa/runner";

import { UserFactory } from "#database/factories/user.factory";
import { createSessionFixtures } from "#tests/features/frontend/profile/sessions/session_fixtures";

test.group("Frontend profile sessions | delete others", () => {
	test("rejects anonymous requests", async ({ client }) => {
		const response = await client.visit("frontend.profile.sessions.delete_others");

		response.assertStatus(401);
	});

	test("revokes every other owned session, preserves unscoped sessions and is idempotent", async ({
		client,
		assert,
		cleanup,
	}) => {
		const [user, otherUser] = await UserFactory.createMany(2);
		const sessions = await createSessionFixtures(client, cleanup);
		const firstId = await sessions.create(
			{ auth_frontend: user.id, device: { userAgent: "First browser" } },
			user.id,
		);
		const secondId = await sessions.create({ auth_frontend: user.id }, user.id);
		const foreignData = { auth_frontend: otherUser.id, device: { userAgent: "Foreign browser" } };
		const foreignId = await sessions.create(foreignData, otherUser.id);
		const untaggedData = { auth_frontend: user.id, device: { userAgent: "Untagged browser" } };
		const untaggedId = await sessions.create(untaggedData);
		const currentId = randomUUID();
		const device = { userAgent: "Current browser", ip: "192.0.2.1" };

		for (let attempt = 0; attempt < 2; attempt++) {
			const request = client
				.visit("frontend.profile.sessions.delete_others")
				.withGuard("frontend")
				.loginAs(user)
				.withSession({ device });
			// Japa destroys the current session after each response, so restore it for the retry.
			request.sessionClient.sessionId = currentId;
			await sessions.tagCurrent(request, user.id);
			const response = await request;

			response.assertStatus(204);
			assert.equal(response.text(), "");
			// These values were read from storage before the plugin's response teardown.
			response.assertSession("auth_frontend", user.id);
			response.assertSession("device", device);
			assert.isNull(await sessions.collection.get(firstId));
			assert.isNull(await sessions.collection.get(secondId));
			assert.deepEqual(await sessions.collection.get(foreignId), foreignData);
			assert.deepEqual(await sessions.collection.get(untaggedId), untaggedData);
			assert.deepEqual(
				(await sessions.collection.tagged(String(otherUser.id))).map((session) => session.id),
				[foreignId],
			);
		}
	});
});
