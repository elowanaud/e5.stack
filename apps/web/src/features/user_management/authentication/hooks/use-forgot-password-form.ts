import { revalidateLogic } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import z from "zod";
import { useForgotPasswordMutation } from "#/features/user_management/authentication/hooks/use-forgot-password-mutation";
import { useAppForm } from "#/libs/form";

export function useForgotPasswordForm() {
	const { t } = useTranslation(
		"features.user_management.authentication.hooks.use-forgot-password-form",
	);

	const { mutateAsync: forgotPassword } = useForgotPasswordMutation();

	return useAppForm({
		defaultValues: {
			email: "",
		},
		validationLogic: revalidateLogic(),
		validators: {
			onDynamic: z.object({
				email: z.email({ error: t("validation.email.invalid") }),
			}),
		},
		onSubmit: async ({ value }) => {
			await forgotPassword({
				body: value,
			});
		},
	});
}
