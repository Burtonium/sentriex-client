import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueTimeago from 'vue-timeago';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Icon from './icons';
import './bootstrap-vue';

console.log(process.env.API_URL);
Vue.config.productionTip = false;

VeeValidate.Validator.extend('verify_password', {
  getMessage(field) {
    return `The ${field} field must contain at least 1 uppercase letter, 
            1 lowercase letter, 1 number, and 1 special character`;
  },
  validate(value) {
    return /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,}$/.test(value);
  },
});

Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });
Vue.use(VueTimeago);
Vue.component('icon', Icon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
