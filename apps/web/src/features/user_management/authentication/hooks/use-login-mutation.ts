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
					E_NETWORK: [
						t("error.E_NETWORK.title"),
						{ description: t("error.E_NETWORK.description") },
					],
					E_VALIDATION: [
						t("error.E_INVALID_CREDENTIALS.title"),
						{ description: t("error.E_INVALID_CREDENTIALS.description") },
					],
					E_GUEST_ONLY: [
						t("error.E_GUEST_ONLY.title"),
						{ description: t("error.E_GUEST_ONLY.description") },
					],
					E_INVALID_CREDENTIALS: [
						t("error.E_INVALID_CREDENTIALS.title"),
						{ description: t("error.E_INVALID_CREDENTIALS.description") },
					],
					E_TOO_MANY_REQUESTS: [
						t("error.E_TOO_MANY_REQUESTS.title"),
						{ description: t("error.E_TOO_MANY_REQUESTS.description") },
					],
					E_UNEXPECTED: [
						t("error.E_UNEXPECTED.title"),
						{ description: t("error.E_UNEXPECTED.description") },
					],
				});
			},
		}),
	);
}
