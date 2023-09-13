import { environments } from '@/config/environments';
import useSWR from 'swr';
import { getRequest } from '@/lib/services';

export const useCollection = (params: Record<string, any>): Record<string, any> => {
  const response = useSWR(
    // { url: `${environments.apiGateway}api/collection`, params },
    [`${environments.apiGateway}api/collection`, params],
    (_) => {
      console.log('_', _);
      return getRequest({ url: _[0], params: _[1] });
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return response;
};
