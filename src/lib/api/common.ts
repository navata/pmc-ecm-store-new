import { environments } from '@/utils/environments';
import { doRequest, getRequest } from '@/lib/services';
import { CAppConfigResponse, CMainDataResponse } from '@/types/common';

export const getAppConfig = async (): Promise<CAppConfigResponse> => {
  const response = await doRequest({
    url: `${environments.apiGateway}app/api/config`,
    method: 'GET',
  });

  return response;
};

export const getMainData = async (): Promise<CMainDataResponse> => {
  const response = await getRequest({
    url: `${environments.apiGateway}ecommerce/main`,
  });

  return response;
};
