import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { toast } from "@workspace/ui-react/components/toast";

export function OauthNotificationProvider() {
	const { t } = useTranslation("features.oauth.providers.notification");

	const navigate = useNavigate();
	const { oauth_state } = useSearch({ from: "__root__" });

	useEffect(() => {
		if (oauth_state) {
			const type = oauth_state === "success" ? "success" : "error";
			const timeout = setTimeout(() => {
				toast[type](t(`${oauth_state}.title`), { description: t(`${oauth_state}.description`) });
			});
			navigate({
				to: ".",
				search: (old) => {
					const { oauth_state, ...rest } = old;
					return rest;
				},
			});

			return () => clearTimeout(timeout);
		}
	}, [oauth_state, navigate, t]);

	return null;
}
