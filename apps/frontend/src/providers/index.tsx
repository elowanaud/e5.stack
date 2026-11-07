import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

import { Toaster } from "@workspace/ui/components/toast";
import { TooltipProvider } from "@workspace/ui/components/tooltip";

import { TanstackDevtoolsProvider } from "#/providers/tanstack-devtools";

export function Providers({ children }: PropsWithChildren) {
	return (
		<ThemeProvider disableTransitionOnChange>
			<TooltipProvider>
				{children}
				<TanstackDevtoolsProvider />
				<Toaster />
			</TooltipProvider>
		</ThemeProvider>
	);
}
