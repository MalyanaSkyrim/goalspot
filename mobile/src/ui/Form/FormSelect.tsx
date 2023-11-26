import {View} from 'native-base';
import React from 'react';
import {Control, Controller, Path} from 'react-hook-form';
import classMerge from '../../utils/classMerge';
import Select, {SelectProps} from '../Select';
import TextField from './TextField';

interface FormSelectProps<
  TData extends Record<string, string | number | boolean | undefined>,
  T extends string | number,
> extends SelectProps<T> {
  name: Path<TData>;
  control: Control<TData>;
  label?: string;
}

const FormSelect = <
  TData extends Record<string, string | number | boolean | undefined>,
  T extends string | number,
>({
  name,
  control,
  label,
  style,
  ...props
}: FormSelectProps<TData, T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <View
          style={style}
          className={classMerge(
            'mb-3 space-y-2',
            fieldState.error && 'mb-[2px]',
          )}>
          {label && (
            <TextField className="text-base text-neutral-800">
              {label}
            </TextField>
          )}
          <Select
            {...props}
            selectedValue={field.value?.toString()}
            onOptionChange={option => field.onChange(option.value)}
          />
          {fieldState.error?.message && (
            <TextField className="text-sm text-danger">
              {fieldState.error?.message}
            </TextField>
          )}
        </View>
      )}
    />
  );
};

export default FormSelect;
