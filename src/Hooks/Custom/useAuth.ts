import {useCallback} from 'react';
import {useQueryCache} from 'react-query';
import AppStateHandler from 'src/StateHandlers/AppStateHandler';
import SnackbarHandler from 'src/Utils/Shared/SnackbarHandler';
import useApiMutation from '../Shared/useApiMutation';

function useAuth() {
  const [mutate, {status}] = useApiMutation();
  const queryCache = useQueryCache();

  const login = useCallback(
    async ({email, password}) => {
      queryCache.clear();
      try {
        const response = await mutate({
          url: '/login',
          data: {email, password},
          method: 'POST',
        });
        if (response) {
          const {status: statusCode, data} = response;
          if (statusCode === 200) {
            console.log(data);
            AppStateHandler.login({
              token: data?.token,
              user: {email, password},
            });
            SnackbarHandler.successToast('Logged in successfully');
          }
        }
      } catch (error) {
        SnackbarHandler.errorToast('Logged failed');
      }
    },
    [mutate, queryCache],
  );

  return {login, loading: status === 'loading'};
}

export default useAuth;
