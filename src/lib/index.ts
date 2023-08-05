import qs from 'qs';

enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

type ResponseData = Record<string, any>;
type ResponseType = 'json' | 'text' | 'blob'; // 'arraybuffer' | 'document' | 'stream' --> those type will use when need

interface RequestProperty {
  url: string;
  method: 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT';
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, any>;
  transformRequest?: (data: any) => any;
  responseType?: ResponseType;
}

interface RequestOption extends RequestProperty {
  isAuth?: boolean;
}

const RequestPropertyInit: RequestProperty = {
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
  const { url, method, params, data, headers, transformRequest } = props;
  const responseType = props.responseType || 'json';
  let resource = url;
  const requestHeaders: Record<string, any> = { ...headers };
  const requestOption: RequestInit = {
    method,
    headers: requestHeaders,
  };
  if (method === 'GET' && params) {
    resource = `${resource}${qs.stringify(params)}`;
  } else {
    requestOption.body = transformRequest?.(data) || data;
  }

  try {
    const response = await fetch(resource, requestOption);
    if (response.ok) {
      const responseData = await convertResponse(response, responseType);
      return {
        success: true,
        responseData,
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
      'x-access-token': `${window.localStorage.getItem('access_token') || ''}`,
    }),
  };
  let transformRequest = (dataRequest: any) => dataRequest;

  switch (method) {
    case 'GET':
      return await makeRequest({
        ...requestProperty,
        method: method,
        headers: headersCustom,
        params: params,
      });
    default:
      switch (headers?.['Content-Type']) {
        case 'application/json':
          transformRequest = (dataRequest: string) => JSON.stringify(dataRequest);
          break;
        default:
          break;
      }
      return await makeRequest({
        ...requestProperty,
        method: method,
        headers: headersCustom,
        data: data,
        transformRequest: transformRequest,
      });
  }
};
