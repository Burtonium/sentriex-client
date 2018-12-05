import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Reset from '@/views/ResetPassword.vue';
import Account from '@/views/Account.vue';
import Balances from '@/views/Balances.vue';
import InvestmentFunds from '@/views/InvestmentFunds.vue';
import InvestmentFund from '@/views/InvestmentFund.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import store from '@/store';

Vue.use(Router);
const loginWithRedirect = to => ({ path: '/login', query: { redirect: to.fullPath } });

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: Reset,
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchAccount');
        next(store.state.authenticated || loginWithRedirect(to));
      },
    },
    {
      path: '/balances',
      name: 'Balances',
      component: Balances,
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchBalances'),
          store.dispatch('fetchCurrencies'),
        ]);
        next(store.state.authenticated || loginWithRedirect(to));
      },
    },
    {
      path: '/investment-funds',
      name: 'investment-funds',
      component: InvestmentFunds,
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchBalances'),
          store.dispatch('fetchCurrencies'),
          store.dispatch('fetchInvestmentFunds'),
          store.dispatch('fetchInvestmentFundShares'),
        ]);
        next(store.state.authenticated || loginWithRedirect(to));
      },
    },
    {
      path: '/investment-funds/:investmentFundId',
      name: 'investment-fund-view',
      component: InvestmentFund,
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchBalances'),
          store.dispatch('fetchCurrencies'),
          store.dispatch('fetchInvestmentFunds'),
          store.dispatch('fetchInvestmentFundShares'),
        ]);
        next(store.state.authenticated || loginWithRedirect(to));
      },
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});

export default router;
