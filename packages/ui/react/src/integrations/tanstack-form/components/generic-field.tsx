import type { ReactNode } from "react";

import { Field } from "../../../components/field";
import { useFieldContext } from "../index";

export type GenericFieldProps = {
	label?: string;
	description?: string;
	required?: boolean;
	disabled?: boolean;
	children?: ReactNode;
};

export function GenericField(props: GenericFieldProps) {
	const { label, description, required, disabled, children } = props;

	const field = useFieldContext();

	return (
		<Field
			name={field.name}
			invalid={!field.state.meta.isValid}
			disabled={disabled}
			className="flex flex-col gap-1"
		>
			{label && <Field.Label required={required}>{label}</Field.Label>}
			{children}
			{description && <Field.Description>{description}</Field.Description>}
			{field.state.meta.errors.map((error) => {
				return <Field.Error key={`${error.code}-${error.path}`}>{error.message}</Field.Error>;
			})}
		</Field>
	);
}
