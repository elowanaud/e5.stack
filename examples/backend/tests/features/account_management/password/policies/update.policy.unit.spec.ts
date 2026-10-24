import { test } from "@japa/runner";

import UpdatePolicy from "#features/frontend/account_management/password/policies/update.policy";

test.group("Features / Frontend / Account Management / Password / Policies / Update Policy", () => {
	test("it should allow everyone", async ({ assert }) => {
		const updatePolicy = new UpdatePolicy();
		const canHandle = await updatePolicy.handle();

		assert.isTrue(canHandle);
	});
});
