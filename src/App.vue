<template>
  <div id="app">
    <nav-bar />
    <div class="flex-wrapper">
      <router-view />
      <app-footer />
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar';
import AppFooter from '@/components/AppFooter';

export default {
  components: {
    NavBar,
    AppFooter
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
