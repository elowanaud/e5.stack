import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";

router
	.group(() => {
		router
			.post("/login", [controllers.features.frontend.auth.LoginWithCredentials])
			.middleware(middleware.guest({ guards: ["frontend"] }));
		router
			.delete("/logout", [controllers.features.frontend.auth.Logout])
			.middleware(middleware.auth({ guards: ["frontend"] }));
	})
	.prefix("/frontend/auth")
	.as("frontend.auth");
