import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/profile/privacy/")({
	component: Page,
});

function Page() {
	return <div>Hello "/(private)/profile/privacy/"!</div>;
}
