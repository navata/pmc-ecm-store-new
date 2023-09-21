import qs from 'qs';
import { RequestOption, ResponseType, HttpStatusCode, ResponseData } from '@/types/services';

const RequestPropertyInit: RequestOption = {
  url: '',
  method: 'GET',
  transformRequest: (data) => data,
  responseType: 'json',
};

const convertResponse = async (response: Response, responseType: ResponseType): Promise<any> => {
  switch (responseType) {
    case 'json':
      return await response.json();
    case 'text':
      return await response.text();
    case 'blob':
      return await response.blob();
    default:
      return response;
  }
};

let isRefreshToken: boolean = false;
let refreshSubscribers: Record<string, any>[] = [];

// Function to add a request subscriber to the pending queue
const addSubscriber = (subscriber: Record<string, any>) => {
  refreshSubscribers.push(subscriber);
};

// Execute all api expired
const executeAndClearSubscriber = (token: string) => {
  refreshSubscribers.forEach((subscriber) => subscriber.resolve(token));
  refreshSubscribers = [];
};

const clearAccessAndRefreshToken = (): void => {
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');
};

const refreshToken = async (refreshToken?: string) => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/refreshtoken', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
      // window.localStorage.setItem('access_token', data.accessToken);
      // window.localStorage.setItem('refresh_token', data.refreshToken);
      // refreshSubscribers.forEach((subscriber) => subscriber.resolve(data.accessToken));
      // refreshSubscribers = [];
    } else if (response.status === 403) {
      // window.location.replace('/');
      clearAccessAndRefreshToken();
      alert('Refresh token is expired !');
      throw new Error('Refresh token is expired');
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to refresh token');
  } finally {
    isRefreshToken = false;
  }
};

const makeRequest = async (props = RequestPropertyInit): Promise<ResponseData> => {
  const {
    url,
    method,
    params,
    data,
    headers,
    transformRequest,
    responseType = 'json',
    isAuth,
  } = props;
  let resource = url;
  const requestHeaders: Record<string, any> = {
    ...headers,
    ...(isAuth && {
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
      // 'x-access-token': `${window.localStorage.getItem('access_token') || ''}`,
    }),
  };
  const requestOption: RequestInit = {
    method,
    headers: requestHeaders,
  };
  if (method === 'GET' && params) {
    resource = `${resource}?${qs.stringify(params)}`;
  } else {
    requestOption.body = transformRequest?.(data) || data;
  }

  try {
    const response = await fetch(resource, requestOption);
    if (response.ok) {
      const data = await convertResponse(response, responseType);

      return {
        ...data,
        success: true,
      };
    } else if (response.status == HttpStatusCode.UNAUTHORIZED) {
      if (!isRefreshToken) {
        isRefreshToken = true;
        const dataToken = await refreshToken(window.localStorage.getItem('refresh_token') || '');
        window.localStorage.setItem('access_token', dataToken.accessToken);
        window.localStorage.setItem('refresh_token', dataToken.refreshToken);
        executeAndClearSubscriber(dataToken.accessToken);
      } else {
        const retryRequest = new Promise((resolve, reject) => {
          addSubscriber({ resolve, reject });
        });
        await retryRequest;
      }
      return await makeRequest({
        ...props,
        headers: {
          ...props.headers,
          'x-access-token': window.localStorage.getItem('access_token'),
        },
      });
    } else if (response.status === HttpStatusCode.FORBIDDEN) {
      throw new Error('Forbidden');
    } else {
      const errorData = await convertResponse(response, responseType);
      throw new Error(errorData.message || 'Request failed');
    }
  } catch (error) {
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : '',
    };
  }
};

export const doRequest = async (requestOption: RequestOption) => {
  const { isAuth, method, headers, params, data, ...requestProperty } = requestOption;
  const headersCustom: Record<string, any> = {
    ...headers,
    ...(isAuth && {
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
      // 'x-access-token': `${window.localStorage.getItem('access_token') || ''}`,
    }),
  };

  switch (method) {
    case 'GET':
      return await makeRequest({
        ...requestProperty,
        method: method,
        headers: headersCustom,
        params: params,
      });
    default: {
      let transformRequest = (dataRequest: any) => dataRequest;
      const contentType = headers?.['Content-Type'] || 'application/json';
      switch (contentType) {
        case 'application/json':
          transformRequest = (dataRequest: string) => JSON.stringify(dataRequest);
          break;
      }
      return await makeRequest({
        ...requestProperty,
        method: method,
        headers: headersCustom,
        data: data,
        transformRequest,
      });
    }
  }
};

export const updateRequestCommon = async (requestOption: RequestOption) => {
  const { headers, transformRequest, ...requestProperty } = requestOption;
  const transformRequestDefault = (dataRequest: string) => JSON.stringify(dataRequest);
  const contentTypeDefault = 'application/json';
  const headersCustom: Record<string, any> = {
    ...headers,
    ...{
      'Content-Type': headers?.['Content-Type'] || contentTypeDefault,
    },
  };

  return await makeRequest({
    ...requestProperty,
    headers: headersCustom,
    transformRequest: transformRequest || transformRequestDefault,
  });
};

export const getRequest = async (requestOption: RequestOption) => {
  const { headers, ...requestProperty } = requestOption;
  const contentTypeDefault = 'application/json';
  const headersCustom: Record<string, any> = {
    ...headers,
    ...{
      'Content-Type': headers?.['Content-Type'] || contentTypeDefault,
    },
  };
  return await makeRequest({
    ...requestProperty,
    method: 'GET',
    headers: headersCustom,
  });
};

export const postRequest = async (requestOption: RequestOption) => {
  return await updateRequestCommon({
    ...requestOption,
    method: 'POST',
  });
};

export const patchRequest = async (requestOption: RequestOption) => {
  return await updateRequestCommon({
    ...requestOption,
    method: 'PATCH',
  });
};

export const putRequest = async (requestOption: RequestOption) => {
  return await updateRequestCommon({
    ...requestOption,
    method: 'PUT',
  });
};
