import {Text} from '@rneui/base';
import {useAtom} from 'jotai';
import React from 'react';
import {View} from 'react-native';
import {userAtom} from '../jotai/atoms';

const HomeScreen = () => {
  const [user] = useAtom(userAtom);
  console.log('sky', {user});
  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
};

export default HomeScreen;
