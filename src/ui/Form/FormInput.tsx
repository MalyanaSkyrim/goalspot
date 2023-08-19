import React from 'react';
import {Control, Controller, Path} from 'react-hook-form';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import classMerge from '../../utils/classMerge';

interface FormInputProps<TData extends Record<string, unknown>>
  extends TextInputProps {
  control: Control<TData>;
  name: Path<TData>;
}

const FormInput = <TData extends Record<string, string | number | undefined>>({
  control,
  name,
  placeholder,
  style,
  className,
}: FormInputProps<TData>) => {
  return (
    <Controller
      control={control}
      render={({field, fieldState}) => (
        <View
          style={style}
          className={classMerge('mb-3', fieldState.error && 'mb-[2px]')}>
          <TextInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={(field.value || '').toString()}
            placeholder={placeholder}
            className="bg-white w-full rounded-md px-2 py-1"
          />
          {fieldState.error?.message && (
            <Text className="text-sm text-red-400">
              {fieldState.error?.message}
            </Text>
          )}
        </View>
      )}
      name={name}
    />
  );
};

export default FormInput;
