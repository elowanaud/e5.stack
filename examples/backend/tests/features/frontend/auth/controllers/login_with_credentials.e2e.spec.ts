import hash from "@adonisjs/core/services/hash";
import { test } from "@japa/runner";

import { UserFactory } from "#database/factories/user.factory";

test.group("Frontend auth | login", () => {
	test("authenticates an email against its stored hash and returns only the public identity", async ({
		client,
		assert,
	}) => {
		const password = "correct-horse-battery-staple";
		const user = await UserFactory.merge({ password }).create();

		assert.notEqual(user.password, password);
		assert.isTrue(await hash.use("scrypt").verify(user.password, password));

		const response = await client.visit("frontend.auth.login_with_credentials").json({
			uid: user.email,
			password,
		});

		response.assertStatus(200);
		response.assertSession("auth_frontend", user.id);
		assert.deepEqual(response.body(), {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt.toJSDate().toISOString(),
			updatedAt: user.updatedAt.toJSDate().toISOString(),
		});
		assert.notProperty(response.body(), "password");
	});

	test("rejects a wrong password", async ({ client, assert }) => {
		const user = await UserFactory.merge({ password: "correct-password" }).create();

		const response = await client.visit("frontend.auth.login_with_credentials").json({
			uid: user.email,
			password: "wrong-password",
		});

		response.assertStatus(400);
		response.assertSessionMissing("auth_frontend");
		assert.notProperty(response.body(), "password");
	});

	test("rejects an unknown email", async ({ client, assert }) => {
		const response = await client.visit("frontend.auth.login_with_credentials").json({
			uid: "unknown@example.com",
			password: "any-password",
		});

		response.assertStatus(400);
		response.assertSessionMissing("auth_frontend");
		assert.notProperty(response.body(), "password");
	});

	test("refuses login when the frontend session is already authenticated", async ({ client }) => {
		const password = "existing-session-password";
		const user = await UserFactory.merge({ password }).create();

		const response = await client
			.visit("frontend.auth.login_with_credentials")
			.withGuard("frontend")
			.loginAs(user)
			.json({ uid: user.email, password });

		response.assertStatus(403);
	});
});
