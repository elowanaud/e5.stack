import router from "@adonisjs/core/services/router";

import { controllers } from "#generated/controllers";

router
	.group(() => {
		router.get("/live", [controllers.features.core.healthChecks.Live]);
		router.get("/ready", [controllers.features.core.healthChecks.Ready]);
	})
	.prefix("/core/health")
	.as("core.health");
