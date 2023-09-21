// exporttype ResponseData = Record<string, any>;
// import { ResponseData } from '@/types/services';

interface RequestProperty {
  url: string;
  method?: 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, any>;
  transformRequest?: (data: any) => any;
  responseType?: ResponseType;
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
  [key: string]: any;
}
