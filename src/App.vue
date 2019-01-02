<template>
  <div id="app">
    <nav-bar />
    <div class="flex-wrapper">
      <router-view />
      <app-footer class="mt-5" />
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
  computed: mapGetters(['authenticated']),
  watch: {
    authenticated() {
      if (!this.authenticated) {
        this.$router.push({ name: 'login', params: { redirectTo: this.$route.path } });
      }
    }
  }
};
</script>

<style lang="scss">
.flex-wrapper {
  display: flex;
  min-height: 94.2vh;
  flex-direction: column;
  justify-content: space-between
}

.row {
  width: 100%;
}
</style>
