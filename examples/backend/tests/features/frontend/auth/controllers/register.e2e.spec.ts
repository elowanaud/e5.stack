import hash from "@adonisjs/core/services/hash";
import { test } from "@japa/runner";
import type { TestContext } from "@japa/runner/core";

import { UserFactory } from "#database/factories/user.factory";
import User from "#models/user";

const validPayload = {
	name: "Registration User",
	email: "registration@example.com",
	password: "registration-password",
	passwordConfirmation: "registration-password",
};

async function assertRejected(
	{ client, assert }: Pick<TestContext, "client" | "assert">,
	payload: typeof validPayload,
	field: string,
) {
	const usersBefore = await User.all();
	const response = await client.visit("frontend.auth.register").json(payload);

	response.assertStatus(422);
	response.assertSessionMissing("auth_frontend");
	// The route registry types the success body, not validation error responses.
	const { errors } = response.body() as unknown as { errors: { field: string }[] };
	assert.isTrue(
		errors.some((error) => error.field === field),
		`Expected a validation error for "${field}": ${JSON.stringify(errors)}`,
	);
	assert.lengthOf(await User.all(), usersBefore.length);
}

test.group("Frontend auth | register", () => {
	test("persists a user with a scrypt hash, returns only the public identity and authenticates the session", async ({
		client,
		assert,
	}) => {
		const usersBefore = await User.all();
		const response = await client.visit("frontend.auth.register").json(validPayload);

		response.assertStatus(200);
		const user = await User.findByOrFail("email", validPayload.email);
		assert.lengthOf(await User.all(), usersBefore.length + 1);
		assert.equal(user.name, validPayload.name);
		assert.notEqual(user.password, validPayload.password);
		assert.isTrue(await hash.use("scrypt").verify(user.password, validPayload.password));
		response.assertSession("auth_frontend", user.id);
		assert.deepEqual(response.body(), {
			id: user.id,
			name: validPayload.name,
			email: validPayload.email,
			createdAt: user.createdAt.toJSDate().toISOString(),
			updatedAt: user.updatedAt.toJSDate().toISOString(),
		});
	});

	test("rejects a malformed email", async (context) => {
		await assertRejected(context, { ...validPayload, email: "not-an-email" }, "email");
	});

	test("rejects an email already used by another user", async (context) => {
		await UserFactory.merge({ email: validPayload.email }).create();
		await assertRejected(context, validPayload, "email");
	});

	test("refuses registration when the frontend session is already authenticated", async ({
		client,
		assert,
	}) => {
		const user = await UserFactory.create();
		const usersBefore = await User.all();
		const response = await client
			.visit("frontend.auth.register")
			.withGuard("frontend")
			.loginAs(user)
			.json(validPayload);

		response.assertStatus(403);
		response.assertSession("auth_frontend", user.id);
		assert.lengthOf(await User.all(), usersBefore.length);
		assert.isNull(await User.findBy("email", validPayload.email));
	});
});
