import { BoxIcon } from "@workspace/ui-react/icons";

export function SplashScreen() {
	return (
		<main className="flex min-h-svh flex-col items-center justify-center">
			<BoxIcon className="text-primary-9 size-16 animate-bounce" />
			<span className="bg-primary-9 h-1 w-16 rounded-[100%] blur" />
		</main>
	);
}
