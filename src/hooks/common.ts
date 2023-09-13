import { environments } from '@/config/environments';
// import { getAppConfig } from '@/lib/api/common';
import useSWR from 'swr';

export const useAppConfig = () => {
  const response = useSWR({ url: `${environments.apiGateway}app/api/config`, method: 'GET' });
  return response;
};
