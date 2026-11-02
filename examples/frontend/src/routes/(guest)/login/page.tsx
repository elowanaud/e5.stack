import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import { Link } from "@workspace/ui-react/components/link";
import { Separator } from "@workspace/ui-react/components/separator";
import { BoxIcon } from "@workspace/ui-react/icons";

import { LoginForm } from "#/features/auth/components/login-form";
import { ContinueWithButton } from "#/features/oauth/components/button";

export const Route = createFileRoute("/(guest)/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation("routes.(guest).login");

	return (
		<div className="m-auto grid min-h-svh max-w-sm content-center items-center justify-center gap-8">
			<header className="flex flex-col items-center gap-3">
				<BoxIcon className="text-primary-9 size-9" />
				<h1 className="text-neutral-12 text-2xl font-semibold">{t("title")}</h1>
			</header>

			<main className="grid gap-4">
				<ContinueWithButton provider="github" />

				<Separator>{t("separator")}</Separator>

				<LoginForm />
			</main>

			<footer className="grid items-center gap-6">
				<p className="text-neutral-11 text-center text-sm">
					<Trans
						t={t}
						i18nKey="signup"
						components={{
							action: <Link render={<RouterLink to={"/register"} />} />,
						}}
					/>
				</p>

				<p className="text-neutral-11 text-center text-sm">
					<Trans
						t={t}
						i18nKey="legal"
						components={{
							terms: <Link href="https://www.termsofusegenerator.net/" target="_blank" />,
							privacy: <Link href="https://www.termsofusegenerator.net/" target="_blank" />,
						}}
					/>
				</p>
			</footer>
		</div>
	);
}
