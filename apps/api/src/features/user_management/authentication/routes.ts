import router from "@adonisjs/core/services/router";
import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";
import { throttle } from "#start/limiter";

router
	.group(() => {
		router
			.post("/login", [controllers.features.userManagement.authentication.LoginWithCredentials])
			.use(middleware.guest())
			.use(throttle);
		router
			.delete("/logout", [controllers.features.userManagement.authentication.Logout])
			.use(middleware.auth());
	})
	.prefix("/auth")
	.as("auth");
