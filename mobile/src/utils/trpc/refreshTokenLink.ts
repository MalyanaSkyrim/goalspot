import {SERVER_URL} from '@env';
import type {TRPCLink} from '@trpc/client';
import {createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import type {AnyRouter} from '@trpc/server';
import type {Unsubscribable} from '@trpc/server/observable';
import {observable} from '@trpc/server/observable';
import EncryptedStorage from 'react-native-encrypted-storage';
import type {AppRouter} from 'server/src/modules';

const trpcProxyClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${SERVER_URL}/trpc`,
    }),
  ],
});

const getRefreshToken = () => {
  return EncryptedStorage.getItem('refreshToken');
};

const fetchJwtPairByRefreshToken = (refreshToken: string) => {
  return trpcProxyClient.auth.renewToken
    .mutate({refreshToken})
    .catch(async err => {
      await EncryptedStorage.removeItem('refreshToken');
      await EncryptedStorage.removeItem('accessToken');
      throw err;
    });
};
const onAccessTokenFetched = (accessToken: string) => {
  return EncryptedStorage.setItem('accessToken', accessToken);
};

export const refreshTokenLink = (): TRPCLink<AnyRouter> => {
  return () => {
    // app-level state of the refresh flow
    const refreshState: {promise: Promise<void> | null} = {
      promise: null,
    };

    return ({next, op}) => {
      // on each request
      return observable(observer => {
        let next$: Unsubscribable | null = null;

        async function attempt() {
          next$?.unsubscribe();
          next$ = next(op).subscribe({
            async error(err) {
              if (err.data?.code === 'UNAUTHORIZED') {
                const refreshToken = await getRefreshToken();
                if (refreshToken) {
                  refreshState.promise = (async () => {
                    try {
                      const {accessToken} = await fetchJwtPairByRefreshToken(
                        refreshToken,
                      );
                      await onAccessTokenFetched(accessToken);
                    } catch (e) {
                      throw e;
                    } finally {
                      refreshState.promise = null;
                    }
                  })();

                  try {
                    await refreshState.promise;
                    attempt();
                    return;
                  } catch (e) {}
                }
              }
              observer.error(err);
            },
            next(value) {
              observer.next(value);
            },
            complete() {
              observer.complete();
            },
          });
        }
        const refreshPromise = refreshState.promise ?? Promise.resolve();
        refreshPromise.finally(() => {
          attempt();
        });

        return () => {
          next$?.unsubscribe();
        };
      });
    };
  };
};
