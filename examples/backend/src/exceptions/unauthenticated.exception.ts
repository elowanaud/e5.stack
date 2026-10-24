import { Exception } from "@adonisjs/core/exceptions";

export default class UnauthenticatedException extends Exception {
	static status = 401;
	static code = "E_UNAUTHENTICATED";
	static message = "You must be authenticated to access this resource.";
}
