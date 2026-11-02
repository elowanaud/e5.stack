import { useTranslation } from "react-i18next";

import { useLoginForm } from "#/features/auth/hooks/use-login-form";

export function LoginForm() {
	const { t } = useTranslation("features.auth.components.login-form");

	const form = useLoginForm();

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			noValidate
			className="grid gap-3"
		>
			<form.AppField name="uid">
				{(field) => <field.TextField label={t("field.uid.label")} inputProps={{ type: "email" }} />}
			</form.AppField>

			<form.AppField name="password">
				{(field) => <field.PasswordField label={t("field.password.label")} />}
			</form.AppField>

			<form.AppForm>
				<form.SubmitButton>{t("action.login")}</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}
