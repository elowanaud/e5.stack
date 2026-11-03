import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { toast } from "@workspace/ui-react/components/toast";

import { api } from "#/libs/tuyau";
import { toastifyTuyauError } from "#/utils/tuyau";

export function useLogoutMutation() {
	const { t } = useTranslation("features.auth.hooks.use-logout-mutation");
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(
		api.auth.logout.mutationOptions({
			onSettled: () => {
				queryClient.removeQueries(api.profile.view.queryFilter());
			},
			onSuccess: () => {
				toast.success(t("success.title"), { description: t("success.description") });
				navigate({ to: "/login" });
			},
			onError: (error) => {
				toastifyTuyauError(error, {
					E_NETWORK: [
						t("error.E_NETWORK.title"),
						{ description: t("error.E_NETWORK.description") },
					],
					E_TOO_MANY_REQUESTS: [
						t("error.E_TOO_MANY_REQUESTS.title"),
						{ description: t("error.E_TOO_MANY_REQUESTS.description") },
					],
					E_UNEXPECTED: [
						t("error.E_UNEXPECTED.title"),
						{ description: t("error.E_UNEXPECTED.description") },
					],
					E_UNAUTHENTICATED: [
						t("error.E_UNAUTHENTICATED.title"),
						{ description: t("error.E_UNAUTHENTICATED.description") },
					],
				});
			},
		}),
	);
}
