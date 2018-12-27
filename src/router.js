import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Reset from '@/views/ResetPassword.vue';
import Account from '@/views/Account.vue';
import Balances from '@/views/Balances.vue';
import InvestmentFunds from '@/views/InvestmentFunds.vue';
import InvestmentFund from '@/views/InvestmentFund.vue';
import InvestmentFundManagement from '@/views/manage/InvestmentFundManagement.vue';
import CryptoManagement from '@/views/admin/CryptoManagement.vue';
import SettingsManagement from '@/views/admin/SettingsManagement.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import Deposits from '@/views/Deposits.vue';
import Withdrawals from '@/views/Withdrawals.vue';
import Activation from '@/views/Activation.vue';
import Home from '@/views/Home.vue';

import store from '@/store';
import { LOGOUT } from '@/store/mutation_types';

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
      path: '/logout',
      name: 'logout',
      beforeEnter(to, from, next) {
        store.commit(LOGOUT);
        next('/');
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/reset-password/:token?',
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
      path: '/activate/:token',
      component: Activation,
      props: route => ({
        token: route.params.token,
      }),
    },
    {
      path: '/investment-fund-requests/activate/:token',
      component: Activation,
      props: () => ({
        resourceName: 'request',
      }),
      beforeEnter(to, from, next) {
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
          store.state.authenticated && store.dispatch('fetchBalances'),
          store.state.authenticated && store.dispatch('fetchInvestmentFundShares'),
          store.dispatch('fetchCurrencies'),
          store.dispatch('fetchInvestmentFunds'),
        ]);
        next();
      },
    },
    {
      path: '/investment-funds/:investmentFundId',
      name: 'investment-fund-view',
      component: InvestmentFund,
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.state.authenticated && store.dispatch('fetchBalances'),
          store.state.authenticated && store.dispatch('fetchInvestmentFundShares'),
          store.dispatch('fetchCurrencies'),
          store.dispatch('fetchInvestmentFunds'),
        ]);
        next();
      },
    },
    {
      path: '/deposits/:currencyCode',
      name: 'deposits',
      component: Deposits,
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchCurrencies'),
          store.dispatch('fetchDepositAddresses'),
          store.dispatch('fetchMyDeposits', to.params.currencyCode),
        ]);
        next(store.state.authenticated || loginWithRedirect(to));
      },
    },
    {
      path: '/withdrawals/:currencyCode',
      name: 'withdrawals',
      component: Withdrawals,
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchCurrencies'),
          store.dispatch('fetchBalances'),
          store.dispatch('fetchAccount'),
        ]);
        next(store.state.authenticated || loginWithRedirect(to));
      },
    },
    {
      path: '/withdrawals',
      redirect: '/withdrawals/BTC',
    },
    {
      path: '/deposits',
      redirect: '/deposits/BTC',
    },
    {
      path: '/manage/investment-funds/:investmentFundId?',
      name: 'manage-investment-funds',
      component: InvestmentFundManagement,
      meta: { requiresManager: true },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchInvestmentFunds'),
          store.dispatch('fetchCurrencies'),
        ]);
        next(store.state.authenticated || loginWithRedirect(to));
      },
    },
    {
      path: '/admin/crypto/:currencyCode?',
      name: 'crypto-management',
      component: CryptoManagement,
      meta: { requiresAdmin: true },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchCurrencies'),
        ]);
        next(store.state.authenticated || loginWithRedirect(to));
      },
    },
    {
      path: '/admin/settings',
      name: 'settings-management',
      component: SettingsManagement,
      meta: { requiresAdmin: true },
    },
    {
      path: '*',
      redirect: '/404',
    },
    {
      path: '/404',
      name: 'not-found',
      component: PageNotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.state.authenticated) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresManager)) {
    if (store.state.authenticated && store.state.user.manager) {
      next();
    } else {
      next({ name: 'not-found' });
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAdmin)) {
    if (store.state.authenticated && store.state.user.admin) {
      next();
    } else {
      next({ name: 'not-found' });
    }
  } else {
    next();
  }
});

export default router;
