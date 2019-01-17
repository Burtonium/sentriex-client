import axios from 'axios';
import store from '@/store/index';
import * as types from '@/store/mutation_types';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
  xsrfCookieName: 'CSRF-TOKEN',
  xsrfHeaderName: 'x-csrf-token',
  withCredentials: true,
});

// USER ROUTES

// AUTHENTICATION
export const authenticate = user => instance.post('/authenticate', user);
export const register = params => instance.post('/register', params);
export const activate = token => instance.post(`/activate/${token}`);
export const resend = identifier => instance.post('/resend', { identifier });
export const availability = username => instance.get(`/availability/${username}`);
export const sendResetEmail = email => instance.post('/reset', { email });
export const resetPassword = ({ resetToken, newPassword }) => instance.post(`/reset-password/${resetToken}`, { newPassword });

// ACCOUNT
export const fetchAccount = () => instance.get('/account');
export const generateTwoFaSecret = () => instance.get('/2fa/secret');
export const enableTwoFa = (twofaSecret, twofaToken) => instance.post('/2fa/enable', { twofaSecret, twofaToken });
export const disableTwoFa = twofaToken => instance.post('/2fa/disable', { twofaToken });

// BALANCES
export const fetchBalances = () => instance.get('/balances');

// INVESTMENT
export const fetchInvestmentFunds = () => instance.get('/investment-funds');
export const fetchPerformance = () => instance.get('/investment-funds/performance');
export const fetchInvestmentFundShares = () => instance.get('/investment-fund-shares');
export const fetchInvestmentFundRequests = () => instance.get('/investment-fund-requests');
export const cancelInvestmentFundRequest = id => instance.post(`/investment-fund-requests/${id}/cancel`);
export const subscribeToFund = ({ id, amount }) => instance.post(`/investment-funds/${id}/subscribe`, { amount });
export const redeemFromFund = ({ id, amount, percent }) => instance.post(`/investment-funds/${id}/redeem`, { amount, percent });
export const fetchTrendData = id => instance.get(`/investment-funds/${id}/trend-data`);

// CURRENCY
export const fetchCurrencies = () => instance.get('/currencies');

// DEPOSIT
export const fetchDepositAddresses = () => instance.get('/deposit-addresses');
export const fetchMyDeposits = currencyCode => instance.get('/deposits', { params: { currencyCode } });
export const generateDepositAddress = currencyCode => instance.post(`/generate-address/${currencyCode}`);

// WITHDRAWAL
export const createWithdrawal = args => instance.post('/withdrawals', { ...args });
export const patchWithdrawal = (id, args) => instance.patch(`/withdrawals/${id}`, { ...args });
export const fetchMyWithdrawals = currencyCode => instance.get('/withdrawals', { params: { currencyCode } });
export const cancelWithdrawal = id => instance.post(`/withdrawals/${id}/cancel`);

// REFERRALS
export const fetchReferralPayments = () => instance.get('/referral-payments');

// FUND MANAGER ROUTES
// INVESTMENT FUNDS
export const updateFundBalance = args => instance.post(`/manager/investment-funds/${args.id}/balance-updates`, args);
export const fetchInvestmentBalanceUpdates = id => instance.get(`/manager/investment-funds/${id}/balance-updates`);

// ADMIN ROUTES
// INVESTMENT FUNDS
export const deleteBalanceFundUpdate = id => instance.delete(`/admin/balance-updates/${id}`);
export const createInvestmentFund = args => instance.post('/admin/investment-funds', args);
export const updateInvestmentFund = args => instance.patch(`/admin/investment-funds/${args.id}`, args);
export const fetchAllInvestmentFundRequests = investmentFundId => instance.get('/admin/investment-fund-requests', { params: { investmentFundId } });
export const updateInvestmentFundRequest = ({ id, status }) => instance.patch(`/admin/investment-fund-requests/${id}`, { status });
export const deleteInvestmentFund = id => instance.delete(`/admin/investment-funds/${id}`);
// CURRENCIES
export const createCurrency = currency => instance.post('/admin/currencies', { currency });
export const updateCurrency = ({ code, currency }) => instance.patch(`/admin/currencies/${code}`, { currency });
export const addAddresses = ({ code, addresses }) => instance.post(`/admin/currencies/${code}/addresses`, { addresses });

// DEPOSITS
export const searchDepositAddress = ({ address, currencyCode }) => instance.get(`/admin/deposit-addresses/${address}`, { params: { currencyCode } });
export const createDeposit = args => instance.post('/admin/deposits', args);
export const fetchDeposits = currencyCode => instance.get('/admin/deposits', { params: { currencyCode } });

// WITHDRAWALS
export const fetchWithdrawals = currencyCode => instance.get('/admin/withdrawals', { params: { currencyCode } });
export const updateWithdrawal = ({ id, status, txId }) => instance.patch(`/admin/withdrawals/${id}`, { status, txId });

// SETTINGS
export const fetchSettings = () => instance.get('/admin/settings');
export const patchSettings = args => instance.patch('/admin/settings', args);

// USERS
export const fetchUsers = args => instance.get('/admin/users', { params: args });

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
  NO_AVAILABLE_ADDRESS: 46,
  DEPOSIT_ALREADY_EXISTS: 47,
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

export const api = instance;
