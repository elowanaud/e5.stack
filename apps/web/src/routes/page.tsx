import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "next-themes";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { theme, systemTheme } = useTheme();

	console.log(systemTheme);
	console.log(theme);

	return (
		<div className="p-8">
			<h1 className="font-bold text-4xl">Welcome to TanStack Start</h1>
			<p className="mt-4 text-lg">
				Edit <code>src/routes/index.tsx</code> to get started.
			</p>
		</div>
	);
}
