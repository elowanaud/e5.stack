import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { PasswordInput } from "../password-input";
import { Switch } from "../switch";
import { Field } from "./index";

const meta: Meta<typeof Field> = {
	title: "Field",
	parameters: {
		docs: {
			description: {
				component: "https://base-ui.com/react/components/field",
			},
		},
	},
	component: Field,
	subcomponents: {
		Label: Field.Label,
		Description: Field.Description,
		Error: Field.Error,
	},
	argTypes: {
		disabled: {
			description: "Whether the field should ignore user interaction.",
			control: "boolean",
			type: "boolean",
		},
		invalid: {
			description: "Whether the field is invalid.",
			control: "boolean",
			type: "boolean",
		},
		render: {
			description:
				"Allows you to replace the component’s HTML element with a different tag, or compose it with another component.",
			control: false,
			table: {
				type: {
					summary: "ReactElement",
				},
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextField: Story = {
	render: (args) => (
		<Field className="grid gap-1" {...args}>
			<Field.Label>Name</Field.Label>
			<Input />
			<Field.Description>Visible on your profile</Field.Description>
			<Field.Error>Name is required</Field.Error>
		</Field>
	),
};

export const PasswordField: Story = {
	render: (args) => (
		<Field className="grid gap-1" {...args}>
			<Field.Label>Password</Field.Label>
			<PasswordInput />
			<Field.Description>Must be at least 8 characters</Field.Description>
			<Field.Error>Password is too short</Field.Error>
		</Field>
	),
};

export const SwitchField: Story = {
	render: (args) => (
		<Field className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1" {...args}>
			<Switch className="col-start-1" />

			<Field.Label className="col-start-2">Enable notifications</Field.Label>
			<Field.Description className="col-start-2">
				Receive updates about new features and offers
			</Field.Description>
			<Field.Error className="col-start-2">You must enable notifications to proceed</Field.Error>
		</Field>
	),
};

export const CheckboxField: Story = {
	render: (args) => (
		<Field className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1" {...args}>
			<Checkbox className="col-start-1" />

			<Field.Label className="col-start-2">Accept terms and conditions</Field.Label>
			<Field.Description className="col-start-2">
				You must accept our terms and conditions to proceed
			</Field.Description>
			<Field.Error className="col-start-2">
				You must accept the terms and conditions to proceed
			</Field.Error>
		</Field>
	),
};
