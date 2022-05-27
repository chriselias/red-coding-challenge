import React from "react";
import Select from "react-select";

interface IProps {
  options: SelectOption[];
  placeholder?: string;
  onSelectOption: (value?: SelectOption) => void;
  value: SelectOption | undefined;
}

interface SelectOption {
  label: string;
  value: string;
}

export default function DropdownSelect(props: IProps) {
  const { options, placeholder, onSelectOption, value } = props;

  return (
    <Select
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
  );
}
