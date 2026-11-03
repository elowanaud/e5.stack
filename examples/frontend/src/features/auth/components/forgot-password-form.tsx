import { useTranslation } from "react-i18next";

import {
	type UseForgotPasswordFormParams,
	useForgotPasswordForm,
} from "#/features/auth/hooks/use-forgot-password-form";

type ForgotPasswordFormProps = UseForgotPasswordFormParams;

export function ForgotPasswordForm(props: ForgotPasswordFormProps) {
	const { t } = useTranslation("features.auth.components.forgot-password-form");

	const form = useForgotPasswordForm(props);

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
			<form.AppField name="email">
				{(field) => (
					<field.TextField label={t("field.email.label")} inputProps={{ type: "email" }} />
				)}
			</form.AppField>

			<form.AppForm>
				<form.SubmitButton>{t("action.send")}</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}
