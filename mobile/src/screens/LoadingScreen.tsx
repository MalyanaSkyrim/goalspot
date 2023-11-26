import React from 'react';
import {View} from 'react-native';
import TextField from '../ui/Form/TextField';

export const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <TextField className="text-primary text-xl font-semibold">
        Fetching user...
      </TextField>
    </View>
  );
};
