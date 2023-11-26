import {ISwitchProps, Switch} from 'native-base';
import React, {JSX} from 'react';
import {Control, Controller, Path} from 'react-hook-form';
import {View} from 'react-native';
import classMerge from '../../utils/classMerge';
import TextField from './TextField';

interface FormSwitchProps<
  TData extends Record<string, string | number | boolean | undefined>,
> extends ISwitchProps {
  name: Path<TData>;
  control: Control<TData>;
  label?: string;
  icon?: JSX.Element;
  labelClassName?: string;
}

const FormSwitch = <
  TData extends Record<string, string | number | boolean | undefined>,
>({
  name,
  control,
  style,
  label,
  labelClassName,
  icon,
  ...props
}: FormSwitchProps<TData>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <View
          style={style}
          className={classMerge(
            'mb-3 flex-row items-center justify-between',
            fieldState.error && 'mb-[2px]',
          )}>
          {label ? (
            <View className="flex-row items-center space-x-2">
              {icon && icon}
              <TextField
                className={classMerge(
                  'text-base text-neutral-800',
                  labelClassName,
                )}>
                {label}
              </TextField>
            </View>
          ) : (
            <View></View>
          )}
          <Switch
            onTrackColor="#9acd32"
            onValueChange={field.onChange}
            {...props}
          />
        </View>
      )}
    />
  );
};

export default FormSwitch;
