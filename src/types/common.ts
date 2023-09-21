import { ResponseData } from './services';

export interface CAppConfigResponse extends ResponseData {
  data?: Record<string, any>[];
  error?: boolean;
  message?: string;
}

export interface CMainDataResponse extends ResponseData {
  categories?: Record<string, any>;
  galleries?: Record<string, any>;
  error?: boolean;
}
