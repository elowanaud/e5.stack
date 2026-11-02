import { Separator as SeparatorHeadless } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import { cn } from "tailwind-variants";

export type SeparatorRootProps = Omit<SeparatorHeadless.Props, "children" | "orientation"> &
	(
		| {
				orientation?: "horizontal";
				children?: ReactNode;
				align?: "left" | "center" | "right";
		  }
		| {
				orientation: "vertical";
				children?: never;
				align?: never;
		  }
	);

export function SeparatorRoot(props: SeparatorRootProps) {
	const { children, align = "center", className, ...rest } = props;

	if (props.orientation === "vertical") {
		return (
			<SeparatorHeadless
				className={(state) =>
					cn(
						"bg-neutral-6 h-full w-px shrink-0",
						typeof className === "function" ? className(state) : className,
					)
				}
				{...rest}
			/>
		);
	}

	if (!children) {
		return (
			<SeparatorHeadless
				className={(state) =>
					cn(
						"bg-neutral-6 h-px w-full shrink-0",
						typeof className === "function" ? className(state) : className,
					)
				}
				{...rest}
			/>
		);
	}

	return (
		<SeparatorHeadless
			className={(state) =>
				cn(
					"text-neutral-11 flex items-center gap-2 text-sm",
					typeof className === "function" ? className(state) : className,
				)
			}
			{...rest}
		>
			{align !== "left" && <span className="bg-neutral-6 h-px w-full flex-1" />}
			{children}
			{align !== "right" && <span className="bg-neutral-6 h-px w-full flex-1" />}
		</SeparatorHeadless>
	);
}
