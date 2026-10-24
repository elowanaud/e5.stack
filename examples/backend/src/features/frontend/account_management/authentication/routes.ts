import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";
import { brutForceLimiter } from "#start/limiter";

router
	.group(() => {
		router
			.post("/login", [controllers.features.frontend.accountManagement.authentication.Login])
			.use(middleware.guest())
			.use(brutForceLimiter);
		router
			.delete("/logout", [controllers.features.frontend.accountManagement.authentication.Logout])
			.use(middleware.auth({ guards: ["web"] }));
	})
	.prefix("/frontend/account-management/authentication")
	.as("frontend.account_management.authentication");
