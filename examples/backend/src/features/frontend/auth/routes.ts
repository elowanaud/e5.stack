import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";
import { middleware } from "#start/kernel";
import { brutForceLimiter } from "#start/limiter";

router
	.group(() => {
		router
			.post("/login", [controllers.features.frontend.auth.Login])
			.middleware(middleware.guest({ guards: ["frontend"] }));
		router
			.post("/register", [controllers.features.frontend.auth.Register])
			.middleware(middleware.guest({ guards: ["frontend"] }));
		router
			.post("/forgot-password", [controllers.features.frontend.auth.ForgotPassword])
			.middleware(middleware.guest({ guards: ["frontend"] }));
		router
			.post("/reset-password", [controllers.features.frontend.auth.ResetPassword])
			.middleware(middleware.guest({ guards: ["frontend"] }));
		router
			.delete("/logout", [controllers.features.frontend.auth.Logout])
			.middleware(middleware.auth({ guards: ["frontend"] }));
	})
	.use(brutForceLimiter)
	.prefix("/frontend/auth")
	.as("frontend.auth");
