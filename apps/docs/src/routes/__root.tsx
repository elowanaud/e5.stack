import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import SearchDialog from "#/components/search";
import "#/styles/globals.css";

const translations = {
	"Close Search(search dialog)(aria-label)": "Fermer la recherche",
	"Collapse Sidebar(sidebar)(aria-label)": "Reduire la navigation",
	"Copy Markdown(page actions)": "Copier le Markdown",
	"Dark(theme switcher)(aria-label)": "Sombre",
	"Light(theme switcher)(aria-label)": "Clair",
	"Next Page(pagination)": "Page suivante",
	"No results found(search dialog)": "Aucun resultat",
	"On this page(table of contents)": "Sur cette page",
	"Open Search(search trigger)(aria-label)": "Ouvrir la recherche",
	"Open Sidebar(sidebar)(aria-label)": "Ouvrir la navigation",
	"Open(page actions)": "Ouvrir",
	"Previous Page(pagination)": "Page precedente",
	"Search(search dialog)": "Rechercher",
	"Search(search trigger)": "Rechercher",
	"System(theme switcher)(aria-label)": "Systeme",
	"Table of Contents(inline table of contents)": "Sommaire",
	"Toggle Menu(mobile menu)(aria-label)": "Ouvrir le menu",
	"Toggle Theme(theme switcher)(aria-label)": "Changer le theme",
	"View as Markdown(page actions)": "Voir en Markdown",
	displayName: "Francais",
};

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Documentation E5" },
			{
				name: "description",
				content: "Documentation publique du monorepo E5.",
			},
		],
		links: [
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "manifest", href: "/site.webmanifest" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<html lang="fr" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="flex min-h-screen flex-col bg-fd-background text-fd-foreground antialiased">
				<RootProvider
					theme={{
						attribute: ["class", "data-theme"], // light/dark mode
					}}
					i18n={{
						locale: "fr",
						locales: [{ name: "Francais", locale: "fr" }],
						translations,
					}}
					search={{ SearchDialog }}
				>
					<Outlet />
				</RootProvider>
				<Scripts />
			</body>
		</html>
	);
}
