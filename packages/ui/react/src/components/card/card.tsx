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
			{ className: cn("border-neutral-6 bg-neutral-1 rounded-xl border", className) },
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
			{ className: cn("border-neutral-6 bg-neutral-3/50 rounded-t-xl border-b p-4", className) },
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
			{ className: cn("border-neutral-6 bg-neutral-3/50 rounded-b-xl border-t p-4", className) },
			rest,
		),
	});

	return element;
}
