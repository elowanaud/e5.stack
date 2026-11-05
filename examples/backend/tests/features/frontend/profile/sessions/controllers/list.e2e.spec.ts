import { test } from "@japa/runner";

import { UserFactory } from "#database/factories/user.factory";
import { createSessionFixtures } from "#tests/features/frontend/profile/sessions/session_fixtures";

test.group("Frontend profile sessions | list", () => {
	test("rejects anonymous requests", async ({ client }) => {
		const response = await client.visit("frontend.profile.sessions.list");

		response.assertStatus(401);
	});

	test("lists only the user's tagged sessions with public device metadata and the current flag", async ({
		client,
		assert,
		cleanup,
	}) => {
		const [user, otherUser] = await UserFactory.createMany(2);
		const sessions = await createSessionFixtures(client, cleanup);
		const currentDevice = {
			userAgent: "Current browser",
			ip: "192.0.2.1",
			loggedInAt: "2026-01-02T03:04:05.000Z",
		};
		const otherDevice = {
			userAgent: "Other browser",
			ip: "192.0.2.2",
			loggedInAt: "2026-01-01T03:04:05.000Z",
		};
		const otherId = await sessions.create(
			{ auth_frontend: user.id, device: otherDevice, privateValue: "not-public" },
			user.id,
		);
		const withoutDeviceId = await sessions.create({ auth_frontend: user.id }, user.id);
		await sessions.create({ auth_frontend: otherUser.id, device: otherDevice }, otherUser.id);
		await sessions.create({ auth_frontend: user.id, device: otherDevice });

		const request = client
			.visit("frontend.profile.sessions.list")
			.withGuard("frontend")
			.loginAs(user)
			.withSession({ device: currentDevice, privateValue: "also-not-public" });
		const currentId = await sessions.tagCurrent(request, user.id);
		const response = await request;

		response.assertStatus(200);
		assert.sameDeepMembers(response.body(), [
			{ id: currentId, device: currentDevice, isCurrent: true },
			{ id: otherId, device: otherDevice, isCurrent: false },
			{ id: withoutDeviceId, isCurrent: false },
		]);
	});

	test("returns an empty list when the authenticated session has no user tag", async ({
		client,
		assert,
		cleanup,
	}) => {
		const [user, otherUser] = await UserFactory.createMany(2);
		const sessions = await createSessionFixtures(client, cleanup);
		await sessions.create({ auth_frontend: otherUser.id }, otherUser.id);
		await sessions.create({ auth_frontend: user.id });

		const response = await client
			.visit("frontend.profile.sessions.list")
			.withGuard("frontend")
			.loginAs(user);

		response.assertStatus(200);
		assert.deepEqual(response.body(), []);
	});
});
