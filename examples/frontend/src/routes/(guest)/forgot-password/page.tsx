import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)/forgot-password/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(guest)/forgot-password/"!</div>;
}
