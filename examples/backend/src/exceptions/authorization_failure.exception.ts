import { Exception } from "@adonisjs/core/exceptions";

export default class AuthorizationFailureException extends Exception {
	static status = 403;
	static code = "E_AUTHORIZATION_FAILURE";
	static message = "You are not authorized to perform this action.";
}
