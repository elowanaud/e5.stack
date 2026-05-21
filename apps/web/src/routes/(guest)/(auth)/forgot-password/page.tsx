import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ForgotPasswordForm } from "#/features/user_management/authentication/components/forgot-password-form";

export const Route = createFileRoute("/(guest)/(auth)/forgot-password/")({
	component: Page,
});

function Page() {
	const { t } = useTranslation("routes.(guest).(auth).forgot-password");

	return (
		<>
			<h1 className="mb-9 font-serif text-4xl text-primary-11 sm:text-5xl">{t("title")}</h1>

			<ForgotPasswordForm />
		</>
	);
}
