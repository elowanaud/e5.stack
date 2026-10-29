import { Link, type NotFoundRouteProps } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@workspace/ui-react/components/button";

export function NotFoundPage(_props: NotFoundRouteProps) {
	const { t } = useTranslation("components.pages.not-found");

	return (
		<main className="flex min-h-svh flex-col items-center justify-center p-4 text-center">
			<h1 className="text-primary-11 mb-2 font-serif text-5xl">{t("title")}</h1>
			<p className="text-neutral-11 mb-8 text-sm">{t("descritpion")}</p>
			<Button nativeButton={false} variant="primary" render={<Link to="/" />}>
				{t("back")}
			</Button>
		</main>
	);
}
