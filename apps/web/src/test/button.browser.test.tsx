import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Button } from "@workspace/ui-react/components/button";

test("calls the action when the shared button is clicked", async () => {
	// Given
	const handleAction = vi.fn();
	const screen = await render(<Button onClick={handleAction}>Continue</Button>);

	// When
	await screen.getByRole("button", { name: "Continue" }).click();

	// Then
	expect(handleAction).toHaveBeenCalledOnce();
});
