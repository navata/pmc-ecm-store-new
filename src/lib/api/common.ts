import { environments } from '@/config/environments';
import { doRequest } from '@/lib/services';

type ResponseData = Record<string, any>;

export const getAppConfig = async (): Promise<ResponseData> => {
  const response = await doRequest({
    url: `${environments.apiGateway}app/api/config`,
    method: 'GET',
  });

  return response;
};
