import { useAppForm } from "@workspace/ui-react/integrations/tanstack-form";

import { useLoginMutation } from "#/features/auth/hooks/use-login-mutation";

export type LoginFormValues = {
	uid: string;
	password: string;
};

export type UseLoginFormParams = {
	defaultValues?: Partial<LoginFormValues>;
};

export function useLoginForm(params?: UseLoginFormParams) {
	const { defaultValues } = params ?? {};

	const { mutateAsync: login } = useLoginMutation();

	return useAppForm({
		defaultValues: {
			uid: "",
			password: "",
			...defaultValues,
		} as LoginFormValues,
		onSubmit: async ({ value }) => {
			await login({ body: value });
		},
	});
}
