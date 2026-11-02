import type { Meta, StoryObj } from "@storybook/react-vite";

import { SquareArrowOutUpRightIcon } from "../../icons";
import { Link } from "./index";

const meta: Meta<typeof Link> = {
	component: Link,
	title: "General/Link",
	argTypes: {
		children: {
			description: "The content of the link.",
			control: "text",
			table: {
				type: {
					summary: "ReactNode",
				},
			},
		},
		href: {
			description: "The URL that the link points to.",
			control: "text",
			table: {
				type: {
					summary: "string",
				},
			},
		},
		target: {
			description: "Where to open the destination. Use _blank to open a new tab.",
			control: "select",
			options: ["_self", "_blank", "_parent", "_top"],
			table: { type: { summary: "HTMLAttributeAnchorTarget" } },
		},
		rel: {
			description:
				"Relationship to the destination, such as noopener noreferrer for external links.",
			control: "text",
			table: { type: { summary: "string" } },
		},
		className: {
			description: "Additional classes applied to the link element.",
			control: "text",
			table: { type: { summary: "string" } },
		},
		render: {
			description:
				"Replaces the anchor with an element or render function. Forward supplied props and ref; preserve link semantics.",
			control: false,
			table: {
				type: { summary: "ReactElement | ((props, state) => ReactElement)" },
			},
		},
	},
	args: {
		children: "Explore the documentation",
		href: "#link",
		className: "text-sm",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const External: Story = {
	args: {
		children: "Visit Base UI (opens in a new tab)",
		href: "https://base-ui.com/",
		target: "_blank",
		rel: "noopener noreferrer",
	},
};

export const Composition: Story = {
	args: {
		children: (
			<>
				Docs <SquareArrowOutUpRightIcon className="size-3.5" />
			</>
		),
		className: "flex items-center gap-1 text-sm",
	},
};
