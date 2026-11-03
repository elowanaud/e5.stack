import { useTranslation } from "react-i18next";

import {
	type UseResetPasswordFormParams,
	useResetPasswordForm,
} from "#/features/auth/hooks/use-reset-password-form";

type ResetPasswordFormProps = UseResetPasswordFormParams;

export function ResetPasswordForm(props: ResetPasswordFormProps) {
	const { t } = useTranslation("features.auth.components.reset-password-form");

	const form = useResetPasswordForm(props);

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
			<form.AppField name="password">
				{(field) => (
					<field.PasswordField
						label={t("field.password.label")}
						inputProps={{ autoComplete: "new-password" }}
					/>
				)}
			</form.AppField>

			<form.AppField name="passwordConfirmation">
				{(field) => (
					<field.PasswordField
						label={t("field.passwordConfirmation.label")}
						inputProps={{ autoComplete: "new-password" }}
					/>
				)}
			</form.AppField>

			<form.AppForm>
				<form.SubmitButton>{t("action.reset")}</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}
