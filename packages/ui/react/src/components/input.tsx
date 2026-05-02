import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@workspace/ui-react/utils";
import { type CSSProperties, type ReactNode, useRef } from "react";
import { useElementSize } from "../hooks/use-element-size";

type InputProps = InputPrimitive.Props & {
	leftSlot?: ReactNode;
	rightSlot?: ReactNode;
};

function Input(props: InputProps) {
	const { className, leftSlot, rightSlot, ...rest } = props;

	const leftSlotRef = useRef<HTMLElement>(null);
	const leftSlotSize = useElementSize(leftSlotRef);
	const rightSlotRef = useRef<HTMLElement>(null);
	const rightSlotSize = useElementSize(rightSlotRef);

	const defaultClassName = cn(
		// Default
		"h-9 w-full flex-1 rounded-lg border border-neutral-7 bg-neutral-1 px-2 text-start text-base text-neutral-12 outline-none ring-primary-7 transition sm:text-sm",
		// Placeholder
		"placeholder:text-neutral-9",
		// Hover
		"hover:not-data-disabled:border-neutral-8",
		// Focus
		"focus-visible:border-primary-8 focus-visible:ring-3 focus-visible:hover:border-primary-8",
		// Popup open
		"data-popup-open:border-primary-8 data-popup-open:ring-3 data-popup-open:hover:border-primary-8",
		// Disabled
		"data-disabled:cursor-not-allowed",
		// Invalid
		"data-invalid:border-error-7 data-invalid:ring-error-7",
		// Invalid Hover
		"data-invalid:hover:not-data-disabled:border-error-8",
		// Invalid Focus
		"data-invalid:focus-visible:border-error-8 data-invalid:hover:border-error-8",
		// Invalid Popup open
		"data-invalid:data-popup-open:border-error-8 data-invalid:data-popup-open:hover:border-error-8",
		// With left slot
		leftSlot && "pl-[calc(0.5rem+var(--left-slot-width))]",
		// With right slot
		rightSlot && "pr-[calc(0.5rem+var(--right-slot-width))]",
		className,
	);

	return (
		<div className="relative inline-flex items-center has-data-disabled:opacity-50">
			{leftSlot && (
				<span ref={leftSlotRef} className="pointer-events-none absolute left-1.5 flex items-center">
					{leftSlot}
				</span>
			)}
			<InputPrimitive
				className={defaultClassName}
				style={
					{
						"--left-slot-width": `${leftSlotSize.width}px`,
						"--right-slot-width": `${rightSlotSize.width}px`,
					} as CSSProperties
				}
				{...rest}
			/>
			{rightSlot && (
				<span
					ref={rightSlotRef}
					className="pointer-events-none absolute right-1.5 flex items-center"
				>
					{rightSlot}
				</span>
			)}
		</div>
	);
}

export type { InputProps };
export { Input, InputPrimitive };
