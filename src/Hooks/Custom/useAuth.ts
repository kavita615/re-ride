/* eslint-disable prettier/prettier */
import { useCallback } from 'react';
import { useQueryCache } from 'react-query';
import AppStateHandler from 'src/StateHandlers/AppStateHandler';
import SnackbarHandler from 'src/Utils/Shared/SnackbarHandler';
import useApiMutation from '../Shared/useApiMutation';

function useAuth() {
  const [mutate, {status}] = useApiMutation();
  const queryCache = useQueryCache();

  const login = useCallback(
    async ({ email, password }) => {
      queryCache.clear();
      console.log(email, password);
      try {
        const response = await mutate({
          url: '/login',
          data: { email, password },
          method: 'POST',
        });
        console.log(response);

        if (response) {
          const { status: statusCode, data } = response;
          if (statusCode === 200) {
            console.log(data);
            AppStateHandler.login({
              token: data?.token,
              user: { email, password },
            });
            SnackbarHandler.successToast('Logged in successfully');
          } else {
          }
        }
      } catch (error) {
        SnackbarHandler.errorToast('Logged failed');
      }
    },
    [mutate, queryCache],
  );

  const forgotPassword =  useCallback(
    async ({ email }) => {
      queryCache.clear();
      console.log(email);
      try {
        const response = await mutate({
          url: '/forgot_password',
          data: { email },
          method: 'POST',
        });
        console.log(response);

        if (response) {
          const { status: statusCode, data } = response;
          if (statusCode === 200) {
            console.log(data);
            SnackbarHandler.successToast('Email Sent successfully');
          } else {
          }
        }
      } catch (error) {
        SnackbarHandler.errorToast('Email failed');
      }
    },
    [mutate, queryCache],
  );

  return {login, forgotPassword, loading: status === 'loading', status};
}

export default useAuth;
