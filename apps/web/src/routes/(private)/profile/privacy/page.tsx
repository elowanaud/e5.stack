import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@workspace/ui-react/components/card";
import { DeleteProfileSection } from "#/features/user_management/profile/components/delete-section";

export const Route = createFileRoute("/(private)/profile/privacy/")({
	component: Page,
});

function Page() {
	return (
		<Card>
			<DeleteProfileSection />
		</Card>
	);
}
