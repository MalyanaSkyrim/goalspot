import {Text} from '@rneui/base';
import React from 'react';
import {ImageBackground, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useKeyboardVisible from '../hooks/useKeyboardVisible';
import classMerge from '../utils/classMerge';

const PhoneNumberEditScreen = () => {
  const [isKeyboardVisible] = useKeyboardVisible();
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
                Edit phone number
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PhoneNumberEditScreen;
