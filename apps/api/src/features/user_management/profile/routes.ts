import router from "@adonisjs/core/services/router";
import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";

router
	.group(() => {
		router.get("/", [controllers.features.userManagement.profile.View]);
	})
	.use(middleware.auth({ guards: ["web"] }))
	.prefix("/profile")
	.as("profile");
