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
  async fetchInvestmentFunds(store) {
    const response = await api.fetchInvestmentFunds();
    store.commit(types.SET_INVESTMENT_FUNDS, response.data.investmentFunds);
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
};
