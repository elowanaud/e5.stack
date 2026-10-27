import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";

router
	.group(() => {
		router.get("/", [controllers.features.frontend.profile.View]);
	})
	.middleware(middleware.auth({ guards: ["frontend"] }))
	.prefix("/frontend/profile")
	.as("frontend.profile");
