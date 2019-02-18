import {
  STORAGE_KEY,
} from '../state';
import * as types from '../mutation_types';

const localStoragePlugin = (store) => {
  store.subscribe((mutation, state) => {
    const {
      authenticated,
      user,
      csrfToken,
      tokenExpiry,
      lang
    } = state;

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      authenticated,
      user,
      csrfToken,
      tokenExpiry,
      lang
    }));

    if (mutation.type === types.LOGOUT) {
      localStorage.removeItem(STORAGE_KEY);
    }
  });
};

export default localStoragePlugin;
