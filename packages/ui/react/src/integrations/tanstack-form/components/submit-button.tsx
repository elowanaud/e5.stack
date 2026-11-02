import { Button, type ButtonProps } from "../../../components/button";
import { Spinner } from "../../../components/spinner";
import { useFormContext } from "../index";

type SubmitButtonProps = Omit<ButtonProps, "type">;

export function SubmitButton(props: SubmitButtonProps) {
	const { children, disabled, variant = "primary", ...rest } = props;

	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" disabled={isSubmitting || disabled} variant={variant} {...rest}>
					{isSubmitting && <Spinner />}
					{children}
				</Button>
			)}
		</form.Subscribe>
	);
}
