<template>
  <header>
    <b-navbar toggleable="lg" type="dark" class="wrapper">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/dashboard">
        LOGO HERE
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-if="authenticated">
          <b-nav-item-dropdown v-if="user.manager"
                               :text="user.admin ? 'admin' : 'manage'"
                               style="margin-top: 0.5rem;">
            <b-dropdown-item href="/manage/investment-funds">
              My Investment Funds
            </b-dropdown-item>
            <b-dropdown-item href="/admin/crypto" v-if="user.admin">
              Manage Crypto
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="/investment-funds">
            <b-nav-text>
              Investment Funds
            </b-nav-text>
          </b-nav-item>
          <b-nav-item href="/balances">
            <b-nav-text>
              Balances
            </b-nav-text>
          </b-nav-item>
          <b-nav-item href="/deposits">
            <b-nav-text>
              Deposit
            </b-nav-text>
          </b-nav-item>
          <b-nav-item href="/withdrawals">
            <b-nav-text>
              Withdraw
            </b-nav-text>
          </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="!authenticated">
          <b-nav-item href="/login">
            <b-nav-text variant="text-light">
              Login
            </b-nav-text>
          </b-nav-item>
          <b-nav-item href="/register">
            <b-button variant="outline-light">
              Sign Up
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item href="/account">
            Account
          </b-nav-item>
          <b-nav-item href="#" @click="logout">
            Log out
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '@/store/mutation_types';

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['authenticated', 'user']),
  },
  methods: {
    logout() {
      this.$store.commit(types.LOGOUT);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/bootstrap-override.scss';
header {
  position: relative;
  z-index: 1000;
}

header {
  background-color: map-get($theme-colors, dark);
  color: white;
}

nav, .nav-link .btn {
  text-transform: uppercase;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
