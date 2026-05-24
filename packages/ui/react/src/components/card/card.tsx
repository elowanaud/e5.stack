import { mergeProps } from "@base-ui/react";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "tailwind-variants";

export type CardRootProps = useRender.ComponentProps<"div">;

export function CardRoot(props: CardRootProps) {
	const { className, render, ...rest } = props;

	const element = useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(
			{ className: cn("rounded-xl border border-neutral-6 bg-neutral-1", className) },
			rest,
		),
	});

	return element;
}

export type CardHeaderProps = useRender.ComponentProps<"header">;

export function CardHeader(props: CardHeaderProps) {
	const { className, render, ...rest } = props;

	const element = useRender({
		defaultTagName: "header",
		render,
		props: mergeProps<"header">(
			{ className: cn("rounded-t-xl border-neutral-6 border-b bg-neutral-3/50 p-4", className) },
			rest,
		),
	});

	return element;
}

export type CardContentProps = useRender.ComponentProps<"div">;

export function CardContent(props: CardContentProps) {
	const { className, render, ...rest } = props;

	const element = useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">({ className: cn("p-4", className) }, rest),
	});

	return element;
}

export type CardFooterProps = useRender.ComponentProps<"footer">;

export function CardFooter(props: CardFooterProps) {
	const { className, render, ...rest } = props;

	const element = useRender({
		defaultTagName: "footer",
		render,
		props: mergeProps<"footer">(
			{ className: cn("rounded-b-xl border-neutral-6 border-t bg-neutral-3/50 p-4", className) },
			rest,
		),
	});

	return element;
}
