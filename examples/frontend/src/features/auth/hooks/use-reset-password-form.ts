import { revalidateLogic } from "@tanstack/react-form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import z from "zod";

import { useAppForm } from "@workspace/ui-react/integrations/tanstack-form";

import { useResetPasswordMutation } from "#/features/auth/hooks/use-reset-password-mutation";
import { convertTuyauErrorToFormErrorMap, focusFirstInvalidInput } from "#/utils/form";

export type ResetPasswordFormValues = {
	password: string;
	passwordConfirmation: string;
};

export type UseResetPasswordFormParams = {
	token: string;
	defaultValues?: Partial<ResetPasswordFormValues>;
};

export function useResetPasswordForm(params: UseResetPasswordFormParams) {
	const { token, defaultValues } = params;

	const { t } = useTranslation("features.auth.hooks.use-reset-password-form");
	const { mutateAsync: resetPassword, error } = useResetPasswordMutation();

	const form = useAppForm({
		defaultValues: {
			password: "",
			passwordConfirmation: "",
			...defaultValues,
		},
		validationLogic: revalidateLogic(),
		validators: {
			onDynamic: z
				.object({
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
			await resetPassword({ body: { token, ...value } });
		},
	});

	useEffect(() => {
		if (error?.isValidationError()) {
			const errorMap = convertTuyauErrorToFormErrorMap(error, t);
			if (errorMap) {
				form.setErrorMap({ onDynamic: { fields: errorMap } });
			}
		}
	}, [error, t, form]);

	return form;
}
