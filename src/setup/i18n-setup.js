import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/lang/en/index';
import axios from 'axios';
import VueTimeago from 'vue-timeago';
import VeeValidate from 'vee-validate';
import  { availability } from '@/api';

const timeagoOptions = {
  locale: 'en',
  locales: {
    ko: require('date-fns/locale/ko'),
    fr: require('date-fns/locale/fr'),
  }
}

Vue.use(VueI18n);
Vue.use(VueTimeago, timeagoOptions);

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: { en: messages }, // set locale messages
  preserveDirectiveContent: true,
});

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

Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields'
});

const loadVeeValidateMessages = async (localeName) => {
  const locale = await import(`vee-validate/dist/locale/${localeName}`);
  VeeValidate.Validator.localize({ [localeName]: locale });
}

const loadedLanguages = ['en']; // our default language that is preloaded 

const setI18nLanguage = (lang) => {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  VeeValidate.Validator.localize(lang)
  return lang
}

export const loadLanguageAsync = async (lang) => {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      await loadVeeValidateMessages(lang);
      const msgs = await import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}/index`);
      i18n.setLocaleMessage(lang,  msgs.default);
      loadedLanguages.push(lang);
      return setI18nLanguage(lang);
    } 
    return setI18nLanguage(lang);
  }
  return lang;
}

