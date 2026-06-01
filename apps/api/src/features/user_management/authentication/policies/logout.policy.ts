import { BasePolicy } from "@adonisjs/bouncer";

export default class LogoutPolicy extends BasePolicy {
	async handle() {
		return true;
	}
}
