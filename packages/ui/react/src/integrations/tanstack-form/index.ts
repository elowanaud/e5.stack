import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { GenericField } from "./components/generic-field";
import { PasswordField } from "./components/password-field";
import { SubmitButton } from "./components/submit-button";
import { TextField } from "./components/text-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		GenericField,
		TextField,
		PasswordField,
	},
	formComponents: {
		SubmitButton,
	},
});
