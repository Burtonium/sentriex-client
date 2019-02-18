import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/lang/en/index';
import axios from 'axios';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: { en: messages }, // set locale messages
  preserveDirectiveContent: true,
});

const loadedLanguages = ['en']; // our default language that is preloaded 

const setI18nLanguage = (lang) => {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export const loadLanguageAsync = async (lang) => {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      const msgs = await import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`);
      i18n.setLocaleMessage(lang, { [lang]: msgs.default });
      loadedLanguages.push(lang);
      return setI18nLanguage(lang);
    } 
    return setI18nLanguage(lang);
  }
  return lang;
}
