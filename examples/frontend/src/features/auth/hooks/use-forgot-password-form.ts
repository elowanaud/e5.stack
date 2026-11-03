import { revalidateLogic } from "@tanstack/react-form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import z from "zod";

import { useAppForm } from "@workspace/ui-react/integrations/tanstack-form";

import { useForgotPasswordMutation } from "#/features/auth/hooks/use-forgot-password-mutation";
import { convertTuyauErrorToFormErrorMap, focusFirstInvalidInput } from "#/utils/form";

export type ForgotPasswordFormValues = {
	email: string;
};

export type UseForgotPasswordFormParams = {
	defaultValues?: Partial<ForgotPasswordFormValues>;
};

export function useForgotPasswordForm(params?: UseForgotPasswordFormParams) {
	const { defaultValues } = params ?? {};

	const { t } = useTranslation("features.auth.hooks.use-forgot-password-form");
	const { mutateAsync: forgotPassword, error } = useForgotPasswordMutation();

	const form = useAppForm({
		defaultValues: {
			email: "",
			...defaultValues,
		},
		validationLogic: revalidateLogic(),
		validators: {
			onDynamic: z.object({
				email: z.email({ error: t("validation.email.email") }),
			}),
		},
		onSubmitInvalid: focusFirstInvalidInput,
		onSubmit: async ({ value }) => {
			await forgotPassword({ body: value });
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
