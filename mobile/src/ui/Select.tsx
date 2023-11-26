import React from 'react';

import {
  CheckIcon,
  ChevronDownIcon,
  ISelectProps,
  Select as PrimitiveSelect,
} from 'native-base';
import {View, ViewStyle} from 'react-native';

export type SelectOption<T extends string | number> = {
  value: T;
  label: string;
};

export type SelectProps<T extends string | number> = Omit<
  ISelectProps,
  'onValueChange'
> & {
  options: SelectOption<T>[];
  onOptionChange?: (option: SelectOption<T>) => void;
};

const Select = <T extends string | number>({
  style,
  onOptionChange,
  options,
  ...props
}: SelectProps<T>) => {
  const handleValueChange = (value: string) => {
    const selectedOption = options.find(opt => opt.value === value);
    if (onOptionChange && selectedOption) onOptionChange(selectedOption);
  };

  const marginTop =
    style && (style as Array<ViewStyle>)[0]
      ? (style as Array<ViewStyle>)[0].marginTop
      : 0;

  return (
    <View style={{marginTop}}>
      <PrimitiveSelect
        style={[style, {marginTop: 0}]}
        rounded={8}
        fontSize={14}
        borderWidth={0.6}
        borderColor={'#a3a3a3'}
        dropdownIcon={
          <View style={{right: 12}}>
            <ChevronDownIcon size="4" />
          </View>
        }
        _selectedItem={{
          endIcon: <CheckIcon size="5" />,
        }}
        {...props}
        onValueChange={handleValueChange}>
        {options.map(opt => (
          <PrimitiveSelect.Item
            label={opt.label}
            value={opt.value.toString()}
          />
        ))}
      </PrimitiveSelect>
    </View>
  );
};

export default Select;
