import { environments } from '@/utils/environments';
const { apiGateway } = environments;
type FieldData = string | number;
type InputData = Record<string, FieldData>;
type UrlValue = string | ((input: InputData) => string);
interface ApiUrl {
  [key: string]: UrlValue;
}

export const apiUrls = {
  // Common
  commonAppConfig: `${apiGateway}app/api/config`,
  // Product
  productCollection: `${apiGateway}api/collection`,
  // Rating
  ratingGetAllReason: ({ type }) => `${apiGateway}pmc-ecm-review-api-golang/api/reason/all/${type}`,
  ratingCreate: `${apiGateway}pmc-ecm-review-api-golang/api/review/order`,
  ratingUpdate: ({ id }) => `${apiGateway}pmc-ecm-review-api-golang/api/review/order/default/${id}`,
} satisfies ApiUrl;

export type ApiKey = keyof typeof apiUrls;
