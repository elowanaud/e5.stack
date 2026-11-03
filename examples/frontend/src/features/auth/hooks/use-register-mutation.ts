import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { toast } from "@workspace/ui-react/components/toast";

import { api } from "#/libs/tuyau";
import { toastifyTuyauError } from "#/utils/tuyau";

export function useRegisterMutation() {
	const { t } = useTranslation("features.auth.hooks.use-register-mutation");
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(
		api.auth.register.mutationOptions({
			onSuccess: (data) => {
				queryClient.setQueryData(api.profile.view.queryKey(), data);
				toast.success(t("success.title"), { description: t("success.description") });
				navigate({ to: "/" });
			},
			onError: (error) => {
				toastifyTuyauError(error, {
					E_NETWORK: [
						t("error.E_NETWORK.title"),
						{ description: t("error.E_NETWORK.description") },
					],
					E_UNEXPECTED: [
						t("error.E_UNEXPECTED.title"),
						{ description: t("error.E_UNEXPECTED.description") },
					],
					E_VALIDATION: [
						t("error.E_VALIDATION.title"),
						{ description: t("error.E_VALIDATION.description") },
					],
					E_GUEST_ONLY: [
						t("error.E_GUEST_ONLY.title"),
						{ description: t("error.E_GUEST_ONLY.description") },
					],
				});
			},
		}),
	);
}
