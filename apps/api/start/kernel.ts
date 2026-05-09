import router from "@adonisjs/core/services/router";
import server from "@adonisjs/core/services/server";

server.errorHandler(() => import("#exceptions/handler"));

server.use([
	() => import("#middlewares/container_bindings.middleware"),
	() => import("#middlewares/force_json_response.middleware"),
	() => import("@adonisjs/cors/cors_middleware"),
]);

router.use([
	() => import("@adonisjs/session/session_middleware"),
	() => import("@adonisjs/core/bodyparser_middleware"),
	() => import("@adonisjs/auth/initialize_auth_middleware"),
	() => import("#features/user_management/authentication/middleware/silent_auth_middleware"),
	() => import("@tuyau/superjson/superjson_middleware"),
]);

export const middleware = router.named({
	auth: () => import("#features/user_management/authentication/middleware/auth_middleware"),
	guest: () => import("#features/user_management/authentication/middleware/guest_middleware"),
});
