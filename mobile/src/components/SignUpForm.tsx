import {zodResolver} from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAtom} from 'jotai';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Text, TouchableHighlight, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isAuthenticatedAtom, userAtom} from '../jotai/atoms';
import {ScreenProps} from '../types/navigation';
import FormInput from '../ui/Form/FormInput';
import FormPhoneInput from '../ui/Form/FormPhoneInput';
import classMerge from '../utils/classMerge';
import trpc from '../utils/trpc';
import {SignUpData, signUpSchema} from '../utils/validation/auth';

const SignUpForm = ({
  navigation,
}: {
  navigation: ScreenProps<'Auth'>['navigation'];
}) => {
  const {control, handleSubmit, formState} = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const formHasErrors = Object.keys(formState.errors).length > 0;

  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setUser] = useAtom(userAtom);

  const {mutate: register} = trpc.auth.register.useMutation();

  const onSubmit = (data: SignUpData) => {
    register(data, {
      async onSuccess(res) {
        const {user, accessToken, refreshToken} = res;
        await EncryptedStorage.setItem('accessToken', accessToken);
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('userId', user.id);
        setIsAuthenticated(true);
        setUser(user);
        navigation.navigate('OTP', {
          phoneNumber: data.phone,
        });
      },
    });
  };

  return (
    <View className={classMerge('space-y-5', formHasErrors && 'space-y-1')}>
      <Text className="text-white font-semibold text-lg">Create account</Text>
      <View>
        <View className={classMerge('space-y-4', formHasErrors && 'space-y-1')}>
          <FormInput control={control} name="name" placeholder="Name" />
          <FormInput control={control} name="email" placeholder="Email" />
          <FormPhoneInput
            control={control}
            name="phone"
            placeholder="Phone number"
          />
          <FormInput
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <View className="mt-6">
          <TouchableHighlight
            underlayColor="#727272"
            className={classMerge(
              'bg-neutral-400 justify-center items-center rounded-md py-2 mt-6',
              formHasErrors && 'mt-1',
            )}
            onPress={handleSubmit(onSubmit)}>
            <Text className="uppercase text-white">Continue</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default SignUpForm;
