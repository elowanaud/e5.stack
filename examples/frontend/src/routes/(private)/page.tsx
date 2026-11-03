import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@workspace/ui-react/components/button";

import { useLogoutMutation } from "#/features/auth/hooks/use-logout-mutation";

export const Route = createFileRoute("/(private)/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation("routes.(private).page");
	const { mutate: logout } = useLogoutMutation();

	return <Button onClick={() => logout({})}>{t("logout")}</Button>;
}
