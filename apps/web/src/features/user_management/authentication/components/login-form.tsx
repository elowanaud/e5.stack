import { useTranslation } from "react-i18next";
import { useLoginForm } from "../hooks/use-login-form";

type LoginFormProps = {
	redirectTo?: string;
};

export function LoginForm(props: LoginFormProps) {
	const { redirectTo } = props;

	const { t } = useTranslation("features.user_management.authentication.components.login-form");

	const form = useLoginForm(undefined, { redirectTo });

	return (
		<form
			className="grid gap-4"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			noValidate
		>
			<form.AppField name="uid">
				{(field) => <field.TextField label={t("field.email.label")} />}
			</form.AppField>

			<form.AppField name="password">
				{(field) => <field.PasswordField label={t("field.password.label")} />}
			</form.AppField>

			<form.AppForm>
				<form.SubmitButton variant="primary">{t("action.login")}</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}
