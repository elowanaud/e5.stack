import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export type TableRootProps = ComponentProps<"table">;

export function TableRoot(props: TableRootProps) {
	const { className, ...rest } = props;

	return (
		<div className={cn("border-neutral-7 bg-neutral-1 overflow-auto rounded-lg border", className)}>
			<table className="h-full w-full" {...rest} />
		</div>
	);
}

export type TableHeaderProps = ComponentProps<"thead">;

export function TableHeader(props: TableHeaderProps) {
	const { className, ...rest } = props;

	return <thead className={cn("border-neutral-7 bg-neutral-3/50 border-b", className)} {...rest} />;
}

export type TableBodyProps = ComponentProps<"tbody">;

export function TableBody(props: TableBodyProps) {
	const { className, ...rest } = props;

	return <tbody className={cn("divide-neutral-7 divide-y", className)} {...rest} />;
}

export type TableRowProps = ComponentProps<"tr"> & {
	interactive?: boolean;
};

export function TableRow(props: TableRowProps) {
	const { className, interactive, ...rest } = props;

	return (
		<tr
			className={cn(
				{
					"hover:bg-neutral-3 cursor-pointer": interactive,
				},
				className,
			)}
			{...rest}
		/>
	);
}

export type TableCellProps = ComponentProps<"td"> & {
	interactive?: boolean;
};

export function TableCell(props: TableCellProps) {
	const { className, interactive, ...rest } = props;

	return (
		<td
			className={cn(
				"text-neutral-12 truncate px-4 py-3 text-start text-sm",
				{
					"hover:bg-neutral-3 cursor-pointer": interactive,
				},
				className,
			)}
			{...rest}
		/>
	);
}

export type TableHeaderCellProps = ComponentProps<"th">;

export function TableHeaderCell(props: TableHeaderCellProps) {
	const { className, ...rest } = props;

	return (
		<th
			className={cn(
				"text-neutral-12 truncate px-4 py-3 text-start text-sm font-semibold",
				className,
			)}
			{...rest}
		/>
	);
}

export type TableFooterProps = ComponentProps<"tfoot">;

export function TableFooter(props: TableFooterProps) {
	return <tfoot {...props} />;
}
