import * as Sentry from "@sentry/tanstackstart-react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@workspace/ui/components/button";

export function UnexpectedPage(props: ErrorComponentProps) {
	const { error, reset } = props;

	const { t } = useTranslation("components.pages.unexpected");

	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<main className="flex min-h-svh flex-col items-center justify-center p-4 text-center">
			<h1 className="mb-2 font-serif text-5xl">{t("title")}</h1>
			<p className="mb-8 text-sm">{t("description")}</p>
			<Button variant="default" onClick={reset}>
				{t("retry")}
			</Button>
		</main>
	);
}
