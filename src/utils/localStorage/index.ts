import * as localStorage from './helpers';
import { localStorageKeys } from './keys';

const { getStringData, setStringData, clearStorage } = localStorage;

export { clearStorage };

// Function get
export const getToken = () => getStringData(localStorageKeys.userToken);
export const getRefreshToken = () => getStringData(localStorageKeys.userRefreshToken);
export const getTokenOld = () => getStringData(localStorageKeys.userTokenOld);
export const getRefreshTokenOld = () => getStringData(localStorageKeys.userRefreshTokenOld);

// Function set
export const setToken = (token: string) => setStringData(localStorageKeys.userToken, token);
export const setRefreshToken = (token: string) => setStringData(localStorageKeys.userToken, token);
export const setTokeOld = (token: string) => setStringData(localStorageKeys.userTokenOld, token);
export const setRefreshTokenOld = (token: string) =>
  setStringData(localStorageKeys.userTokenOld, token);
