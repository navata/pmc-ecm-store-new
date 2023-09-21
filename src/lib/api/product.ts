import { getRequest } from '@/lib/services';
import { apiUrls } from '@/utils/apiUrls';
import { PCollectionInput, PCollectionResponse } from '@/types/product';

export const getCollection = async ({ params }: PCollectionInput): Promise<PCollectionResponse> => {
  const response = await getRequest({
    url: apiUrls.productCollection,
    params,
  });

  return response;
};
