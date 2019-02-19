import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueTimeago from 'vue-timeago';
import App from './App.vue';
import router from './router';
import store from './store';
import Icon from './icons';
import './bootstrap-vue';
import { i18n } from './setup/i18n-setup';

Vue.config.productionTip = false;

VeeValidate.Validator.extend('verify_password', {
  getMessage(field) {
    return i18n.t('register.passwordStrength');
  },
  validate(value) {
    return /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,}$/.test(value);
  },
});


VeeValidate.Validator.extend('available', {
  getMessage: field => i18n.t('register.usernameAvailability'),
  async validate(value) {
    const response = await availability(value);
    return { valid: response && response.data && response.data.available };
  },
});

Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });
Vue.use(VueTimeago);
Vue.component('icon', Icon);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
