import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";

router
	.group(() => {
		router.get("/", [controllers.features.web.accountManagement.profile.View]);
		router.put("/", [controllers.features.web.accountManagement.profile.Update]);
		router.delete("/", [controllers.features.web.accountManagement.profile.Delete]);
	})
	.use(middleware.auth({ guards: ["web"] }))
	.prefix("/web/account-management/profile")
	.as("web.account_management.profile");
