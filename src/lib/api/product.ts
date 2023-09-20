import { getRequest } from '@/lib/services';
import { environments } from '@/config/environments';

type ResponseData = Record<string, any>;

export const getCollection = async ({ params }: Record<string, any>): Promise<ResponseData> => {
  const response = await getRequest({
    url: `${environments.apiGateway}api/collection`,
    params,
  });

  return response;
};
