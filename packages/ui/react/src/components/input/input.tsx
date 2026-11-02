import { Input as InputHeadless } from "@base-ui/react/input";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "tailwind-variants";

import { useElementSize } from "../../hooks/use-element-size";

export type InputRootProps = InputHeadless.Props & {
	leftSlot?: ReactNode;
	rightSlot?: ReactNode;
};

export function InputRoot(props: InputRootProps) {
	const { className, leftSlot, rightSlot, ...rest } = props;

	const { ref: leftSlotRef, size: leftSlotSize } = useElementSize();
	const { ref: rightSlotRef, size: rightSlotSize } = useElementSize();

	return (
		<div className="relative flex has-[input[data-disabled]]:opacity-50">
			{leftSlot && (
				<span
					ref={leftSlotRef}
					className="pointer-events-none absolute top-1/2 left-1 flex -translate-y-1/2 items-center"
				>
					{leftSlot}
				</span>
			)}
			<InputHeadless
				className={cn(
					"border-neutral-7 bg-neutral-1 text-neutral-12 outline-primary-8 h-9 flex-1 rounded-lg border px-2 text-start text-base sm:text-sm",
					"placeholder:text-neutral-9",
					"hover:not-data-disabled:border-neutral-8",
					"focus-visible:border-primary-8 focus-visible:hover:border-primary-8 focus-visible:outline-2",
					"data-popup-open:border-primary-8 data-popup-open:hover:border-primary-8 data-popup-open:outline-2",
					"data-disabled:cursor-not-allowed",
					"data-invalid:border-error-7 data-invalid:outline-error-8",
					"data-invalid:hover:not-data-disabled:border-error-8",
					"data-invalid:focus-visible:border-error-8 data-invalid:hover:border-error-8",
					"data-invalid:data-popup-open:border-error-8 data-invalid:data-popup-open:hover:border-error-8",
					leftSlot && "pl-[calc(0.5rem+var(--left-slot-width))]",
					rightSlot && "pr-[calc(0.5rem+var(--right-slot-width))]",
					className,
				)}
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
					className="pointer-events-none absolute top-1/2 right-1 flex -translate-y-1/2 items-center"
				>
					{rightSlot}
				</span>
			)}
		</div>
	);
}
