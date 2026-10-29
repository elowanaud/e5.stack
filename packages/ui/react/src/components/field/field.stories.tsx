import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";

import { Checkbox } from "../checkbox";
import { Combobox } from "../combobox";
import { Input } from "../input";
import { PasswordInput } from "../password-input";
import { Select } from "../select";
import { Switch } from "../switch";
import { Textarea } from "../textarea";
import { Field } from "./index";

const languages = [
	{ value: "js", label: "JavaScript" },
	{ value: "ts", label: "TypeScript" },
	{ value: "py", label: "Python" },
	{ value: "go", label: "Go" },
];

const meta: Meta<typeof Field> = {
	title: "Data Display/Field",
	component: Field,
	subcomponents: {
		Label: Field.Label,
		Description: Field.Description,
		Error: Field.Error,
	},
	args: {
		disabled: false,
		invalid: false,
	},
	argTypes: {
		disabled: {
			description:
				"Disables supported Base UI controls in this field. Native controls need their own disabled prop.",
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		invalid: {
			description:
				"Marks the field invalid, for example after external validation. Render an error message separately.",
			control: "boolean",
		},
		name: {
			description:
				"Form submission name for supported Base UI controls; takes precedence over their name prop.",
			control: "text",
		},
		className: {
			description: "Classes for the field container, or a function of its state.",
			control: "text",
			table: { type: { summary: "string | ((state: FieldHeadless.Root.State) => string)" } },
		},
		validate: {
			description:
				"Custom validation returning error strings, or an empty result when valid. Async validation does not prevent submission in onSubmit mode.",
			control: false,
			table: {
				type: {
					summary:
						"(value: unknown, formValues: Form.Values) => string | string[] | null | void | Promise<string | string[] | null | void>",
				},
			},
		},
		validationMode: {
			description:
				"When to validate: on submit (then on change), on blur, or on every change. Overrides Form's mode.",
			control: "select",
			options: ["onSubmit", "onBlur", "onChange"],
			table: { defaultValue: { summary: "onSubmit" } },
		},
		validationDebounceTime: {
			description: "Delay in milliseconds between validate callbacks in onChange mode.",
			control: "number",
			table: { defaultValue: { summary: "0" } },
		},
		render: {
			description:
				"Replaces the field container. Forward supplied props and ref to preserve field behavior.",
			control: false,
			table: { type: { summary: "ReactElement | ((props, state) => ReactElement)" } },
		},
		children: {
			description: "The label, control, description, and optional error message.",
			control: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextField: Story = {
	render: (args) => (
		<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2" {...args}>
			<Field.Label>Full name</Field.Label>
			<Input className="min-w-0" name="name" autoComplete="name" placeholder="Alex Morgan" />
			<Field.Description>Shown on your public profile.</Field.Description>
			{args.invalid && <Field.Error>Enter your full name.</Field.Error>}
		</Field>
	),
};

export const PasswordField: Story = {
	render: (args) => (
		<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2" {...args}>
			<Field.Label>Password</Field.Label>
			<PasswordInput
				className="min-w-0"
				name="password"
				autoComplete="current-password"
				disabled={args.disabled}
			/>
			<Field.Description>Enter the password for your account.</Field.Description>
			{args.invalid && <Field.Error>Check your password and try again.</Field.Error>}
		</Field>
	),
};

export const TextareaField: Story = {
	render: function TextareaFieldExample(args) {
		const id = useId();
		const descriptionId = `${id}-description`;
		const errorId = `${id}-error`;

		return (
			<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2" {...args}>
				<Field.Label htmlFor={id}>Bio</Field.Label>
				<Textarea
					id={id}
					className="min-w-0"
					name={args.name ?? "bio"}
					autoResize
					disabled={args.disabled}
					aria-invalid={args.invalid}
					aria-describedby={args.invalid ? `${descriptionId} ${errorId}` : descriptionId}
					data-invalid={args.invalid || undefined}
				/>
				<Field.Description id={descriptionId}>
					Tell readers a little about yourself.
				</Field.Description>
				{args.invalid && <Field.Error id={errorId}>Enter a short bio.</Field.Error>}
			</Field>
		);
	},
};

export const SwitchField: Story = {
	render: (args) => (
		<Field
			className="grid w-64 max-w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2"
			{...args}
		>
			<Switch className="col-start-1" name="notifications" />
			<Field.Label className="col-start-2">Email notifications</Field.Label>
			<Field.Description className="col-start-2">
				Receive email updates about your projects.
			</Field.Description>
			{args.invalid && (
				<Field.Error className="col-start-2">
					Could not save your notification preference.
				</Field.Error>
			)}
		</Field>
	),
};

export const CheckboxField: Story = {
	render: (args) => (
		<Field
			className="grid w-64 max-w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2"
			{...args}
		>
			<Checkbox className="col-start-1" name="terms" />
			<Field.Label className="col-start-2">Accept the terms and conditions</Field.Label>
			<Field.Description className="col-start-2">
				Review the terms before creating your account.
			</Field.Description>
			{args.invalid && (
				<Field.Error className="col-start-2">Accept the terms to create an account.</Field.Error>
			)}
		</Field>
	),
};

export const SelectField: Story = {
	render: (args) => (
		<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2" {...args}>
			<Field.Label>Programming language</Field.Label>
			<Select items={languages} name="language">
				<Select.Input className="w-full min-w-0">
					<Select.Value placeholder="Choose a language" />
				</Select.Input>
				<Select.Dropdown>
					{languages.map((language) => (
						<Select.Option key={language.value} value={language.value} label={language.label}>
							{language.label}
						</Select.Option>
					))}
				</Select.Dropdown>
			</Select>
			<Field.Description>Choose the language you use most often.</Field.Description>
			{args.invalid && <Field.Error>Choose a programming language.</Field.Error>}
		</Field>
	),
};

export const ComboboxField: Story = {
	render: (args) => (
		<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2" {...args}>
			<Field.Label>Programming language</Field.Label>
			<Combobox items={languages} name="language">
				<Combobox.Input className="w-full min-w-0">
					<Combobox.Value placeholder="Choose a language" />
				</Combobox.Input>
				<Combobox.Dropdown>
					<Combobox.SearchInput placeholder="Search languages..." aria-label="Search languages" />
					<Combobox.Empty>No languages found.</Combobox.Empty>
					<Combobox.List>
						{(language: (typeof languages)[number]) => (
							<Combobox.Item key={language.value} value={language.value}>
								{language.label}
							</Combobox.Item>
						)}
					</Combobox.List>
				</Combobox.Dropdown>
			</Combobox>
			<Field.Description>Search for the language you use most often.</Field.Description>
			{args.invalid && <Field.Error>Choose a programming language.</Field.Error>}
		</Field>
	),
};

export const Required: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 gap-2">
			<Field.Label required>Email address</Field.Label>
			<Input
				className="min-w-0"
				required
				name="email"
				type="email"
				autoComplete="email"
				placeholder="alex@example.com"
			/>
			<Field.Description>
				Required. Enter an email address where we can contact you.
			</Field.Description>
		</Field>
	),
};

export const States: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<div className="grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-2">
			<Field className="grid w-64 max-w-full min-w-0 grid-cols-1 content-start gap-2">
				<Field.Label>Full name</Field.Label>
				<Input className="min-w-0" name="normal-name" placeholder="Alex Morgan" />
				<Field.Description>Shown on your public profile.</Field.Description>
			</Field>
			<Field disabled className="grid w-64 max-w-full min-w-0 grid-cols-1 content-start gap-2">
				<Field.Label>Full name (disabled)</Field.Label>
				<Input className="min-w-0" name="disabled-name" defaultValue="Alex Morgan" />
				<Field.Description>This profile cannot be edited.</Field.Description>
			</Field>
			<Field invalid className="grid w-64 max-w-full min-w-0 grid-cols-1 content-start gap-2">
				<Field.Label>Full name (invalid)</Field.Label>
				<Input className="min-w-0" name="invalid-name" />
				<Field.Description>Shown on your public profile.</Field.Description>
				<Field.Error>Enter your full name.</Field.Error>
			</Field>
		</div>
	),
};
