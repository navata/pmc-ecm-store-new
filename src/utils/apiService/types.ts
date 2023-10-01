interface RequestProperty {
  path: string;
  method?: 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, any>;
  transformRequest?: (data: any) => any;
  responseType?: ResponseType;
  isRetry?: boolean;
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export type ResponseType = 'json' | 'text' | 'blob';

export interface RequestOption extends RequestProperty {
  isAuth?: boolean;
}

export interface ResponseData {
  success: boolean;
  responseData: any;
  errorMessage?: string | undefined;
  [key: string]: any;
}

export type SubscriberItemType = (token: string) => void;

export interface RefreshTokenResponse {
  token?: string;
}

export interface ResponseError {
  status?: number;
}

export interface CreateRequestProps {
  refreshToken: () => Promise<RefreshTokenResponse>;
  getToken: () => string;
  onRetryFailed: () => void;
  shouldRefreshToken: (response: ResponseError) => boolean;
  minTokenRefreshDuration?: number;
}
