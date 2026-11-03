import { Link as RouterLink } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Field } from "@workspace/ui-react/components/field";
import { Link } from "@workspace/ui-react/components/link";
import { PasswordInput } from "@workspace/ui-react/components/password-input";

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
				{(field) => (
					<field.GenericField>
						<div className="flex items-end justify-between">
							<Field.Label>{t("field.password.label")}</Field.Label>
							<Link
								className="text-xs underline-offset-2"
								render={<RouterLink to="/forgot-password" />}
							>
								{t("action.forgot-password")}
							</Link>
						</div>

						<PasswordInput
							id={field.name}
							name={field.name}
							value={field.state.value}
							onValueChange={(e) => field.handleChange(e)}
							onBlur={field.handleBlur}
						/>
					</field.GenericField>
				)}
			</form.AppField>

			<form.AppForm>
				<form.SubmitButton>{t("action.login")}</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}
