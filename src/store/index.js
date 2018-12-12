import Vue from 'vue';
import Vuex from 'vuex';

import plugins from './plugins/index';
import state from './state';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  plugins,
  actions,
  getters: {
    authenticated: s => s.authenticated,
    user: s => s.user,
    account: s => s.account,
    currencies: s => s.currencies,
    balances: s => s.balances,
    investmentFunds: s => s.investmentFunds,
    investmentFundShares: s => s.investmentFundShares,
    investmentFundBalanceUpdates: s => s.balanceUpdates,
    depositAddresses: s => s.depositAddresses,
    deposits: s => s.deposits,
    withdrawals: s => s.withdrawals,
  },
  mutations,
});
