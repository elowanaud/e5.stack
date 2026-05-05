import type { TuyauError } from "@tuyau/core/client";

export function toastifyTuyauError(
	error: TuyauError,
	errorMessages: {
		E_NETWORK: string;
		E_UNEXPECTED: string;
		E_VALIDATION?: string;
	} & Record<string, string>,
) {
	const { E_NETWORK, E_UNEXPECTED, E_VALIDATION, ...customErrors } = errorMessages;

	if (error.kind === "network") {
		return console.error(E_NETWORK); // Convert this to a toast notification in the future
	}

	if (error.isValidationError()) {
		return console.error(E_VALIDATION); // Convert this to a toast notification in the future
	}

	if (customErrors) {
		const customError = Object.entries(customErrors).find(
			([code]) => error.response?.code === code,
		);

		if (customError) {
			const [, message] = customError;
			return console.error(message); // Convert this to a toast notification in the future
		}
	}

	return console.error(E_UNEXPECTED); // Convert this to a toast notification in the future
}
