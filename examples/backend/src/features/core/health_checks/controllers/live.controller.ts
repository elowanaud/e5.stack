import type { HttpContext } from "@adonisjs/core/http";

export default class HealthChecksLiveController {
	async handle({ response }: HttpContext) {
		return response.ok(null);
	}
}
