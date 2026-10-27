import { test } from "@japa/runner";
import { DateTime } from "luxon";

import { UserFactory } from "#database/factories/user.factory";

test.group("Frontend profile | view", () => {
	test("rejects anonymous requests", async ({ client }) => {
		const response = await client.visit("frontend.profile.view");

		response.assertStatus(401);
	});

	test("returns exactly the authenticated public profile", async ({ client, assert }) => {
		await UserFactory.merge({
			name: "Another user",
			email: "another-profile-user@example.com",
		}).create();
		const password = "Profile-only-secret-123!";
		const user = await UserFactory.merge({
			name: "Profile User",
			email: "profile-user@example.com",
			password,
			createdAt: DateTime.fromISO("2024-02-03T04:05:06.000Z"),
			updatedAt: DateTime.fromISO("2025-06-07T08:09:10.000Z"),
		}).create();

		const response = await client
			.visit("frontend.profile.view")
			.withGuard("frontend")
			.loginAs(user);
		const profile = {
			id: user.id,
			name: "Profile User",
			email: "profile-user@example.com",
			createdAt: "2024-02-03T04:05:06.000Z",
			updatedAt: "2025-06-07T08:09:10.000Z",
		};

		response.assertStatus(200);
		assert.deepEqual(response.body(), profile);
		assert.notInclude(response.text(), password);
		assert.notInclude(response.text(), user.password);
	});
});
