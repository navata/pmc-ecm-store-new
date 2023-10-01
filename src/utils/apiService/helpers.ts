import qs from 'qs';
import {
  RequestOption,
  ResponseData,
  ResponseType,
  SubscriberItemType,
  CreateRequestProps,
} from './types';

export const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

const RequestPropertyInit: RequestOption = {
  path: '',
  method: 'GET',
  transformRequest: (data) => data,
  responseType: 'json',
  // params: '',
  // data: '',
  // headers: {}
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

export const createRequest = (props: CreateRequestProps) => {
  const {
    refreshToken,
    getToken = () => '',
    onRetryFailed = () => undefined,
    shouldRefreshToken = () => false,
    minTokenRefreshDuration = 1000,
  } = props;

  let isTokenRefreshing = false;
  let refreshSubscribers: Array<SubscriberItemType> = [];
  let lastRefreshTime = Date.now();

  // Function to add a request subscriber to the pending queue
  const addSubscriber = (subscriber: SubscriberItemType) => {
    refreshSubscribers.push(subscriber);
  };

  // Execute all api expired
  const executeAndClearSubscriber = (token = '') => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
  };

  // Handle refresh token
  const handleRefreshToken = async () => {
    try {
      const response = await refreshToken();
      if (response?.token) {
        executeAndClearSubscriber(response.token);
        lastRefreshTime = Date.now();
        isTokenRefreshing = false;
        return response;
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : 'Failed to refresh token');
    }
  };

  const fetchData = async (props = RequestPropertyInit): Promise<ResponseData> => {
    const {
      path,
      method,
      params,
      data,
      headers,
      transformRequest,
      responseType = 'json',
      isRetry,
      // isAuth = false,
    } = props;
    let resource = path;
    const requestHeaders = {
      ...headers,
      // ...(isAuth && {
      Authorization: getToken(),
      // }),
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
          responseData: data,
          success: true,
        };
      }

      if (isRetry) {
        onRetryFailed();
        throw new Error('Not permission');
      }

      if (!shouldRefreshToken(response)) {
        const errorData = await convertResponse(response, responseType);
        throw new Error(errorData.message || 'Request failed');
      }

      const lastRefreshDuration = Date.now() - lastRefreshTime;

      if (!isTokenRefreshing) {
        // Prevent call multi api same Promise in Chrome
        if (lastRefreshDuration < minTokenRefreshDuration) {
          return fetchData({
            ...props,
            headers: {
              ...props.headers,
              Authorization: getToken(),
            },
            isRetry: true,
          });
        }
        isTokenRefreshing = true;
        handleRefreshToken();
      }
      const fetchDataQueue: Promise<ResponseData> = new Promise((resolve) => {
        addSubscriber((token) => {
          resolve(
            fetchData({
              ...props,
              headers: {
                ...props.headers,
                Authorization: token,
              },
              isRetry: true,
            })
          );
        });
      });
      return fetchDataQueue;
    } catch (error) {
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : '',
        responseData: null,
      };
    }
  };

  return { fetchData };
};
