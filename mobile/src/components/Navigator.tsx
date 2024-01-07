import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isAuthenticatedAtom, userAtom} from '../jotai/atoms';
import AuthScreen from '../screens/AuthScreen';

import CreateFieldScreen from '../screens/CreateFieldScreen';

import AddFieldImagesScreen from '../screens/AddFieldImagesScreen';
import {LoadingScreen} from '../screens/LoadingScreen';
import ManageFieldsScreen from '../screens/ManageFieldsScreen';
import OTPScreen from '../screens/OTPScreen';
import PhoneNumberEditScreen from '../screens/PhoneNumberEditScreen';
import UserTypeScreen from '../screens/UserTypeScreen';
import {RootStackParamList} from '../types/navigation';
import trpc from '../utils/trpc';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userId, setUserId] = useState<string>();

  console.log('sky', {user, userId, enabled: !!(userId && !user)});

  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const {data: userData, isFetching} = trpc.user.getUser.useQuery(
    {
      id: userId!,
    },
    {
      enabled: !!(userId && !user),
    },
  );

  const initUserId = useCallback(async () => {
    const savedUserId = await AsyncStorage.getItem('userId');
    if (savedUserId) setUserId(savedUserId);
  }, [userId]);

  const initUser = useCallback(async () => {
    if (userData && isAuthenticated) setUser(userData);

    const accessToken = await EncryptedStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  }, [isAuthenticated, userData]);

  useEffect(() => {
    initUserId();
  }, []);

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {isFetching && (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        )}
        {isAuthenticated && user ? (
          <>
            {!user.active && (
              <>
                <Stack.Screen name="OTP" component={OTPScreen} />
                <Stack.Screen
                  name="PhoneEdit"
                  component={PhoneNumberEditScreen}
                />
              </>
            )}
            {!user.type && (
              <Stack.Screen name="UserType" component={UserTypeScreen} />
            )}

            {user.pitches.length > 1 && (
              <>
                <Stack.Screen
                  name="CreateField"
                  component={CreateFieldScreen}
                />
                <Stack.Screen
                  name="AddFieldImages"
                  component={AddFieldImagesScreen}
                />
              </>
            )}
            <Stack.Screen
              name="ManageFieldsScreen"
              component={ManageFieldsScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
