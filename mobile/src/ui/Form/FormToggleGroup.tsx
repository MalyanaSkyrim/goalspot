import React from 'react';
import ToggleGroup, {ToggleGroupProps} from '../ToggleGroup';

import {Control, Controller, Path} from 'react-hook-form';

interface FormToggleGroupProps<
  TData extends Record<string, unknown>,
  T extends string,
> extends ToggleGroupProps<T> {
  name: Path<TData>;
  control: Control<TData>;
}

const FormToggleGroup = <
  TData extends Record<string, unknown>,
  T extends string,
>({
  name,
  control,
  ...props
}: FormToggleGroupProps<TData, T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <ToggleGroup
          value={field.value as T}
          onValueChange={field.onChange}
          {...props}
        />
      )}
    />
  );
};

export default FormToggleGroup;
