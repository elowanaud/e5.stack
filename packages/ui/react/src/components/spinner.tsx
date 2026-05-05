import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import { cn } from "../utils";

export type SpinnerProps = Omit<HugeiconsIconProps, "icon">;

export function Spinner(props: SpinnerProps) {
	const { className, ...rest } = props;

	const defaultClassName = cn("animate-spin", className);

	return <HugeiconsIcon icon={Loading03Icon} className={defaultClassName} {...rest} />;
}
