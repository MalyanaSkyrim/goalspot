import {zodResolver} from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ImageBackground, KeyboardAvoidingView, Text, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {ScreenProps} from '../types/navigation';
import FormPhoneInput from '../ui/Form/FormPhoneInput';
import classMerge from '../utils/classMerge';
import trpc from '../utils/trpc';
import {
  UpdatePhoneNumberData,
  updatePhoneNumberSchema,
} from '../utils/validation/user';

const PhoneNumberEditScreen = ({
  navigation,
  route,
}: ScreenProps<'PhoneEdit'>) => {
  const phoneNumber = route.params?.phoneNumber;

  const {control, handleSubmit} = useForm<UpdatePhoneNumberData>({
    resolver: zodResolver(updatePhoneNumberSchema),
  });

  const {mutateAsync: sendOtp} = trpc.auth.sendOtp.useMutation();
  const {mutateAsync: updateUser} = trpc.user.updateUser.useMutation();

  const onSubmit = async (data: UpdatePhoneNumberData) => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;
    await updateUser({id: userId, data});
    await sendOtp({phone: data.phone});
    navigation.navigate('OTP', {phoneNumber: data.phone});
  };

  const cancel = () => {
    navigation.navigate('OTP', {phoneNumber});
  };

  return (
    <View className="relative flex-1">
      <ImageBackground
        blurRadius={4}
        className="flex-1"
        source={require('../assets/images/football-pitch-background.jpg')}>
        <KeyboardAvoidingView className="flex-1 bg-black/30 items-center px-2">
          <LinearGradient
            colors={['#9c9c9c38', '#9c9c9c90']}
            locations={[0.7, 1]}
            className={classMerge(
              'bg-gradient-to-b from-neutral-500/50 to-neutral-500 rounded-md w-full h-[30%] min-h-[250px] top-[30%] px-3 py-4',
            )}>
            <View className="flex-1 justify-between">
              <Text className="text-white text-2xl font-medium">
                Edit phone number
              </Text>
              <FormPhoneInput
                control={control}
                name="phone"
                placeholder="Phone number"
              />
              <View className="flex-row space-x-1">
                <View className="flex-1">
                  <TouchableHighlight
                    underlayColor="#6b8f22"
                    className="bg-[#9acd32] justify-center items-center rounded-md py-2"
                    onPress={handleSubmit(onSubmit)}>
                    <Text className="uppercase text-white">Validate</Text>
                  </TouchableHighlight>
                </View>
                <View className="flex-1">
                  <TouchableHighlight
                    underlayColor="#727272"
                    className="bg-neutral-400 justify-center items-center rounded-md py-2"
                    onPress={cancel}>
                    <Text className="uppercase text-white">Cancel</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default PhoneNumberEditScreen;
