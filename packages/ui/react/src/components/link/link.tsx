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
					"text-primary-9 underline underline-offset-4 outline-none",
					"hover:text-primary-11",
					"focus-visible:bg-primary-4",
					className,
				),
			},
			rest,
		),
	});
}
