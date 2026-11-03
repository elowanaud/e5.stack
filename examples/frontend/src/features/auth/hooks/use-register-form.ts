import { revalidateLogic } from "@tanstack/react-form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import z from "zod";

import { useAppForm } from "@workspace/ui-react/integrations/tanstack-form";

import { useRegisterMutation } from "#/features/auth/hooks/use-register-mutation";
import { convertTuyauErrorToFormErrorMap, focusFirstInvalidInput } from "#/utils/form";

export type RegisterFormValues = {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
};

export type UseRegisterFormParams = {
	defaultValues?: Partial<RegisterFormValues>;
};

export function useRegisterForm(params?: UseRegisterFormParams) {
	const { defaultValues } = params ?? {};

	const { t } = useTranslation("features.auth.hooks.use-register-form");

	const { mutateAsync: register, error: registerError } = useRegisterMutation();

	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			...defaultValues,
		} as RegisterFormValues,
		validationLogic: revalidateLogic(),
		validators: {
			onDynamic: z
				.object({
					name: z
						.string({ error: t("validation.name.string") })
						.trim()
						.min(2, { error: t("validation.name.minLength") })
						.max(254, { error: t("validation.name.maxLength") }),
					email: z.email({ error: t("validation.email.email") }),
					password: z
						.string({ error: t("validation.password.string") })
						.min(8, { error: t("validation.password.minLength") })
						.max(32, { error: t("validation.password.maxLength") }),
					passwordConfirmation: z.string({
						error: t("validation.passwordConfirmation.string"),
					}),
				})
				.refine((data) => data.password === data.passwordConfirmation, {
					message: t("validation.passwordConfirmation.confirmed"),
					path: ["passwordConfirmation"],
				}),
		},
		onSubmitInvalid: focusFirstInvalidInput,
		onSubmit: async ({ value }) => {
			await register({ body: value });
		},
	});

	useEffect(() => {
		let errorMap = null;

		if (registerError?.isValidationError()) {
			errorMap = convertTuyauErrorToFormErrorMap(registerError, t);
		}

		if (errorMap) {
			form.setErrorMap({ onDynamic: { fields: errorMap } });
		}
	}, [registerError, t, form]);

	return form;
}
