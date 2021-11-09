import { AsyncLocalStorage } from 'async_hooks';

export type Store = Map<string, string | number | any>;

export const LOGGER_STORAGE = new AsyncLocalStorage<Store>();

export const getStorageObj = (): undefined | any => {
  const store = LOGGER_STORAGE.getStore();
  if (!store) {
    return;
  }
  const obj: any = {};
  for (const [key, value] of store.entries()) {
    obj[key] = value;
  }
  return obj;
};

export const setStorageValues = (values: Record<string, any>) => {
  const store = LOGGER_STORAGE.getStore();
  if (!store) {
    throw new Error('Storage context is not initialized');
  }
  for (const key of Object.keys(values)) {
    store.set(key, values[key]);
  }
};
