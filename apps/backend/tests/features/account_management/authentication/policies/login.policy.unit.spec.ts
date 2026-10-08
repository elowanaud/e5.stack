import { test } from "@japa/runner";

import LoginPolicy from "#features/frontend/account_management/authentication/policies/login.policy";

test.group(
	"Features / Frontend / Account Management / Authentication / Policies / Login Policy",
	() => {
		test("it should allow everyone", async ({ assert }) => {
			const loginPolicy = new LoginPolicy();
			const canLogin = loginPolicy.handle();

			assert.isTrue(canLogin);
		});
	},
);
