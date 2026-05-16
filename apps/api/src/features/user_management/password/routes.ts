import router from "@adonisjs/core/services/router";
import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";

router
	.group(() => {
		router
			.post("/forgot-password", [controllers.features.userManagement.password.ForgotPassword])
			.use(middleware.guest());
		router
			.post("/reset-password", [controllers.features.userManagement.password.ResetPassword])
			.use(middleware.guest());
	})
	.prefix("/auth")
	.as("auth");
