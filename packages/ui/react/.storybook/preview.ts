import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import "../src/globals.css";

const preview: Preview = {
	parameters: {
		layout: "centered",
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
	],
};

export default preview;
