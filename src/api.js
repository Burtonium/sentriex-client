import axios from 'axios';
import store from '@/store/index';
import * as types from '@/store/mutation_types';

const instance = axios.create({
  baseURL: process.env.API_URL,
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
  xsrfCookieName: 'CSRF-TOKEN',
  xsrfHeaderName: 'x-csrf-token',
  withCredentials: true,
});

// Authentication routes
export const authenticate = user => instance.post('/authenticate', user);
export const register = params => instance.post('/register', params);
export const activate = token => instance.post(`/activate/${token}`);
export const resend = identifier => instance.post('/resend', { data: { identifier } });
export const availability = username => instance.get(`/availability/${username}`);
export const sendResetEmail = email => instance.post('/reset', { email });
export const resetPassword = args => instance.post(`/reset-password/${args.resetToken || ''}`, { data: args });

// Account routes
export const fetchAccount = () => instance.get('/account');
export const generateTwoFaSecret = () => instance.get('/2fa/secret');
export const enableTwoFa = (twofaSecret, twofaToken) => instance.post('/2fa/enable', { data: { twofaSecret, twofaToken } });
export const disableTwoFa = twofaToken => instance.post('/2fa/disable', { data: { twofaToken } });
export const fetchTransferMethods = (type, currency) => instance.get(`/${type}/methods/${currency || ''}`);

// Balances
export const fetchCurrencies = () => instance.get('/currencies');
export const fetchBalances = () => instance.get('/balances');

// Investment funds
export const fetchInvestmentFunds = () => instance.get('/investment-funds');
export const fetchInvestmentFundShares = () => instance.get('/investment-fund-shares');
export const subscribeToFund = ({ id, amount }) => instance.post(`/investment-funds/${id}/subscribe`, { amount });
export const redeemFromFund = ({ id, amount }) => instance.post(`/investment-funds/${id}/redeem`, { amount });

export const errorCodes = {
  INVALID_2FA: 16,
  TWOFA_ALREADY_ENABLED: 17,
  NOT_ACTIVATED: 4,
  INVALID_CREDENTIALS: 5,
  PAIR_NOT_FOUND: 10,
  INVALID_OLD_PASSWORD: 20,
  INSUFFICIENT_FUNDS: 13,
  INVALID_USER_TOKEN: 11,
  INVALID_CSRF_TOKEN: 40,
};

const invalidTokenCodes = [errorCodes.INVALID_CSRF_TOKEN, errorCodes.INVALID_USER_TOKEN];

instance.interceptors.response.use((response) => {
  if (response.data
      && response.data.code
      && invalidTokenCodes.includes(response.data.code)) {
    store.commit(types.LOGOUT);
  }
  return response;
});

instance.interceptors.request.use((config) => {
  Object.assign(config.headers, { 'x-csrf-token': store.state.csrfToken });
  return config;
});
