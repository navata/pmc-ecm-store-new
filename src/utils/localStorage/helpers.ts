const isLocalStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage;
  } catch (error) {
    return false;
  }
};

export const setObjectData = (key: string, data: Record<string, any>) => {
  if (isLocalStorageAvailable()) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getObjectData = (key: string): Record<string, any> => {
  if (isLocalStorageAvailable()) {
    try {
      const jsonData = window.localStorage.getItem(key) || '';
      return JSON.parse(jsonData);
    } catch (error) {
      return {};
    }
  }
  return {};
};

export const setStringData = (key: string, value: string) => {
  if (isLocalStorageAvailable()) {
    window.localStorage.setItem(key, value);
  }
};

export const getStringData = (key: string) => {
  if (isLocalStorageAvailable()) {
    return window.localStorage.getItem(key) || '';
  }
  return '';
};

export const removeItem = (key: string) => {
  if (isLocalStorageAvailable()) {
    window.localStorage.removeItem(key);
  }
};

export const clearStorage = () => {
  if (isLocalStorageAvailable()) {
    window.localStorage.clear();
  }
};
