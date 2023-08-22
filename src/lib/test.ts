import { doRequest } from './services';

type ResponseData = Record<string, any>;

export const getAll = async (): Promise<ResponseData> => {
  const response = await doRequest({
    url: 'http://localhost:8080/api/test/all',
    method: 'GET',
    responseType: 'text',
  });
  console.log('getAll' + new Date().getTime(), response);
  return response;
};

export const getUser = async (): Promise<ResponseData> => {
  const response = await doRequest({
    url: 'http://localhost:8080/api/test/user',
    method: 'GET',
    responseType: 'text',
    isAuth: true,
  });
  console.log('getUser' + new Date().getTime(), response);
  return response;
};

export const getAdmin = async (): Promise<ResponseData> => {
  const response = await doRequest({
    url: 'http://localhost:8080/api/test/admin',
    method: 'GET',
    responseType: 'text',
    isAuth: true,
  });
  console.log('getAdmin', response);
  return response;
};

export const signUp = async (): Promise<ResponseData> => {
  const response = await doRequest({
    // url: 'https://api-gateway.dev.pharmacity.io/open_stores',
    // url: 'https://api-gateway.dev.pharmacity.io/customers/auth/me',
    // url: 'https://api.nhathuoclongchau.com.vn/lccus/ecom-prod/customer-api/v2/token/order?maxResultCount=5&skipCount=0&tabCode=0',
    // url: 'https://api-gateway.dev.pharmacity.io/erp/extracare-info',
    url: 'http://localhost:8080/api/auth/signup',
    method: 'POST',
    data: {
      // client_id: 'cpxKo0Qu0DBQbrtwOPOfmgHxtOnLUP1W',
      // client_secret: 'P6nYG4brmOKDSij6UL4kAZKwNs9ONwq1pvLcmIVY-XcHPWa7otYMpuMkccGALhNr',
      // audience: 'https://dev-a2glpje16emmmsat.us.auth0.com/api/v2/',
      // grant_type: 'client_credentials',
      email: 'thaivannguyen.it@gmail.com',
      password: '12345678',
      username: 'thai',
      role: 'admin',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const signIn = async (): Promise<ResponseData> => {
  const response = await doRequest({
    url: 'http://localhost:8080/api/auth/signin',
    method: 'POST',
    data: {
      username: 'thai',
      password: '12345678',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('response', response);
  window.localStorage.setItem('access_token', response.responseData.accessToken);
  window.localStorage.setItem('refresh_token', response.responseData.refreshToken);
  return response;
};
