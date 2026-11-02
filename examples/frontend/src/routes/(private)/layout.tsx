import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "#/utils/auth";

export const Route = createFileRoute("/(private)")({
	beforeLoad: async ({ context }) => {
		if (!(await isAuthenticated(context.queryClient))) {
			throw redirect({ to: "/login" });
		}
	},
	component: Layout,
});

function Layout() {
	return <Outlet />;
}
