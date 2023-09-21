import { ApiKey } from '@/utils/apiUrls';

export interface SWRKey {
  key: ApiKey;
  [key: string]: any;
}
