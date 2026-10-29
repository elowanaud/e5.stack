import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export type SidebarRootProps = ComponentProps<"aside">;

export function SidebarRoot(props: SidebarRootProps) {
	const { className, ...rest } = props;

	return (
		<aside
			className={cn(
				"border-neutral-7 bg-neutral-1 fixed top-0 left-0 grid h-svh w-72 grid-rows-[auto_1fr_auto] border-r",
				className,
			)}
			{...rest}
		/>
	);
}

export type SidebarHeaderProps = ComponentProps<"header">;

export function SidebarHeader(props: SidebarHeaderProps) {
	const { className, ...rest } = props;

	return <header className={cn("row-span-1 p-2", className)} {...rest} />;
}

export type SidebarBodyProps = ComponentProps<"main">;

export function SidebarBody(props: SidebarBodyProps) {
	const { className, ...rest } = props;

	return <main className={cn("row-span-2 overflow-auto p-2", className)} {...rest} />;
}

export type SidebarFooterProps = ComponentProps<"footer">;

export function SidebarFooter(props: SidebarFooterProps) {
	const { className, ...rest } = props;

	return <footer className={cn("row-span-3 mt-auto p-2", className)} {...rest} />;
}
