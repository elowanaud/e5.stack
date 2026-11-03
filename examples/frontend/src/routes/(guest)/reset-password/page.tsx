import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import z from "zod";

import { toast } from "@workspace/ui-react/components/toast";
import { BoxIcon } from "@workspace/ui-react/icons";

import { ResetPasswordForm } from "#/features/auth/components/reset-password-form";

const searchSchema = z.object({
	token: z.string().optional(),
});

export const Route = createFileRoute("/(guest)/reset-password/")({
	validateSearch: searchSchema,
	component: Page,
});

function Page() {
	const { t } = useTranslation("routes.(guest).reset-password");

	const navigate = Route.useNavigate();
	const { token } = Route.useSearch();

	useEffect(() => {
		if (token) return;

		const timeout = setTimeout(() => {
			toast.error(t("error.invalid-token.title"), {
				description: t("error.invalid-token.description"),
			});
		});

		navigate({ to: "/login", replace: true });

		return () => clearTimeout(timeout);
	}, [token, t, navigate]);

	if (!token) return null;

	return (
		<div className="mx-auto flex min-h-svh w-full max-w-sm flex-col justify-center gap-8 p-4">
			<header className="flex flex-col items-center gap-3 text-center">
				<BoxIcon className="text-primary-9 size-9" />
				<h1 className="text-neutral-12 text-2xl font-semibold">{t("title")}</h1>
				<p className="text-neutral-11 text-sm">{t("description")}</p>
			</header>

			<main className="grid gap-4">
				<ResetPasswordForm token={token} />
			</main>
		</div>
	);
}
