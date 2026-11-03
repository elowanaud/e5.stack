import { useTranslation } from "react-i18next";

import { useRegisterForm } from "#/features/auth/hooks/use-register-form";

export function RegisterForm() {
	const { t } = useTranslation("features.auth.components.register-form");

	const form = useRegisterForm();

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
			<form.AppField name="name">
				{(field) => <field.TextField label={t("field.name.label")} />}
			</form.AppField>

			<form.AppField name="email">
				{(field) => (
					<field.TextField label={t("field.email.label")} inputProps={{ type: "email" }} />
				)}
			</form.AppField>

			<form.AppField name="password">
				{(field) => <field.PasswordField label={t("field.password.label")} />}
			</form.AppField>

			<form.AppField name="passwordConfirmation">
				{(field) => <field.PasswordField label={t("field.passwordConfirmation.label")} />}
			</form.AppField>

			<form.AppForm>
				<form.SubmitButton>{t("action.register")}</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}
