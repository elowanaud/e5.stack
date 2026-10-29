import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export type SkeletonRootProps = ComponentProps<"span">;

export function SkeletonRoot(props: SkeletonRootProps) {
	const { className, ...rest } = props;

	return <span className={cn("bg-neutral-4 animate-pulse", className)} {...rest} />;
}
