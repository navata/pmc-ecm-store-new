import { getRequest } from '@/lib/services';

type ResponseData = Record<string, any>;

export const getAppConfig = async ({ params, url }: Record<string, any>): Promise<ResponseData> => {
  const response = await getRequest({
    url,
    params,
  });

  return response;
};
