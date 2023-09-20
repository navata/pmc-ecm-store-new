import useSWR from 'swr';
import { getCollection } from '@/lib/api/product';
import { SWRKeys } from '@/types/keys';

export const useCollection = (params: Record<string, any>): Record<string, any> => {
  const response = useSWR({ key: SWRKeys.ProductCollection, params }, getCollection, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return response;
};
