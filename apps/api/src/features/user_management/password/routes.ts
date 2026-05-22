import router from "@adonisjs/core/services/router";
import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";
import { throttle } from "#start/limiter";

router
	.group(() => {
		router.post("/forgot-password", [controllers.features.userManagement.password.Forgot]);
		router.post("/reset-password", [controllers.features.userManagement.password.Reset]);
	})
	.use(middleware.guest())
	.use(throttle)
	.prefix("/auth")
	.as("auth.password");

router
	.group(() => {
		router.put("/password", [controllers.features.userManagement.password.Update]).as("password");
	})
	.use(middleware.auth({ guards: ["web"] }))
	.prefix("/profile")
	.as("profile");
