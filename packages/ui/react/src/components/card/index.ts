import { CardContent, CardFooter, CardHeader, CardRoot } from "./card";

export const Card = Object.assign(CardRoot, {
	Header: CardHeader,
	Content: CardContent,
	Footer: CardFooter,
});

export type {
	CardContentProps,
	CardFooterProps,
	CardHeaderProps,
	CardRootProps as CardProps,
} from "./card";
