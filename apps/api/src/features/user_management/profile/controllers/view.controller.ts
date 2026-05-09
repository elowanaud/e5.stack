import { HttpContext } from "@adonisjs/core/http";

export default class ViewProfileController {
	async handle({ auth }: HttpContext) {
		const user = auth.user!;

		return user.toJSON();
	}
}
