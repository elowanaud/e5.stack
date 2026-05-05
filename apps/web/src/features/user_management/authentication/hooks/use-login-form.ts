import { useAppForm } from "#/libs/form";
import { useLoginMutation } from "./use-login-mutation";

type UseLoginFormParams = never;

type UseLoginFormOptions = {
	redirectTo?: string;
};

export function useLoginForm(_params?: UseLoginFormParams, options?: UseLoginFormOptions) {
	const { mutateAsync: login } = useLoginMutation(undefined, { redirectTo: options?.redirectTo });

	return useAppForm({
		defaultValues: {
			uid: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await login({
				body: value,
			});
		},
	});
}
