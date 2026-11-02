import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "#/utils/auth";

export const Route = createFileRoute("/(guest)")({
	beforeLoad: async ({ context }) => {
		if (await isAuthenticated(context.queryClient)) {
			throw redirect({ to: "/" });
		}
	},
	component: Layout,
});

function Layout() {
	return <Outlet />;
}
