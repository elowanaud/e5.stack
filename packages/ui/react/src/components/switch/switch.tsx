import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn, cx } from "tailwind-variants";

export type SwitchRootProps = SwitchPrimitive.Root.Props;

export function SwitchRoot(props: SwitchRootProps) {
	const { className, ...rest } = props;

	return (
		<SwitchPrimitive.Root
			className={cn(
				// Default
				"group flex h-5 w-9 rounded-full border border-neutral-7 bg-neutral-3 outline-none ring-primary-7 transition",
				// Hover
				"hover:not-data-disabled:border-neutral-8 hover:not-data-disabled:bg-neutral-4",
				// Focus
				"focus-visible:ring-3",
				// Checked
				"data-checked:border-primary-9 data-checked:bg-primary-9",
				// Checked Hover
				"data-checked:hover:not-disabled:border-primary-10 data-checked:hover:not-disabled:bg-primary-10",
				// Invalid
				"data-invalid:border-error-7",
				// Invalid Hover
				"data-invalid:hover:not-disabled:border-error-8",
				// Invalid Focus
				"data-invalid:focus-visible:ring-error-7",
				// Disabled
				"data-disabled:cursor-not-allowed data-disabled:opacity-50",
				// Overwrite
				className,
			)}
			{...rest}
		>
			<SwitchPrimitive.Thumb
				className={cx(
					// Default
					"aspect-square h-full rounded-full bg-neutral-1 ring ring-neutral-7 transition dark:bg-neutral-12",
					// Hover
					"group-hover:not-data-disabled:ring-neutral-8",
					// Checked
					"data-checked:translate-x-4 data-checked:ring-primary-9",
					// Checked Hover
					"data-checked:group-hover:not-data-disabled:ring-primary-10",
					// Invalid
					"data-invalid:ring-error-7",
					// Invalid Hover
					"data-invalid:group-hover:not-data-disabled:ring-error-8",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}
