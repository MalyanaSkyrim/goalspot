import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Text, TouchableHighlight, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isAuthenticatedAtom} from '../jotai/atoms';
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

  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const {mutate: register} = trpc.auth.register.useMutation();

  const onSubmit = (data: SignUpData) => {
    register(data, {
      async onSuccess(res) {
        const {accessToken, refreshToken} = res;
        await EncryptedStorage.setItem('accessToken', accessToken);
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        navigation.navigate('OTP', {
          phoneNumber: data.phone,
        });
      },
    });
  };

  return (
    <View
      className={classMerge('space-y-5', !formState.isValid && 'space-y-1')}>
      <Text className="text-white font-semibold text-lg">Create account</Text>
      <View
        className={classMerge('space-y-6', !formState.isValid && 'space-y-1')}>
        <View>
          <FormInput control={control} name="name" placeholder="Name" />
          <FormInput control={control} name="email" placeholder="Email" />
          <FormPhoneInput
            control={control}
            name="phone"
            placeholder="Phone number"
          />
          <FormInput control={control} name="password" placeholder="Password" />
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

export default SignUpForm;
