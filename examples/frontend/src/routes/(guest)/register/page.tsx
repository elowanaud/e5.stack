import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)/register/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(guest)/register/"!</div>;
}
