import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";
import { brutForceLimiter } from "#start/limiter";

router
	.group(() => {
		router
			.group(() => {
				router.post("/forgot", [controllers.features.frontend.accountManagement.password.Forgot]);
				router.post("/reset", [controllers.features.frontend.accountManagement.password.Reset]);
			})
			.use(middleware.guest())
			.use(brutForceLimiter);

		router
			.group(() => {
				router.put("/", [controllers.features.frontend.accountManagement.password.Update]);
			})
			.use(middleware.auth({ guards: ["web"] }));
	})
	.prefix("/frontend/account-management/password")
	.as("frontend.account_management.password");
