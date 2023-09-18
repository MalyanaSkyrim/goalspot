import {zodResolver} from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAtom} from 'jotai';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Text, TouchableHighlight, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isAuthenticatedAtom} from '../jotai/atoms';
import {ScreenProps} from '../types/navigation';
import FormInput from '../ui/Form/FormInput';
import trpc from '../utils/trpc';
import {SignInData, signInSchema} from '../utils/validation/auth';

const SignInForm = ({
  navigation,
}: {
  navigation: ScreenProps<'Auth'>['navigation'];
}) => {
  const {control, handleSubmit} = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const {mutate: signIn, error} = trpc.auth.signIn.useMutation();

  const onSubmit = (data: SignInData) => {
    signIn(data, {
      async onSuccess(res) {
        const {user, accessToken, refreshToken} = res;
        await EncryptedStorage.setItem('accessToken', accessToken);
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('userId', user.id);
        setIsAuthenticated(true);
      },
    });
  };
  return (
    <View className="relative space-y-5">
      {error && (
        <View className="bg-danger-600 p-2 rounded opacity-80">
          <Text className="text-white">Invalid credentials</Text>
        </View>
      )}

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
          <FormInput control={control} name="email" placeholder="Email" />
          <FormInput
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableHighlight
          underlayColor="#727272"
          className="bg-neutral-400 justify-center items-center rounded-md py-2"
          onPress={handleSubmit(onSubmit)}>
          <Text className="uppercase text-white">Continue</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SignInForm;
