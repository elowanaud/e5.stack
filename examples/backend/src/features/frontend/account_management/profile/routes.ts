import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";

router
	.group(() => {
		router.get("/", [controllers.features.frontend.accountManagement.profile.View]);
		router.put("/", [controllers.features.frontend.accountManagement.profile.Update]);
		router.delete("/", [controllers.features.frontend.accountManagement.profile.Delete]);
	})
	.use(middleware.auth({ guards: ["web"] }))
	.prefix("/frontend/account-management/profile")
	.as("frontend.account_management.profile");
