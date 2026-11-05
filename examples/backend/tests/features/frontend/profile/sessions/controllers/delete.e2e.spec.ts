import { randomUUID } from "node:crypto";

import { test } from "@japa/runner";

import { UserFactory } from "#database/factories/user.factory";
import { createSessionFixtures } from "#tests/features/frontend/profile/sessions/session_fixtures";

test.group("Frontend profile sessions | delete", () => {
	test("rejects anonymous requests", async ({ client }) => {
		const response = await client.visit("frontend.profile.sessions.delete", {
			sessionId: randomUUID(),
		});

		response.assertStatus(401);
	});

	test("revokes another owned session without changing unrelated sessions", async ({
		client,
		assert,
		cleanup,
	}) => {
		const [user, otherUser] = await UserFactory.createMany(2);
		const sessions = await createSessionFixtures(client, cleanup);
		const ownedData = { auth_frontend: user.id, device: { userAgent: "Owned browser" } };
		const foreignData = { auth_frontend: otherUser.id };
		const untaggedData = { auth_frontend: user.id, privateValue: "untagged" };
		const targetId = await sessions.create(ownedData, user.id);
		const siblingId = await sessions.create(ownedData, user.id);
		const foreignId = await sessions.create(foreignData, otherUser.id);
		const untaggedId = await sessions.create(untaggedData);
		const request = client
			.visit("frontend.profile.sessions.delete", { sessionId: targetId })
			.withGuard("frontend")
			.loginAs(user);
		await sessions.tagCurrent(request, user.id);

		const response = await request;

		response.assertStatus(204);
		assert.equal(response.text(), "");
		response.assertSession("auth_frontend", user.id);
		assert.isNull(await sessions.collection.get(targetId));
		assert.deepEqual(await sessions.collection.get(siblingId), ownedData);
		assert.deepEqual(await sessions.collection.get(foreignId), foreignData);
		assert.deepEqual(await sessions.collection.get(untaggedId), untaggedData);
		assert.deepEqual(
			(await sessions.collection.tagged(String(user.id))).map((session) => session.id),
			[siblingId],
		);

		const retry = await client
			.visit("frontend.profile.sessions.delete", { sessionId: targetId })
			.withGuard("frontend")
			.loginAs(user);

		retry.assertStatus(404);
		assert.isNull(await sessions.collection.get(targetId));
	});

	test("forbids revoking the current session and leaves its authentication intact", async ({
		client,
		assert,
		cleanup,
	}) => {
		const user = await UserFactory.create();
		const sessions = await createSessionFixtures(client, cleanup);
		const siblingData = { auth_frontend: user.id };
		const siblingId = await sessions.create(siblingData, user.id);
		const currentId = randomUUID();
		const device = { userAgent: "Current browser" };
		const request = client
			.visit("frontend.profile.sessions.delete", { sessionId: currentId })
			.header("accept", "application/json")
			.withGuard("frontend")
			.loginAs(user)
			.withSession({ device });
		request.sessionClient.sessionId = currentId;
		await sessions.tagCurrent(request, user.id);

		const response = await request;

		response.assertStatus(403);
		response.assertBodyContains({ code: "E_AUTHORIZATION_FAILURE" });
		// The Japa plugin captures the stored session before destroying it during response teardown.
		response.assertSession("auth_frontend", user.id);
		response.assertSession("device", device);
		assert.deepEqual(await sessions.collection.get(siblingId), siblingData);
	});

	test("returns 404 for an unknown session without changing owned sessions", async ({
		client,
		assert,
		cleanup,
	}) => {
		const user = await UserFactory.create();
		const sessions = await createSessionFixtures(client, cleanup);
		const ownedData = { auth_frontend: user.id };
		const ownedId = await sessions.create(ownedData, user.id);
		const unknownId = randomUUID();
		const request = client
			.visit("frontend.profile.sessions.delete", { sessionId: unknownId })
			.withGuard("frontend")
			.loginAs(user);
		await sessions.tagCurrent(request, user.id);

		const response = await request;

		response.assertStatus(404);
		response.assertSession("auth_frontend", user.id);
		assert.isNull(await sessions.collection.get(unknownId));
		assert.deepEqual(await sessions.collection.get(ownedId), ownedData);
	});

	test("returns 404 for another user's session without deleting it or changing its tag", async ({
		client,
		assert,
		cleanup,
	}) => {
		const [user, otherUser] = await UserFactory.createMany(2);
		const sessions = await createSessionFixtures(client, cleanup);
		const ownedData = { auth_frontend: user.id };
		const foreignData = { auth_frontend: otherUser.id, device: { userAgent: "Foreign browser" } };
		const ownedId = await sessions.create(ownedData, user.id);
		const foreignId = await sessions.create(foreignData, otherUser.id);
		const request = client
			.visit("frontend.profile.sessions.delete", { sessionId: foreignId })
			.withGuard("frontend")
			.loginAs(user);
		await sessions.tagCurrent(request, user.id);

		const response = await request;

		response.assertStatus(404);
		response.assertSession("auth_frontend", user.id);
		assert.deepEqual(await sessions.collection.get(ownedId), ownedData);
		assert.deepEqual(await sessions.collection.get(foreignId), foreignData);
		assert.deepEqual(
			(await sessions.collection.tagged(String(otherUser.id))).map((session) => session.id),
			[foreignId],
		);
	});

	test("returns 404 for an untagged session even when it authenticates the same user", async ({
		client,
		assert,
		cleanup,
	}) => {
		const user = await UserFactory.create();
		const sessions = await createSessionFixtures(client, cleanup);
		const ownedData = { auth_frontend: user.id };
		const untaggedData = { auth_frontend: user.id, privateValue: "untagged" };
		const ownedId = await sessions.create(ownedData, user.id);
		const untaggedId = await sessions.create(untaggedData);
		const request = client
			.visit("frontend.profile.sessions.delete", { sessionId: untaggedId })
			.withGuard("frontend")
			.loginAs(user);
		await sessions.tagCurrent(request, user.id);

		const response = await request;

		response.assertStatus(404);
		response.assertSession("auth_frontend", user.id);
		assert.deepEqual(await sessions.collection.get(ownedId), ownedData);
		assert.deepEqual(await sessions.collection.get(untaggedId), untaggedData);
		assert.deepEqual(
			(await sessions.collection.tagged(String(user.id))).map((session) => session.id),
			[ownedId],
		);
	});
});
