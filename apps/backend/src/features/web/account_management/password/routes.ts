import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";
import { brutForceLimiter } from "#start/limiter";

router
	.group(() => {
		router
			.group(() => {
				router.post("/forgot", [controllers.features.web.accountManagement.password.Forgot]);
				router.post("/reset", [controllers.features.web.accountManagement.password.Reset]);
			})
			.use(middleware.guest())
			.use(brutForceLimiter);

		router
			.group(() => {
				router.put("/", [controllers.features.web.accountManagement.password.Update]);
			})
			.use(middleware.auth({ guards: ["web"] }));
	})
	.prefix("/web/account-management/password")
	.as("web.account_management.password");
