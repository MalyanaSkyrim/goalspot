import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Text, TouchableHighlight, View} from 'react-native';
import FormInput from '../ui/Form/FormInput';
import classMerge from '../utils/classMerge';
import {SignUpData, signUpSchema} from '../utils/validation/auth';

const SignUpForm = () => {
  const {control, handleSubmit, formState} = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = (data: SignUpData) => {
    console.log('sky', {data});
  };

  return (
    <View
      className={classMerge('space-y-5', !formState.isValid && 'space-y-1')}>
      <Text className="text-white font-semibold text-lg">Create account</Text>
      <View
        className={classMerge('space-y-6', !formState.isValid && 'space-y-1')}>
        <View>
          <FormInput control={control} name="username" placeholder="Username" />
          <FormInput control={control} name="email" placeholder="Email" />
          <FormInput
            control={control}
            name="phone"
            placeholder="Phone number"
          />
          <FormInput control={control} name="password" placeholder="Password" />
        </View>
        <TouchableHighlight
          className="bg-neutral-400 justify-center items-center rounded-md py-2"
          onPress={handleSubmit(onSubmit)}>
          <Text className="uppercase text-white">Continue</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SignUpForm;
