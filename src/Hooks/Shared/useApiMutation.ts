import {useMutation, setConsole, MutateConfig} from 'react-query';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import UltimateConfig from 'react-native-ultimate-config';
import {onError} from 'src/Helpers';

export const mutator = async (config: AxiosRequestConfig) => {
  const {url, method, data, headers} = config;
  return await axios.request({
    baseURL: UltimateConfig.API_URL,
    url,
    method: method ?? 'POST',
    data,
    ...config,
    headers: {
      ...config?.headers,
      ...headers,
    },
  });
};

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

function useApiMutation(
  mutationConfig?: MutateConfig<AxiosResponse<any>, unknown> | undefined,
) {
  return useMutation(mutator, {onError, ...mutationConfig});
}

export default useApiMutation;

// Usage

// const [mutate, {status, data, error}] = useApiMutation();

// console.log(data);
// console.log(status);
// console.log(error);

// useEffect(() => {
//   mutate({
//     url: '/users',
//     data: {
//       name: 'morpheus',
//       job: 'leader',
//     },
//     method: 'POST',
//   });
// }, [mutate]);
