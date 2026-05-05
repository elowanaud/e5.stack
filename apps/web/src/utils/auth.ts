import type { QueryClient } from "@tanstack/react-query";
import { api } from "#/libs/tuyau";

export async function isAuthenticated(queryClient: QueryClient) {
	try {
		const currentUser = await queryClient.ensureQueryData(api.profile.view.queryOptions());
		return !!currentUser;
	} catch (_error) {
		return false;
	}
}
