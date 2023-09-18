import 'react-native-gesture-handler';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';

import {SERVER_URL} from '@env';
import React, {useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Navigator from './src/components/Navigator';
import trpc from './src/utils/trpc';
import {refreshTokenLink} from './src/utils/trpc/refreshTokenLink';

function App(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        refreshTokenLink(),
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

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Navigator />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
