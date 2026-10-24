import { Exception } from "@adonisjs/core/exceptions";

export default class GuestOnlyException extends Exception {
	static status = 403;
	static code = "E_GUEST_ONLY";
	static message = "You must be unauthenticated to access this resource.";
}
