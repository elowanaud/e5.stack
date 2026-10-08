import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";
import limiter from "@adonisjs/limiter/services/main";

const botLimiter = limiter.use({
	requests: 100,
	duration: "1 minute",
	blockDuration: "20 minutes",
});

export default class BotLimiterMiddleware {
	async handle(ctx: HttpContext, next: NextFn) {
		await botLimiter.consume(ctx.request.ip());

		return next();
	}
}
