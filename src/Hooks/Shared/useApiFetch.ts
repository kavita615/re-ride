import {useQuery, QueryConfig} from 'react-query';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import UltimateConfig from 'react-native-ultimate-config';
import {onError} from 'src/Helpers';

export const fetcher = async (
  url: string,
  headers: AxiosRequestConfig['headers'],
  config: AxiosRequestConfig,
) => {
  return await axios.request({
    baseURL: UltimateConfig.API_URL,
    url,
    ...config,
    headers: {
      ...config?.headers,
      ...headers,
    },
  });
};

function useApiFetch(
  queryKeys: [string, AxiosRequestConfig['headers']?, AxiosRequestConfig?],
  queryConfig?: QueryConfig<AxiosResponse<any>, unknown> | undefined,
) {
  return useQuery(queryKeys, fetcher, {onError, ...queryConfig});
}

export default useApiFetch;

// Usage

// const {data, status, error} = useApiFetch(['/users?page=2']);

// console.log(data);
// console.log(status);
// console.log(error);
