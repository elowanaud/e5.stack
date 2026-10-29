import type { Meta, StoryObj } from "@storybook/react-vite";

import { LockIcon } from "../../icons";
import { Field } from "../field";
import { PasswordInput } from "./index";

const meta: Meta<typeof PasswordInput> = {
	title: "Data Entry/Password Input",
	component: PasswordInput,
	argTypes: {
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
			description: "Receives the new string value and Base UI input event details.",
			control: false,
			table: {
				type: {
					summary: "(value: string, eventDetails: InputHeadless.ChangeEventDetails) => void",
				},
			},
		},
		defaultVisible: {
			description:
				"Initial uncontrolled visibility; changes after mount have no effect. Omit visible.",
			control: false,
			table: { defaultValue: { summary: "false" } },
		},
		visible: {
			description:
				"Controlled visibility. To change it with the toggle, update visible in onVisibilityChange.",
			control: "boolean",
		},
		onVisibilityChange: {
			description: "Receives the requested visibility and Base UI toggle event details.",
			control: false,
			table: {
				type: { summary: "(visible: boolean, event: ToggleHeadless.ChangeEventDetails) => void" },
			},
		},
		placeholder: {
			description: "Hint shown when empty; not a substitute for a label.",
			control: "text",
		},
		disabled: {
			description:
				"Disables the input and visibility toggle; excludes the value from form submission. Set directly on PasswordInput.",
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		readOnly: {
			description:
				"Prevents editing while keeping focus and form submission. The visibility toggle stays active.",
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		leftSlot: {
			description: "Non-interactive leading content; padding follows its width.",
			control: "select",
			options: ["None", "Lock"],
			mapping: {
				None: undefined,
				Lock: <LockIcon aria-hidden="true" className="text-neutral-11 mx-1 size-4" />,
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
			table: { type: { summary: "ReactElement | ((props, state) => ReactElement)" } },
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: "password",
		autoComplete: "current-password",
		placeholder: "Enter your password",
	},
	render: (args) => (
		<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
			<Field.Label>Password</Field.Label>
			<PasswordInput className="min-w-0" {...args} />
		</Field>
	),
};

export const Visibility: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<div className="grid max-w-full grid-cols-1 items-start gap-6 sm:grid-cols-2">
			<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
				<Field.Label>Password (initially hidden)</Field.Label>
				<PasswordInput
					className="min-w-0"
					defaultValue="demo-password"
					autoComplete="current-password"
				/>
			</Field>
			<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
				<Field.Label>Password (initially visible)</Field.Label>
				<PasswordInput
					className="min-w-0"
					defaultValue="demo-password"
					defaultVisible
					autoComplete="current-password"
				/>
			</Field>
		</div>
	),
};

export const LeftSlot: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
			<Field.Label>New password</Field.Label>
			<PasswordInput
				className="min-w-0"
				name="newPassword"
				autoComplete="new-password"
				placeholder="Create a password"
				leftSlot={<LockIcon aria-hidden="true" className="text-neutral-11 mx-1 size-4" />}
			/>
			<Field.Description>Use this password to sign in to your account.</Field.Description>
		</Field>
	),
};

export const States: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<div className="grid max-w-full grid-cols-1 items-start gap-6 sm:grid-cols-2">
			<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
				<Field.Label>Password</Field.Label>
				<PasswordInput
					className="min-w-0"
					defaultValue="demo-password"
					autoComplete="current-password"
				/>
			</Field>
			<Field disabled className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
				<Field.Label>Password (disabled)</Field.Label>
				<PasswordInput
					className="min-w-0"
					disabled
					defaultValue="demo-password"
					autoComplete="current-password"
				/>
			</Field>
			<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
				<Field.Label>Password (read-only)</Field.Label>
				<PasswordInput
					className="min-w-0"
					name="password"
					readOnly
					defaultValue="demo-password"
					autoComplete="current-password"
				/>
			</Field>
			<Field invalid className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
				<Field.Label>Password (invalid)</Field.Label>
				<PasswordInput
					className="min-w-0"
					placeholder="Enter your password"
					autoComplete="current-password"
				/>
				<Field.Error>Please enter your password.</Field.Error>
			</Field>
		</div>
	),
};
