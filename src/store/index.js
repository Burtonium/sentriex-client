import Vue from 'vue';
import Vuex from 'vuex';

import plugins from './plugins/index';
import state from './state';
import mutations from './mutations';
import { LOGOUT } from './mutation_types';
import actions from './actions';
import pick from 'lodash.pick';

Vue.use(Vuex);

const investmentFundsGetter = (s) => {
  const settings = s.investmentFundSettings;
  const userCut = settings.userRedeemProfitPercent || NaN;
  const actualPerformance = (p) => { return parseFloat(p > 0 ? p * userCut : p); }; // eslint-disable-line

  return s.investmentFunds && s.investmentFunds.map(f => {
    const fund = {
      ...f,
      monthlyPerformance: actualPerformance(f.monthlyPerformance).toFixed(2),
      performance: actualPerformance(f.performance).toFixed(2),
    };

    const translation = f.translations.find(t => t.locale === state.lang);
    if (translation) {
      Object.assign(fund, pick(translation, ['name', 'shortDescription', 'detailedDescription']))
    }
    return fund;
  });
};

const store = new Vuex.Store({
  state,
  plugins,
  actions,
  getters: {
    authenticated: s => s.authenticated,
    user: s => s.user,
    account: s => s.account,
    currencies: s => s.currencies,
    balances: s => s.balances,
    investmentFunds: investmentFundsGetter,
    investmentFundShares: s => s.investmentFundShares,
    investmentFundBalanceUpdates: s => s.balanceUpdates,
    investmentFundSettings: s => s.investmentFundSettings,
    depositAddresses: s => s.depositAddresses,
    deposits: s => s.deposits,
    withdrawals: s => s.withdrawals,
    users: s => s.users,
    performance: s => s.performance,
    referralPayments: s => s.referralPayments,
    investmentFundTrendData: s => s.investmentFundTrendData,
    locale: s => s.lang,
    lang: s => s.lang,
  },
  mutations,
});

if (state.authenticated && state.tokenExpiry < new Date().getTime()) {
  store.commit(LOGOUT);
}

export default store;
