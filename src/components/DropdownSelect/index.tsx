import React from "react";
import Select from "react-select";

interface IProps {
    options: SelectOption[];
    placeholder?: string;
    onSelectOption: (value?: SelectOption) => void;
    value: SelectOption | undefined;
}

export type SelectOption = {
    label: string;
    value: any;
}

export default function DropdownSelect(props: IProps) {
    const { options, placeholder, onSelectOption, value } = props;

    return <Select 
        options={options}
        value={value}
        placeholder={placeholder || "Select an option..."}
        onChange={(value) => {
            if (value) {
                onSelectOption(value);
            } else {
                onSelectOption(undefined);
            }
        }}
        isClearable
    />
}