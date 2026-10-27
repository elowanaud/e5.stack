import type { HttpContext } from "@adonisjs/core/http";
import app from "@adonisjs/core/services/app";
import type { NextFn } from "@adonisjs/core/types/http";
import limiter from "@adonisjs/limiter/services/main";

const botLimiter = limiter.use({
	requests: 200,
	duration: "1 minute",
	blockDuration: "1 minutes",
});

export default class BotLimiterMiddleware {
	async handle(ctx: HttpContext, next: NextFn) {
		if (!app.inTest) {
			await botLimiter.consume(ctx.request.ip());
		}

		return next();
	}
}
