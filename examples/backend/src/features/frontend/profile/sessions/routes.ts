import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";

router
	.group(() => {
		router.get("/", [controllers.features.frontend.profile.sessions.List]);
		// Register static paths before the dynamic session identifier.
		router.delete("/others", [controllers.features.frontend.profile.sessions.DeleteOthers]);
		router.delete("/:sessionId", [controllers.features.frontend.profile.sessions.Delete]);
	})
	.middleware(middleware.auth({ guards: ["frontend"] }))
	.prefix("/frontend/profile/sessions")
	.as("frontend.profile.sessions");
