import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Text, TouchableHighlight, View} from 'react-native';
import FormInput from '../ui/Form/FormInput';
import {SignInData, signInSchema} from '../utils/validation/auth';

const SignInForm = () => {
  const {control, handleSubmit} = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInData) => {
    console.log('sky', {data});
  };
  return (
    <View className="space-y-5">
      <View className="space-y-2">
        <Text className="text-white font-semibold text-lg">Welcome back!</Text>
        <View>
          <Text className="text-neutral-300/70 font-light">
            Please enter your username and password
          </Text>
          <Text className="text-neutral-300/70 font-light">
            to confirm your identity.
          </Text>
        </View>
      </View>
      <View className="space-y-6">
        <View>
          <FormInput control={control} name="username" placeholder="Username" />
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

export default SignInForm;
