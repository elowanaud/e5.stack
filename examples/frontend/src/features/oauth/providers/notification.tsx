import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { toast } from "@workspace/ui-react/components/toast";

export function OauthNotificationProvider() {
	const { t } = useTranslation("features.oauth.providers.notification");

	const navigate = useNavigate();
	const { oauth_state } = useSearch({ from: "__root__" });

	useEffect(() => {
		const renderToast = () => {
			if (oauth_state === undefined) return;

			const type = oauth_state === "success" ? "success" : "error";

			setTimeout(() => {
				toast[type](t(`${oauth_state}.title`), { description: t(`${oauth_state}.description`) });
			}, 0);
		};

		if (oauth_state) {
			renderToast();
			navigate({
				to: ".",
				search: (old) => {
					const { oauth_state, ...rest } = old;
					return rest;
				},
			});
		}
	}, [oauth_state, navigate, t]);

	return null;
}
