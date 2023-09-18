import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import OTPTextInput from 'react-native-otp-textinput';
import FtIcon from 'react-native-vector-icons/Feather';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import useKeyboardVisible from '../hooks/useKeyboardVisible';
import {ScreenProps} from '../types/navigation';
import classMerge from '../utils/classMerge';
import trpc from '../utils/trpc';

const OTPScreen = ({navigation, route}: ScreenProps<'OTP'>) => {
  const [isKeyboardVisible] = useKeyboardVisible();
  const [code, setCode] = useState<string>();

  const [resendCount, setResendCount] = useState(0);
  const [timeToResend, setTimeToResend] = useState(0);

  const phoneNumber = route.params?.phoneNumber;

  const {mutate: verifyOTP, error, reset} = trpc.auth.verifyOTP.useMutation();

  const validateOtp = async () => {
    if (code && phoneNumber) {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      verifyOTP(
        {id: userId, code, phone: phoneNumber},
        {
          onSuccess() {
            navigation.navigate('Home');
          },
        },
      );
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeToResend > 0) setTimeToResend(timeToResend - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeToResend]);

  const handleCodeChange = (value: string) => {
    setCode(value);
    reset();
  };

  const navigateToPhoneNumberEditScreen = () => {
    navigation.navigate('PhoneEdit', {phoneNumber});
  };
  const resendOtpCode = () => {
    setResendCount(resendCount + 1);
    setTimeToResend(30 * (resendCount + 1));
  };

  const codeInvalid = !code || code.length < 6;

  return (
    <View className="relative flex-1">
      <ImageBackground
        blurRadius={4}
        className="flex-1"
        source={require('../assets/images/football-pitch-background.jpg')}>
        <View className="flex-1 bg-black/30 items-center px-2">
          <LinearGradient
            colors={['#9c9c9c38', '#9c9c9c90']}
            locations={[0.7, 1]}
            className={classMerge(
              'bg-gradient-to-b from-neutral-500/50 to-neutral-500 rounded-md w-full h-[50%] top-[30%] px-3 py-4',
              isKeyboardVisible && 'h-[70%] top-[22%]',
            )}>
            <View>
              <Text className="text-white text-2xl font-medium">
                OTP verification
              </Text>
              <Text className="text-neutral-300 text-lg mt-4">
                We've sent a verification code to{' '}
                <Text className="font-bold">{phoneNumber}</Text>
              </Text>
              <TouchableOpacity
                className="flex-row items-center space-x-1 mt-2"
                onPress={navigateToPhoneNumberEditScreen}>
                <FtIcon name="edit" size={16} color="#d1d5db" />
                <Text className="font-semibold text-gray-300 text-base underline">
                  Edit phone number
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1 justify-between mt-6">
              <View className="space-y-2">
                <OTPTextInput
                  handleTextChange={handleCodeChange}
                  inputCount={6}
                  containerStyle={{
                    borderWidth: 0,
                    paddingHorizontal: 0,
                  }}
                  textInputStyle={{
                    backgroundColor: 'white',
                    borderRadius: 6,
                    marginHorizontal: 0,
                  }}
                  tintColor="#9acd32"
                />
                {error && (
                  <Text className="text-danger-400 font-semibold">
                    Code is invalid
                  </Text>
                )}
              </View>
              <View className="space-y-4">
                <TouchableOpacity
                  disabled={timeToResend > 0}
                  className={classMerge(
                    'w-full flex-row items-center space-x-1 mt-2 justify-center',
                    timeToResend > 0 && 'opacity-50',
                  )}
                  onPress={resendOtpCode}>
                  <FaIcon name="send" size={16} color="#d1d5db" />
                  <Text className="font-semibold text-gray-300 text-base underline uppercase">
                    {timeToResend > 0
                      ? `Resend OTP in ${format(
                          new Date(timeToResend * 1000),
                          'mm:ss',
                        )}`
                      : 'Resend code'}
                  </Text>
                </TouchableOpacity>

                <TouchableHighlight
                  disabled={codeInvalid || !!error}
                  underlayColor="#6b8f22"
                  className={classMerge(
                    'bg-[#9acd32] justify-center items-center rounded-md py-2',
                    (codeInvalid || !!error) && 'opacity-40',
                  )}
                  onPress={validateOtp}>
                  <Text className="uppercase text-white">Continue</Text>
                </TouchableHighlight>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OTPScreen;
