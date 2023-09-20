type FieldData = string | number;

type InputData = Record<string, FieldData>;

export const apiUrls = {
  productionDetail: ({ id }: InputData) => `/production/${id}/detail`,
  user: '/api/user',
  products: {
    getAll: '/api/products',
  },
};
