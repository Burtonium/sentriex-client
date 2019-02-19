import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Icon from './icons';
import './bootstrap-vue';
import { i18n } from './setup/i18n-setup';

Vue.config.productionTip = false;
Vue.component('icon', Icon);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
