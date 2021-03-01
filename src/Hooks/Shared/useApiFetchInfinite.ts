import {useInfiniteQuery, InfiniteQueryConfig} from 'react-query';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import UltimateConfig from 'react-native-ultimate-config';
import {onError} from 'src/Helpers';

export const fetcher = async (url: string, cursor: number = 1) => {
  return await axios.request({
    baseURL: UltimateConfig.API_URL,
    url: url + cursor,
  });
};

function useApiFetchInfinite(
  queryKeys: [
    string,
    number?,
    AxiosRequestConfig['headers']?,
    AxiosRequestConfig?,
  ],
  queryConfig?: InfiniteQueryConfig<AxiosResponse<any>, unknown> | undefined,
) {
  return useInfiniteQuery(queryKeys, fetcher, {onError, ...queryConfig});
}

export default useApiFetchInfinite;
