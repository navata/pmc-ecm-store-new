import useSWR from 'swr';
import { SWRKey } from '@/types/keys';

export const useSwrPmc = (key: SWRKey, fetcher: any, options?: any) => {
  return useSWR(key, fetcher, options);
};
