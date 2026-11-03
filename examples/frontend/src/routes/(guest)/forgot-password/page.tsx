import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Link } from "@workspace/ui-react/components/link";
import { BoxIcon } from "@workspace/ui-react/icons";

import { ForgotPasswordForm } from "#/features/auth/components/forgot-password-form";

export const Route = createFileRoute("/(guest)/forgot-password/")({
	component: Page,
});

function Page() {
	const { t } = useTranslation("routes.(guest).forgot-password");

	return (
		<div className="mx-auto flex min-h-svh w-full max-w-sm flex-col justify-center gap-8 p-4">
			<header className="flex flex-col items-center gap-3">
				<BoxIcon className="text-primary-9 size-9" />
				<h1 className="text-neutral-12 text-center text-2xl font-semibold">{t("title")}</h1>
				<p className="text-neutral-11 text-center text-sm">{t("description")}</p>
			</header>

			<main className="grid gap-4">
				<ForgotPasswordForm />
			</main>

			<footer className="text-center text-sm">
				<Link render={<RouterLink to="/login" />}>{t("login")}</Link>
			</footer>
		</div>
	);
}
