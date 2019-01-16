<template>
  <div id="app">
    <nav-bar />
    <div class="flex-wrapper">
      <div :class="{ 'mt-5 mb-5': !wrapperExempt }">
        <div :class="{ 'wrapper': !wrapperExempt }">
          <router-view />
        </div>
      </div>
      <app-footer />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import NavBar from '@/components/NavBar';
import AppFooter from '@/components/AppFooter';

export default {
  components: {
    NavBar,
    AppFooter,
  },
  computed: {
    ...mapGetters(['authenticated']),
    wrapperExempt() {
      return this.$route.meta.wrapperExempt;
    },
  },
  watch: {
    authenticated() {
      if (!this.authenticated) {
        this.$router.push({ name: 'login', params: { redirectTo: this.$route.path } });
      }
    },
  },

};
</script>

<style lang="scss">
.flex-wrapper {
  display: flex;
  min-height: 94.2vh;
  flex-direction: column;
  justify-content: space-between
}
</style>
