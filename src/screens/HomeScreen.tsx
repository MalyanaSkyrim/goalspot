import {TabView} from '@rneui/base';
import {Tab} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import classMerge from '../utils/classMerge';

const HomeScreen = () => {
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
              isKeyboardVisible && 'h-[90%] top-[5%]',
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
                <View className="space-y-5">
                  <View className="space-y-2">
                    <Text className="text-white font-semibold text-lg">
                      Welcome back!
                    </Text>
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
                    <View className="space-y-3">
                      <TextInput
                        placeholder="Username"
                        className="bg-white w-full rounded-md px-2 py-1"
                      />
                      <TextInput
                        placeholder="Password"
                        className="bg-white w-full rounded-md px-2 py-1"
                      />
                    </View>
                    <TouchableHighlight className="bg-neutral-400 justify-center items-center rounded-md py-2">
                      <Text className="uppercase text-white">Continue</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </TabView.Item>
              <TabView.Item>
                <Text>Favorite</Text>
              </TabView.Item>
            </TabView>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
