import { useTranslation } from "react-i18next";
import { useForgotPasswordForm } from "#/features/user_management/authentication/hooks/use-forgot-password-form";

export function ForgotPasswordForm() {
	const { t } = useTranslation(
		"features.user_management.authentication.components.forgot-password-form",
	);

	const form = useForgotPasswordForm();

	return (
		<form
			className="grid gap-4"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.AppField name="email">
				{(field) => (
					<field.TextField label={t("field.email.label")} inputProps={{ type: "email" }} />
				)}
			</form.AppField>

			<form.AppForm>
				<form.SubmitButton variant="primary">{t("action.send_reset_email")}</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}
