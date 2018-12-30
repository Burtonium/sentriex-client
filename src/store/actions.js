import Currency from '@/models/currency';
import * as types from './mutation_types';
import * as api from '@/api';

export default {
  async fetchAccount(store) {
    const response = await api.fetchAccount();
    store.commit(types.SET_ACCOUNT, response.data);
  },
  async fetchCurrencies(store, config = {}) {
    if (!store.state.currencies || config.refresh) {
      const response = await api.fetchCurrencies();
      const currencies = {};
      Object.keys(response.data.currencies).forEach((code) => {
        currencies[code] = new Currency(response.data.currencies[code]);
      });
      store.commit(types.SET_CURRENCIES, currencies);
    }
  },
  async fetchBalances(store) {
    const response = await api.fetchBalances();
    store.commit(types.SET_BALANCES, response.data.balances);
  },
  async fetchInvestmentFunds(store, config = {}) {
    if (!store.state.investmentFunds || config.refresh) {
      const response = await api.fetchInvestmentFunds();
      store.commit(types.SET_INVESTMENT_FUNDS, response.data.investmentFunds);
    }
  },
  async fetchInvestmentFundShares(store) {
    const response = await api.fetchInvestmentFundShares();
    store.commit(types.SET_INVESTMENT_FUND_SHARES, response.data.investmentFundShares);
  },
  async fetchInvestmentBalanceUpdates(store, id) {
    const response = await api.fetchInvestmentBalanceUpdates(id);
    const { balanceUpdates } = response.data;
    store.commit(types.SET_INVESTMENT_FUND_BALANCE_UPDATES, {
      balanceUpdates,
      id,
    });
  },
  async fetchDepositAddresses(store) {
    const response = await api.fetchDepositAddresses();
    store.commit(types.SET_DEPOSIT_ADDRESSES, response.data.depositAddresses);
  },
  async fetchDeposits(store, currencyCode) {
    const response = await api.fetchDeposits(currencyCode);
    store.commit(types.SET_DEPOSITS, {
      currencyCode,
      deposits: response.data.deposits,
    });
  },
  async fetchMyDeposits(store, currencyCode) {
    const response = await api.fetchMyDeposits(currencyCode);
    store.commit(types.SET_DEPOSITS, {
      currencyCode,
      deposits: response.data.deposits,
    });
  },
  async fetchWithdrawals(store, currencyCode) {
    const response = await api.fetchWithdrawals(currencyCode);
    store.commit(types.SET_WITHDRAWALS, {
      currencyCode,
      withdrawals: response.data.withdrawals,
    });
  },
  async fetchMyWithdrawals(store, currencyCode) {
    const response = await api.fetchMyWithdrawals(currencyCode);
    store.commit(types.SET_WITHDRAWALS, {
      currencyCode,
      withdrawals: response.data.withdrawals,
    });
  },
  async fetchMyInvestmentFundRequests(store) {
    const response = await api.fetchInvestmentFundRequests();
    store.commit(types.SET_INVESTMENT_FUND_REQUESTS, response.data.requests);
  },
  async fetchUsers(store, args) {
    const response = await api.fetchUsers(args);
    store.commit(types.SET_USERS, response.data.users);
  },
};
