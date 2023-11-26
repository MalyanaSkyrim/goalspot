import React from 'react';
import {Control, Controller, Path} from 'react-hook-form';
import {TextInput, TextInputProps, View} from 'react-native';
import classMerge from '../../utils/classMerge';
import TextField from './TextField';

interface FormInputProps<TData extends Record<string, unknown>>
  extends TextInputProps {
  name: Path<TData>;
  control: Control<TData>;
  inputClassName?: string;
  label?: string;
}

const FormInput = <
  TData extends Record<string, string | number | boolean | undefined>,
>({
  control,
  name,
  placeholder,
  className,
  inputClassName,
  label,
  style,
  ...restProps
}: FormInputProps<TData>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <View style={style} className="space-y-1">
          {label && (
            <TextField className="text-base text-neutral-800">
              {label}
            </TextField>
          )}
          <TextInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={(field.value || '').toString()}
            placeholder={placeholder}
            className={classMerge(
              'bg-white w-full  rounded-md px-2 py-1 font-Lato',
              inputClassName,
            )}
            {...restProps}
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

export default FormInput;
