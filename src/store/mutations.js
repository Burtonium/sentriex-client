import Vue from 'vue';
import assert from 'assert';
import * as types from './mutation_types';

export default {
  [types.LOGIN](state, { csrfToken, user }) {
    assert(csrfToken, 'CSRF Token was not provided');
    state.user = user;
    state.authenticated = true;
    state.csrfToken = csrfToken;
  },
  [types.LOGOUT](state) {
    state.authenticated = false;
    state.csrfToken = null;
    state.user = {};
  },
  [types.SET_BALANCES](state, balances) {
    Vue.set(state, 'balances', balances);
  },
  [types.SET_CURRENCIES](state, currencies) {
    Vue.set(state, 'currencies', currencies);
  },
  [types.SET_ACCOUNT](state, account) {
    Vue.set(state, 'account', account);
  },
  [types.SET_INVESTMENT_FUNDS](state, investmentFunds) {
    Vue.set(state, 'investmentFunds', investmentFunds);
  },
  [types.SET_INVESTMENT_FUND_SHARES](state, investmentFundShares) {
    Vue.set(state, 'investmentFundShares', investmentFundShares);
  },
};
