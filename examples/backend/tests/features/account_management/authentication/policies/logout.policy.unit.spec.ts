import { test } from "@japa/runner";

import LogoutPolicy from "#features/frontend/account_management/authentication/policies/logout.policy";

test.group(
	"Features / Frontend / Account Management / Authentication / Policies / Logout Policy",
	() => {
		test("it should allow everyone to logout", async ({ assert }) => {
			const logoutPolicy = new LogoutPolicy();
			const canLogout = logoutPolicy.handle();

			assert.isTrue(canLogout);
		});
	},
);
