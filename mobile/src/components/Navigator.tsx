import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isAuthenticatedAtom, userAtom} from '../jotai/atoms';
import AuthScreen from '../screens/AuthScreen';

import CreateFieldScreen from '../screens/CreateFieldScreen';
import EditFieldImagesScreen from '../screens/EditFieldImagesScreen';
import {LoadingScreen} from '../screens/LoadingScreen';
import OTPScreen from '../screens/OTPScreen';
import PhoneNumberEditScreen from '../screens/PhoneNumberEditScreen';
import UserTypeScreen from '../screens/UserTypeScreen';
import {RootStackParamList} from '../types/navigation';
import trpc from '../utils/trpc';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userId, setUserId] = useState<string>();

  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const {data: userData, isLoading} = trpc.user.getUser.useQuery(
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
    //DevOnly: to clear storage
    // EncryptedStorage.clear();
    // AsyncStorage.clear();

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
        {isLoading && <Stack.Screen name="Loading" component={LoadingScreen} />}
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
            <Stack.Screen
              name="EditFieldImages"
              component={EditFieldImagesScreen}
            />
            <Stack.Screen name="CreateField" component={CreateFieldScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
