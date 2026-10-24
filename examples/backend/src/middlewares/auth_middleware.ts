import type { Authenticators } from "@adonisjs/auth/types";
import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";
import * as Sentry from "@sentry/node";

export default class AuthMiddleware {
	async handle(
		ctx: HttpContext,
		next: NextFn,
		options: {
			guards?: (keyof Authenticators)[];
		} = {},
	) {
		const user = await ctx.auth.authenticateUsing(options.guards);

		Sentry.setUser({
			id: user.id,
			email: user.email,
			ip_address: ctx.request.ip(),
		});

		return next();
	}
}
