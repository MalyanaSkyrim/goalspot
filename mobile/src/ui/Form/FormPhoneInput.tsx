import React from 'react';
import {Control, Controller, Path} from 'react-hook-form';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import PhoneInput, {PhoneInputProps} from 'react-native-phone-number-input';

interface FormInputProps<TData extends Record<string, unknown>>
  extends PhoneInputProps {
  control: Control<TData>;
  name: Path<TData>;
  style?: StyleProp<ViewStyle>;
}

const FormPhoneInput = <
  TData extends Record<string, string | number | undefined>,
>({
  control,
  name,
  placeholder,
  style,
}: FormInputProps<TData>) => {
  return (
    <Controller
      control={control}
      render={({field, fieldState}) => (
        <View style={style}>
          <PhoneInput
            defaultCode="MA"
            onChangeFormattedText={field.onChange}
            value={(field.value || '').toString()}
            placeholder={placeholder}
            textContainerStyle={{paddingVertical: 0, height: 42}}
            containerStyle={{
              borderRadius: 6,
              overflow: 'hidden',
              width: '100%',
            }}
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

export default FormPhoneInput;
