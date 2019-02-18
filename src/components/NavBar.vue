<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="primary" class="wrapper">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="'/'">
        <img src="../assets/images/logo.png" width="50"/>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown v-if="authenticated && user.manager"
                               :text="user.admin ? 'Admin' : 'Manage'" class="navbar-text">
            <b-dropdown-item :to="'/manage/investment-funds'" class="text-primary">
              {{ $t('navbar.investmentFunds') }}
            </b-dropdown-item>
            <b-dropdown-item :to="'/admin/crypto'" v-if="user.admin" class="text-primary">
              Manage Crypto
            </b-dropdown-item>
            <b-dropdown-item :to="'/admin/settings'" v-if="user.admin" class="text-primary">
              Site Settings
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="'/investment-funds'">
            <b-nav-text>
              {{ $t('navbar.investmentFunds') }}
            </b-nav-text>
          </b-nav-item>
          <b-nav-item :to="'/portfolio'" v-if="authenticated">
            <b-nav-text>
              {{ $t('navbar.portfolio') }}
            </b-nav-text>
          </b-nav-item>
          <b-nav-item :to="'/deposits'" v-if="authenticated">
            <b-nav-text>
              {{ $t('navbar.deposit') }}
            </b-nav-text>
          </b-nav-item>
          <b-nav-item :to="'/withdrawals'" v-if="authenticated">
            <b-nav-text>
              {{ $t('navbar.withdraw') }}
            </b-nav-text>
          </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="'/contact'">
            <b-nav-text>
              {{ $t('navbar.contact') }}
            </b-nav-text>
          </b-nav-item>
          <template v-if="!authenticated">
            <b-nav-item :to="'/login'">
              <b-nav-text variant="text-light">
                {{ $t('navbar.login') }}
              </b-nav-text>
            </b-nav-item>
            <b-nav-item :to="'/register'">
              <b-btn variant="outline-light">
                {{ $t('navbar.register') }}
              </b-btn>
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item :to="'/account'">
              <b-nav-text>
                {{ $t('navbar.account') }}
              </b-nav-text>
            </b-nav-item>
            <b-nav-item :to="'/logout'">
              <b-btn variant="outline-light">
                {{ $t('navbar.logout') }}
              </b-btn>
            </b-nav-item>
          </template>
          <b-nav-item-dropdown class="pl-2" right>
            <template slot="button-content">
              <icon class="text-light" name="language" scale="2"/>
            </template>
            <b-dropdown-item :active="lang === 'en'"
                              @click="setPreferredLanguage('en')">
              English
            </b-dropdown-item>
            <b-dropdown-item :active="lang === 'fr'"
                              @click="setPreferredLanguage('fr')">
              French
            </b-dropdown-item>
            <b-dropdown-item :active="lang === 'ko'"
                              @click="setPreferredLanguage('ko')">
              Korean
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['authenticated', 'user', 'lang']),
    language() {
      return this.lang.toUpperCase();
    }
  },
  methods: {
    ...mapActions(['setPreferredLanguage'])
  }
};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  z-index: 1000;
}

header {
  background-color: map-get($theme-colors, primary);
  color: white;
  border-bottom: 1px solid #eee;
}

li {
  display: inline-block;
}

.move-up {
  margin-top: -3px;
}

.nav-item {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.navbar-dark .navbar-nav .nav-link, .navbar-dark .navbar-text {
  color: #fff;
}

.navbar-nav .nav-link span.navbar-text {
  padding: 5px 10px;
  border-radius: 40px;
  transition: 0.15s all ease-in-out;
}

.navbar-nav .nav-link:hover span.navbar-text {
  background-color: white;
  color: map-get($theme-colors, primary);
}
</style>
