import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment } from "react/jsx-runtime";
import { Select } from "./index";

const OPTIONS = [
	{ value: 1, label: "Option 1" },
	{ value: 2, label: "Option 2" },
	{ value: 3, label: "Option 3" },
	{ value: 4, label: "Option 4" },
	{ value: 5, label: "Option 5" },
	{ value: 6, label: "Option 6" },
	{ value: 7, label: "Option 7" },
	{ value: 8, label: "Option 8" },
	{ value: 9, label: "Option 9" },
];

const GROUPED_OPTIONS = [
	{ label: "Group 1", value: OPTIONS.slice(0, 3) },
	{ label: "Group 2", value: OPTIONS.slice(3, 6) },
	{ label: "Group 3", value: OPTIONS.slice(6, 9) },
];

const meta: Meta<typeof Select> = {
	title: "Select",
	parameters: {
		docs: {
			description: {
				component: "https://base-ui.com/react/components/select",
			},
		},
	},
	component: Select,
	subcomponents: {
		Trigger: Select.Trigger,
		Value: Select.Value,
		List: Select.List,
		Item: Select.Item,
		Group: Select.Group,
		GroupLabel: Select.GroupLabel,
		Separator: Select.Separator,
	},
	argTypes: {
		name: {
			description: "Identifies the field when a form is submitted.",
			control: "text",
			type: "string",
		},
		defaultValue: {
			description: "The initial value of the select.",
			control: "text",
			table: {
				type: {
					summary: "Union",
					detail: "Value | Value[] | null | undefined",
				},
			},
		},
		value: {
			description: "The value of the select.",
			control: "text",
			table: {
				type: {
					summary: "Union",
					detail: "Value | Value[] | null | undefined",
				},
			},
		},
		onValueChange: {
			description: "Event handler called when the value of the select changes.",
			table: {
				type: {
					summary: "function",
				},
			},
		},
		defaultOpen: {
			description: "Whether the select popup is initially open.",
			control: "boolean",
			type: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		open: {
			description: "Whether the select popup is currently open.",
			control: "boolean",
			type: "boolean",
		},
		onOpenChange: {
			description: "Event handler called when the select popup is opened or closed.",
			table: {
				type: {
					summary: "function",
				},
			},
		},
		highlightItemOnHover: {
			description:
				"Whether moving the pointer over items should highlight them. Disabling this prop allows CSS :hover to be differentiated from the :focus (data-highlighted) state.",
			control: "boolean",
			type: "boolean",
			table: {
				defaultValue: { summary: "true" },
			},
		},
		actionsRef: {
			description: "A ref to imperative actions.",
			table: {
				type: {
					summary: "React.RefObject<Select.Root.Actions | null> | undefined",
				},
			},
		},
		isItemEqualToValue: {
			description:
				"Custom comparison logic used to determine if a select item value matches the current selected value. Useful when item values are objects without matching referentially. Defaults to Object.is comparison.",
			table: {
				type: {
					summary: "((itemValue: Value, value: Value) => boolean)| undefined",
				},
			},
		},
		itemToStringLabel: {
			description:
				"When the item values are objects (<Select.Item value={object}>), this function converts the object value to a string representation for display in the trigger. If the shape of the object is { value, label }, the label will be used automatically without needing to specify this prop.",
			table: {
				type: {
					summary: "((itemValue: Value) => string) | undefined",
				},
			},
		},
		itemToStringValue: {
			description:
				"When the item values are objects (<Select.Item value={object}>), this function converts the object value to a string representation for form submission. If the shape of the object is { value, label }, the value will be used automatically without needing to specify this prop.",
			table: {
				type: {
					summary: "((itemValue: Value) => string) | undefined",
				},
			},
		},
		items: {
			description:
				"Data structure of the items rendered in the select popup. When specified, <Select.Value> renders the label of the selected item instead of the raw value.",
			table: {
				type: {
					summary: "Union",
					detail: "Record<string, ReactNode> | {label: ReactNode, value: any}[] | undefined",
				},
			},
		},
		modal: {
			description: "Determines if the select enters a modal state when open.",
			control: "boolean",
			type: "boolean",
			table: {
				defaultValue: { summary: "true" },
			},
		},
		multiple: {
			description: "Whether multiple items can be selected.",
			control: "boolean",
			type: "boolean",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		onOpenChangeComplete: {
			description:
				"Event handler called after any animations complete when the select popup is opened or closed.",
			table: {
				type: {
					summary: "function",
				},
			},
		},
		disabled: {
			description: "Whether the component should ignore user interaction.",
			control: "boolean",
			type: "boolean",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		readOnly: {
			description:
				"Whether the user should be unable to choose a different option from the select popup.",
			control: "boolean",
			type: "boolean",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		required: {
			description: "Whether the user must choose a value before submitting a form.",
			control: "boolean",
			type: "boolean",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		inputRef: {
			description: "A ref to access the hidden input element.",
			table: {
				type: {
					summary: "React.Ref<HTMLInputElement> | undefined",
				},
			},
		},
		id: {
			description: "The id of the Select.",
			control: "text",
			type: "string",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: OPTIONS,
	},
	render: (args) => (
		<Select {...args}>
			<Select.Trigger className="w-52">
				<Select.Value placeholder="Select an option" />
			</Select.Trigger>

			<Select.List>
				{OPTIONS.map((option) => {
					return (
						<Select.Item key={option.value} value={option.value} label={option.label}>
							{option.label}
						</Select.Item>
					);
				})}
			</Select.List>
		</Select>
	),
};

export const Multiple: Story = {
	args: {
		items: OPTIONS,
		multiple: true,
	},
	render: (args) => (
		<Select {...args}>
			<Select.Trigger className="w-52">
				<Select.Value>
					{(values: number[]) => {
						if (values.length === 0) {
							return "Select some options";
						}

						const firstOption = OPTIONS.find((option) => option.value === values[0])?.label;
						const otherOptions = values.length > 1 ? `(+${values.length - 1} more)` : "";

						return `${firstOption}  ${otherOptions}`;
					}}
				</Select.Value>
			</Select.Trigger>

			<Select.List>
				{OPTIONS.map((option) => {
					return (
						<Select.Item key={option.value} value={option.value} label={option.label}>
							{option.label}
						</Select.Item>
					);
				})}
			</Select.List>
		</Select>
	),
};

export const Grouped: Story = {
	args: {
		items: OPTIONS,
	},
	render: (args) => (
		<Select {...args}>
			<Select.Trigger className="w-52">
				<Select.Value placeholder="Select an option" />
			</Select.Trigger>

			<Select.List className="space-y-2">
				{GROUPED_OPTIONS.map((group, index) => {
					return (
						<Fragment key={group.label}>
							{index !== 0 && <Select.Separator />}
							<Select.Group>
								<Select.GroupLabel>{group.label}</Select.GroupLabel>
								{group.value.map((option) => {
									return (
										<Select.Item
											className={"pr-2 pl-4"}
											key={option.value}
											value={option.value}
											label={option.label}
										>
											{option.label}
										</Select.Item>
									);
								})}
							</Select.Group>
						</Fragment>
					);
				})}
			</Select.List>
		</Select>
	),
};
