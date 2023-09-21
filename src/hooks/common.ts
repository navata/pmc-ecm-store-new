import { useSwrPmc } from './swrPmc';
import { getAppConfig } from '@/lib/api/common';

export const useAppConfig = () => {
  const response = useSwrPmc({ key: 'commonAppConfig' }, getAppConfig);
  return response;
};
