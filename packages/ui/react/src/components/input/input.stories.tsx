import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchIcon } from "../../icons";
import { Field } from "../field";
import { Input } from "./index";

const meta: Meta<typeof Input> = {
	title: "Data Entry/Input",
	component: Input,
	argTypes: {
		type: {
			description:
				"Native input type. The control lists common examples, not every supported HTML type.",
			control: "select",
			options: ["text", "search", "email", "tel", "url", "password", "number"],
			table: {
				defaultValue: { summary: "text" },
				type: { summary: "HTMLInputTypeAttribute" },
			},
		},
		placeholder: {
			description: "Hint shown when empty; not a substitute for a label.",
			control: "text",
		},
		disabled: {
			description:
				"Prevents interaction and focus; excludes this input from form submission. Inherited from Field.",
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		readOnly: {
			description:
				"Prevents editing, but remains focusable and included in form submission, unlike disabled.",
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		defaultValue: {
			description:
				"Initial uncontrolled value; changes after mount do not update the input. Omit value.",
			control: false,
			table: { type: { summary: "string | number | readonly string[]" } },
		},
		value: {
			description: "Controlled value, paired with onValueChange. Omit defaultValue.",
			control: false,
			table: { type: { summary: "string | number | readonly string[]" } },
		},
		onValueChange: {
			description: "Receives the new string value and Base UI event details.",
			control: false,
			table: {
				type: {
					summary: "(value: string, eventDetails: InputHeadless.ChangeEventDetails) => void",
				},
			},
		},
		leftSlot: {
			description: "Non-interactive leading content; padding follows its width.",
			control: "select",
			options: ["None", "Search"],
			mapping: {
				None: undefined,
				Search: <SearchIcon aria-hidden="true" className="text-neutral-11 mx-1 size-4" />,
			},
			table: { type: { summary: "ReactNode" } },
		},
		rightSlot: {
			description: "Non-interactive trailing content; padding follows its width.",
			control: "select",
			options: ["None", "Unit"],
			mapping: {
				None: undefined,
				Unit: (
					<span aria-hidden="true" className="text-neutral-11 mx-1 text-sm">
						kg
					</span>
				),
			},
			table: { type: { summary: "ReactNode" } },
		},
		className: {
			description: "Classes for the input, not its slot container.",
			control: "text",
		},
		render: {
			description:
				"Replaces the input. Forward supplied props and ref; preserve native input behavior.",
			control: false,
			table: {
				type: { summary: "ReactElement | ((props, state) => ReactElement)" },
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Alex Morgan",
		name: "name",
		autoComplete: "name",
	},
	render: (args) => (
		<Field className="grid w-64 max-w-full min-w-0 gap-2">
			<Field.Label>Full name</Field.Label>
			<Input {...args} />
		</Field>
	),
};

export const Slots: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<div className="flex flex-wrap items-start gap-6">
			<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
				<Field.Label>Search records</Field.Label>
				<Input
					className="min-w-0"
					type="search"
					placeholder="Find a record..."
					leftSlot={<SearchIcon aria-hidden="true" className="text-neutral-11 mx-1 size-4" />}
				/>
			</Field>
			<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
				<Field.Label>Weight (kg)</Field.Label>
				<Input
					className="min-w-0"
					inputMode="decimal"
					placeholder="0"
					rightSlot={
						<span aria-hidden="true" className="text-neutral-11 mx-1 text-sm">
							kg
						</span>
					}
				/>
			</Field>
			<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
				<Field.Label>Website (https://….com)</Field.Label>
				<Input
					className="min-w-0"
					type="text"
					placeholder="example"
					leftSlot={
						<span aria-hidden="true" className="text-neutral-11 mx-1 text-sm">
							https://
						</span>
					}
					rightSlot={
						<span aria-hidden="true" className="text-neutral-11 mx-1 text-sm">
							.com
						</span>
					}
				/>
			</Field>
		</div>
	),
};

export const States: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<div className="grid max-w-full grid-cols-1 items-start gap-6 sm:grid-cols-2">
			<Field className="grid w-64 max-w-full min-w-0 gap-2">
				<Field.Label>Name</Field.Label>
				<Input defaultValue="Alex Morgan" />
				<Field.Description>Visible on your profile.</Field.Description>
			</Field>
			<Field disabled className="grid w-64 max-w-full min-w-0 gap-2">
				<Field.Label>Account name (disabled)</Field.Label>
				<Input defaultValue="Alex Morgan" />
			</Field>
			<Field className="grid w-64 max-w-full min-w-0 gap-2">
				<Field.Label>Account ID (read-only)</Field.Label>
				<Input name="accountId" readOnly defaultValue="ACCT-1042" />
			</Field>
			<Field invalid className="grid w-64 max-w-full min-w-0 gap-2">
				<Field.Label>Name (invalid)</Field.Label>
				<Input placeholder="Enter your name" />
				<Field.Error>Please enter your name.</Field.Error>
			</Field>
		</div>
	),
};
