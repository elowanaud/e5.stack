import { inject } from "@adonisjs/core";
import ProfileService from "#features/user_management/profile/services/profile.service";

@inject()
export default class DeleteProfileController {
	constructor(protected profileService: ProfileService) {}

	async handle() {
		await this.profileService.delete();

		return null;
	}
}
