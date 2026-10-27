import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";

router
	.group(() => {
		router.get("/redirect", [controllers.features.frontend.oauth.Redirect]);
		router.get("/callback", [controllers.features.frontend.oauth.Callback]);
	})
	.middleware(middleware.guest({ guards: ["frontend"] }))
	.prefix("/frontend/oauth/:provider")
	.as("frontend.oauth");
