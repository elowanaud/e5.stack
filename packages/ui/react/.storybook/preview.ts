import { withThemeByClassName, withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import "../src/globals.css";

const preview: Preview = {
	parameters: {
		layout: "centered",
		backgrounds: { disable: true },
		actions: { argTypesRegex: "^on.*" },
	},
	tags: ["autodocs"],
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
				light: "bg-neutral-2",
				dark: "bg-neutral-2",
			},
			defaultTheme: "light",
		}),
	],
};

export default preview;
