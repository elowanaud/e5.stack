import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "@workspace/ui-react/components/toast";
import { useTranslation } from "react-i18next";
import { api } from "#/libs/tuyau";
import { toastifyTuyauError } from "#/utils/tuyau";

export function useForgotPasswordMutation() {
	const { t } = useTranslation(
		"features.user_management.authentication.hooks.use-forgot-password-mutation",
	);

	const navigate = useNavigate();

	return useMutation(
		api.auth.password.forgot.mutationOptions({
			onSuccess: () => {
				toast.success(t("success.title"), {
					description: t("success.description"),
				});
				navigate({ to: "/login" });
			},
			onError: (error) => {
				toastifyTuyauError(error, {
					E_NETWORK: [
						t("error.E_NETWORK.title"),
						{ description: t("error.E_NETWORK.description") },
					],
					E_VALIDATION: [
						t("error.E_VALIDATION.title"),
						{ description: t("error.E_VALIDATION.description") },
					],
					E_GUEST_ONLY: [
						t("error.E_GUEST_ONLY.title"),
						{ description: t("error.E_GUEST_ONLY.description") },
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
