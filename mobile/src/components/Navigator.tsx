import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isAuthenticatedAtom, userAtom} from '../jotai/atoms';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import OTPScreen from '../screens/OTPScreen';
import PhoneNumberEditScreen from '../screens/PhoneNumberEditScreen';
import UserTypeScreen from '../screens/UserTypeScreen';
import {RootStackParamList} from '../types/navigation';
import trpc from '../utils/trpc';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  const [userId, setUserId] = useState<string>();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [_, setUser] = useAtom(userAtom);
  const {data: user} = trpc.user.getUser.useQuery(
    {
      id: userId!,
    },
    {
      enabled: !!userId,
      initialData: {
        id: 'azdadzdzd',
        name: 'Mohamed',
        email: 'm@m.mm',
        type: 'pitchOwner',
        active: true,
        phone: '+212622304207',
      },
    },
  );

  const initUserId = useCallback(async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) setUserId(userId);
  }, [userId]);

  const initUser = useCallback(async () => {
    if (user) setUser(user);

    const accessToken = await EncryptedStorage.getItem('accessToken');
    // setIsAuthenticated(!!accessToken);
  }, [user]);

  useEffect(() => {
    initUserId();
    initUser();
  }, [initUser, initUserId]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {isAuthenticated ? (
          <>
            {!user?.active && (
              <>
                <Stack.Screen name="OTP" component={OTPScreen} />
                <Stack.Screen
                  name="PhoneEdit"
                  component={PhoneNumberEditScreen}
                />
              </>
            )}
            {!user?.type && (
              <Stack.Screen name="UserType" component={UserTypeScreen} />
            )}
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
