import {
	SelectGroup,
	SelectGroupLabel,
	SelectItem,
	SelectList,
	SelectRoot,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "./select";

export { Select as SelectPrimitive } from "@base-ui/react/select";

export const Select = Object.assign(SelectRoot, {
	Trigger: SelectTrigger,
	Value: SelectValue,
	List: SelectList,
	Item: SelectItem,
	Group: SelectGroup,
	GroupLabel: SelectGroupLabel,
	Separator: SelectSeparator,
});

export type {
	SelectGroupLabelProps,
	SelectGroupProps,
	SelectItemProps,
	SelectListProps,
	SelectRootProps as SelectProps,
	SelectSeparatorProps,
	SelectTriggerProps,
	SelectValueProps,
} from "./select";
