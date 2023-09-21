import { getCollection } from '@/lib/api/product';
import { useSwrPmc } from './swrPmc';
import { PCollectionParam } from '@/types/product';

export const useCollection = (params: PCollectionParam): Record<string, any> => {
  const response = useSwrPmc({ key: 'productCollection', params }, getCollection, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return response;
};
