import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-fd-background px-6 text-center text-fd-foreground">
			<h1 className="font-semibold text-2xl">Page introuvable</h1>
			<p className="max-w-md text-fd-muted-foreground text-sm">
				La page demandee n'existe pas ou a ete deplacee.
			</p>
			<Link
				to="/docs/$"
				params={{ _splat: "" }}
				className="rounded-md bg-fd-primary px-3 py-2 font-medium text-fd-primary-foreground text-sm"
			>
				Retour a la documentation
			</Link>
		</main>
	);
}
