import {useAtom} from 'jotai';
import React from 'react';
import {Text, View} from 'react-native';
import {userAtom} from '../jotai/atoms';

const HomeScreen = () => {
  const [user] = useAtom(userAtom);

  return (
    <View className="flex-1">
      <Text className="text-2xl">{user?.type}</Text>
    </View>
  );
};

export default HomeScreen;
