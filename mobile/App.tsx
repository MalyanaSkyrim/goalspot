import 'react-native-gesture-handler';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';

import {SERVER_URL} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isAuthenticatedAtom} from './src/jotai/atoms';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import OTPScreen from './src/screens/OTPScreen';
import PhoneNumberEditScreen from './src/screens/PhoneNumberEditScreen';
import {RootStackParamList} from './src/types/navigation';
import trpc from './src/utils/trpc';
const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${SERVER_URL}/trpc`,
          async headers() {
            const accessToken = await EncryptedStorage.getItem('accessToken');
            if (!accessToken) return {};
            return {
              authorization: `Bearer ${accessToken}`,
            };
          },
        }),
      ],
    }),
  );

  useEffect(() => {
    EncryptedStorage.getItem('accessToken').then(accessToken => {
      setIsAuthenticated(!!accessToken);
    });
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              header: () => null,
            }}>
            {isAuthenticated ? (
              <>
                <Stack.Screen name="OTP" component={OTPScreen} />
                <Stack.Screen
                  name="PhoneEdit"
                  component={PhoneNumberEditScreen}
                />
                <Stack.Screen name="Home" component={HomeScreen} />
              </>
            ) : (
              <Stack.Screen name="Auth" component={AuthScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
