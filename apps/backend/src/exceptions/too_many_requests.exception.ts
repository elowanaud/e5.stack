import { Exception } from "@adonisjs/core/exceptions";

export default class TooManyRequestsException extends Exception {
	static status = 429;
	static code = "E_TOO_MANY_REQUESTS";
	static message = "Too many requests. Please try again later.";
}
