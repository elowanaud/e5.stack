import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "./index";

const meta = {
	component: Separator,
	title: "Layout/Separator",
	decorators: [
		(Story) => (
			<div className="w-[min(28rem,calc(100vw-2rem))] p-4">
				<Story />
			</div>
		),
	],
	argTypes: {
		orientation: {
			description:
				"The direction of the separator. Vertical separators cannot have children or align.",
			control: "select",
			options: ["horizontal", "vertical"],
			table: { defaultValue: { summary: "horizontal" } },
		},
		children: {
			description:
				"Horizontal inline content. Falsy values, including 0, render a plain line instead.",
			control: "text",
			table: { type: { summary: "ReactNode (horizontal only)" } },
		},
		align: {
			description:
				"Horizontal content position: left has a trailing line, center has two lines, right has a leading line.",
			control: "select",
			options: ["left", "center", "right"],
			table: { defaultValue: { summary: "center" } },
		},
		className: {
			description: "Classes or a Base UI state callback applied to the separator root.",
			control: false,
			table: { type: { summary: "string | ((state) => string | undefined)" } },
		},
		render: {
			description: "Replaces the root element; forward the supplied props, children, and ref.",
			control: false,
		},
	},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {};

export const TextLeft: Story = {
	args: { children: "Or continue with", align: "left" },
};

export const TextCenter: Story = {
	args: { children: "Or continue with" },
};

export const TextRight: Story = {
	args: { children: "Or continue with", align: "right" },
};

export const Zero: Story = {
	args: { children: 0 },
	parameters: {
		docs: {
			description: { story: "Numeric 0 is falsy and renders a plain line without a label." },
		},
	},
};

export const Vertical: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<div className="flex h-16 items-center gap-4 text-sm">
			<span>Overview</span>
			<Separator orientation="vertical" />
			<span>Details</span>
		</div>
	),
};

export const Customization: Story = {
	args: {
		children: "A new chapter",
		className: (state) =>
			state.orientation === "horizontal" ? "text-primary-11 [&>span]:bg-primary-6" : undefined,
	},
};
