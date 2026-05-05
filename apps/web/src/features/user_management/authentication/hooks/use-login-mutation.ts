import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { api } from "#/libs/tuyau";
import { toastifyTuyauError } from "#/utils/tuyau";

type UseLoginMutationParams = never;

type UseLoginMutationOptions = {
	redirectTo?: string;
};

export function useLoginMutation(
	_params?: UseLoginMutationParams,
	options?: UseLoginMutationOptions,
) {
	const { t } = useTranslation("features.user_management.authentication.hooks.use-login-mutation");

	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(
		api.auth.loginWithCredentials.mutationOptions({
			onSuccess: () => {
				queryClient.removeQueries({
					queryKey: api.profile.view.pathKey(),
				});
				navigate({ to: options?.redirectTo ?? "/" });
			},
			onError: (error) => {
				toastifyTuyauError(error, {
					E_NETWORK: t("error.E_NETWORK"),
					E_VALIDATION: t("error.E_INVALID_CREDENTIALS"),
					E_GUEST_ONLY: t("error.E_GUEST_ONLY"),
					E_INVALID_CREDENTIALS: t("error.E_INVALID_CREDENTIALS"),
					E_UNEXPECTED: t("error.E_UNEXPECTED"),
				});
			},
		}),
	);
}
