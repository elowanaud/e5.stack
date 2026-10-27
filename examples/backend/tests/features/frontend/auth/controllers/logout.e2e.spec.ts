import { test } from "@japa/runner";

import { UserFactory } from "#database/factories/user.factory";

test.group("Frontend auth | logout", () => {
	test("requires an authenticated frontend session", async ({ client }) => {
		const response = await client.visit("frontend.auth.logout");

		response.assertStatus(401);
	});

	test("clears the authenticated frontend session on logout", async ({ client, assert }) => {
		const user = await UserFactory.create();

		const response = await client.visit("frontend.auth.logout").withGuard("frontend").loginAs(user);

		response.assertStatus(204);
		assert.equal(response.text(), "");
		response.assertSessionMissing("auth_frontend");
	});
});
