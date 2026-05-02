import router from "@adonisjs/core/services/router";
import server from "@adonisjs/core/services/server";

server.errorHandler(() => import("#infrastructure/http/exception_handler"));

server.use([
	() => import("#infrastructure/http/middlewares/container_bindings.middleware"),
	() => import("#infrastructure/http/middlewares/force_json_response.middleware"),
	() => import("@adonisjs/cors/cors_middleware"),
]);

router.use([
	() => import("@adonisjs/session/session_middleware"),
	() => import("@adonisjs/core/bodyparser_middleware"),
	() => import("@tuyau/superjson/superjson_middleware"),
]);

export const middleware = router.named({});
