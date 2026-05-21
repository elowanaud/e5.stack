import { mergeProps, useRender } from "@base-ui/react";
import { cn } from "tailwind-variants";

export type LinkRootProps = useRender.ComponentProps<"a">;

export function LinkRoot(props: LinkRootProps) {
	const { render, className, ...rest } = props;

	return useRender({
		defaultTagName: "a",
		render,
		props: mergeProps<"a">(
			{
				className: cn(
					// Default
					"text-primary-9 text-sm underline-offset-2 transition",
					// Hover
					"hover:text-primary-11 hover:underline",
					// Visited
					"visited:text-primary-11",
					// Overwrite
					className,
				),
			},
			rest,
		),
	});
}
