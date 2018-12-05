/* global localStorage */
export const STORAGE_KEY = 'durango-project';

const initialState = {
  authenticated: false,
  user: null,
};

if (localStorage.getItem(STORAGE_KEY)) {
  Object.assign(initialState, JSON.parse(localStorage.getItem(STORAGE_KEY)));
}

export default initialState;
