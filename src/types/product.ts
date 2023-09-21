import { RequestOption, ResponseData } from './services';

export interface PCollectionParam {
  id: string;
  page?: number;
  page_size?: number;
  sort_by?: string;
  order_by?: string;
}

export interface PCollectionInput extends RequestOption {
  params: PCollectionParam;
}

export interface PCollectionResponse extends ResponseData {
  data?: {
    collection: Record<string, any>[];
    productions: Record<string, any>[];
  };
}
