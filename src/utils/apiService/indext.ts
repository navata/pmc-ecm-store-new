import { createRequest, HttpStatusCode } from './helpers';
import { ResponseError, RequestOption } from './types';
import { getToken, setToken, getRefreshToken, clearStorage } from '../localStorage';

const urlRefreshToken = '';
const getTokenUser = () => `Bearer ${getToken()}`;
const getRefreshTokenUser = () => `Bearer ${getRefreshToken()}`;

const onRetryFailed = () => {
  clearStorage();
  window.location.replace('/');
};

const shouldRefreshToken = (response: ResponseError) =>
  response.status === HttpStatusCode.UNAUTHORIZED || response.status === HttpStatusCode.FORBIDDEN;

const refreshToken = async () => {
  try {
    const response = await fetch(urlRefreshToken, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getRefreshTokenUser(),
      },
    });
    if (response.ok) {
      const data = await response.json();
      setToken(data?.data?.access_token);
      return {
        token: `Bearer ${data?.data?.access_token}`, // Require return token when success
      };
    } else if (response.status === HttpStatusCode.UNAUTHORIZED) {
      onRetryFailed();
      throw new Error('Refresh token is expired');
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to refresh token');
  }
};

const { fetchData } = createRequest({
  refreshToken,
  getToken: getTokenUser,
  onRetryFailed,
  shouldRefreshToken,
  minTokenRefreshDuration: 1000,
});

const sendRequest = (config: RequestOption, params: any) => {
  if (config.method === 'GET') {
    return fetchData({ ...config, params });
  }
  const transformRequestDefault = (data: any) => JSON.stringify(data);
  return fetchData({
    ...config,
    transformRequest: config.transformRequest || transformRequestDefault,
    data: params,
  });
};

export { sendRequest };
