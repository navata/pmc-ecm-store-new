import { getRequest } from '@/lib/services';

type ResponseData = Record<string, any>;

export const getAppConfig = async ({ params, url }: Record<string, any>): Promise<ResponseData> => {
  const response = await getRequest({
    url,
    params,
  });

  return response;
};

export const getProductList = async ({ params }: Record<string, any>) => {
  const response = await getRequest({
    url: `https://api-gateway.pharmacity.vn/api/category?slug=thuc-pham-chuc-nang&page_size=500&page=${params?.page}`,
  });
  return response;
};
