import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@workspace/ui-react/utils";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva(
	"inline-flex select-none items-center justify-center overflow-hidden rounded-full bg-neutral-3 text-neutral-12",
	{
		variants: {
			size: {
				sm: "size-6 text-xs",
				md: "size-8 text-sm",
				lg: "size-10 text-base",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

type AvatarProps = AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>;

function Avatar(props: AvatarProps) {
	const { className, size, ...rest } = props;

	const defaultClassName = cn(avatarVariants({ size }), className);

	return <AvatarPrimitive.Root className={defaultClassName} {...rest} />;
}

type AvatarImageProps = AvatarPrimitive.Image.Props;

function AvatarImage(props: AvatarImageProps) {
	const { className, ...rest } = props;

	const defaultClassName = cn("size-full object-cover", className);

	return <AvatarPrimitive.Image className={defaultClassName} {...rest} />;
}

type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;

function AvatarFallback(props: AvatarFallbackProps) {
	const { className, ...rest } = props;

	const defaultClassName = cn("flex size-full items-center justify-center", className);

	return <AvatarPrimitive.Fallback className={defaultClassName} {...rest} />;
}

Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export type { AvatarFallbackProps, AvatarImageProps, AvatarProps };
export { Avatar, AvatarPrimitive };
