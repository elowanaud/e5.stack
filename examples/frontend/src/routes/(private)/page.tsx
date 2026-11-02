import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@workspace/ui-react/components/button";

import { useLogoutMutation } from "#/features/auth/hooks/use-logout-mutation";

export const Route = createFileRoute("/(private)/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { mutate: logout } = useLogoutMutation();

	return <Button onClick={() => logout({})}>Logout</Button>;
}
