import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { withThemeByClassName, withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import { createElement, type PropsWithChildren, useEffect, useState } from "react";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import type { GlobalsUpdatedPayload } from "storybook/internal/types";
import { themes } from "storybook/theming";
import "../src/globals.css";

function readDocsTheme(channel: DocsContainerProps["context"]["channel"]) {
	const lastUpdate = channel.last(GLOBALS_UPDATED) as [GlobalsUpdatedPayload] | undefined;
	return lastUpdate?.[0].globals.theme === "dark" ? themes.dark : themes.light;
}

function ThemedDocsContainer({ context, children }: PropsWithChildren<DocsContainerProps>) {
	const { channel } = context;
	const [theme, setTheme] = useState(() => readDocsTheme(channel));

	useEffect(() => {
		const updateTheme = ({ globals }: GlobalsUpdatedPayload) => {
			setTheme(globals.theme === "dark" ? themes.dark : themes.light);
		};

		channel.on(GLOBALS_UPDATED, updateTheme);
		setTheme(readDocsTheme(channel));

		return () => channel.off(GLOBALS_UPDATED, updateTheme);
	}, [channel]);

	return createElement(DocsContainer, { context, theme }, children);
}

const preview: Preview = {
	parameters: {
		layout: "centered",
		backgrounds: { disable: true },
		actions: { argTypesRegex: "^on.*" },
		docs: {
			container: ThemedDocsContainer,
		},
		options: {
			storySort: (a, b) => Number(b.type === "docs") - Number(a.type === "docs"),
		},
	},
	decorators: [
		withThemeByDataAttribute({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
			attributeName: "data-theme",
		}),
		withThemeByClassName({
			themes: {
				light: "bg-neutral-1",
				dark: "bg-neutral-1",
			},
			defaultTheme: "light",
		}),
	],
};

export default preview;
