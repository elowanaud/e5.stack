import type { QueryClient } from "@tanstack/react-query";

import { api } from "#/libs/tuyau";

export async function isAuthenticated(queryClient: QueryClient) {
	try {
		const currentUser = await queryClient.query(
			api.profile.view.queryOptions({}, { staleTime: "static" }),
		);
		return !!currentUser;
	} catch (_error) {
		return false;
	}
}
