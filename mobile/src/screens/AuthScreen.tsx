import {TabView} from '@rneui/base';
import {Tab} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import {ScreenProps} from '../types/navigation';
import classMerge from '../utils/classMerge';

const AuthScreen = ({navigation}: ScreenProps<'Auth'>) => {
  const [index, setIndex] = useState(0);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
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
              'bg-gradient-to-b from-neutral-500/50 to-neutral-500 rounded-md w-full h-[62%] top-[22%] px-3',
              isKeyboardVisible && 'h-[94%] top-[3%]',
            )}>
            <Tab
              value={index}
              onChange={e => setIndex(e)}
              indicatorStyle={{
                backgroundColor: '#9acd32',
                height: 2,
              }}
              variant="default">
              <Tab.Item
                TouchableComponent={TouchableWithoutFeedback}
                title="Sign In"
                titleStyle={active => ({
                  fontSize: 14,
                  color: active ? '#9acd32' : 'white',
                  paddingVertical: 4,
                  textTransform: 'uppercase',
                })}
              />
              <Tab.Item
                TouchableComponent={TouchableWithoutFeedback}
                title="Register"
                titleStyle={active => ({
                  fontSize: 14,
                  color: active ? '#9acd32' : 'white',
                  paddingVertical: 4,
                  textTransform: 'uppercase',
                })}
              />
            </Tab>
            <TabView
              value={index}
              onChange={setIndex}
              animationType="spring"
              containerStyle={{
                overflow: 'hidden',
                flex: 1,
              }}>
              <TabView.Item className="flex-1 justify-center">
                <SignInForm navigation={navigation} />
              </TabView.Item>
              <TabView.Item className="flex-1 justify-center">
                <SignUpForm navigation={navigation} />
              </TabView.Item>
            </TabView>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AuthScreen;
