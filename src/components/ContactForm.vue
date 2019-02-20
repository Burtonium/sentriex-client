<template>
  <div>
    <spinner v-if="loading" />
    <checkmark v-else-if="success">
      {{ $t('contact.messageReceived') }}
    </checkmark>
    <form v-else>
      <div class="form-group" :class="{ 'has-danger': errors.first('name')}">
        <input v-validate="'required'"
               class="form-control"
               :class="{'form-control-danger': errors.first('name') }"
               name="name"
               v-model="name"
               :data-vv-as="$t('fields.name')"
               :placeholder="$t('contact.namePlaceholder')"/>
        <div class="text-danger pl-2 pt-2">
          {{ errors.first('name') }}
        </div>
      </div>
      <div class="form-group" :class="{ 'has-danger': errors.first('email')}">
        <input v-validate="'required|email'"
               class="form-control"
               :class="{'form-control-danger': errors.first('email') }"
               v-model="email"
               name="email"
               :data-vv-as="$t('fields.email')"
               :placeholder="$t('contact.emailPlaceholder')"
               type="email"/>
        <div class="text-danger pl-2 pt-2">
          {{ errors.first('email') }}
        </div>
      </div>
      <div class="form-group" :class="{ 'has-danger': errors.first('message')}">
        <textarea class="form-control"
                  :class="{'form-control-danger': errors.first('message') }"
                  v-validate="'required'"
                  name="message"
                  v-model="message"
                  :data-vv-as="$t('fields.message')"
                  rows="5"
                  :placeholder="messagePlaceholder"></textarea>
        <div class="text-danger pl-2 pt-2">
          {{ errors.first('message') }}
        </div>
      </div>
      <div class="text-danger text-center mb-2" v-if="error">
        {{ $t('error.general') }}
      </div>
      <div class="form-group text-center" v-else>
        <recaptcha-button @click="handleSubmit" :sitekey="captchaKey" size="md">
          {{ $t('general.submit') }}
        </recaptcha-button>
      </div>
    </form>
  </div>
</template>
<script>
import RecaptchaButton from '@/components/RecaptchaButton.vue';
import Spinner from '@/components/Spinner.vue';
import Checkmark from '@/components/Checkmark.vue';

import { api } from '@/api';

export default {
  data() {
    return {
      loading: false,
      error: false,
      success: false,
      name: '',
      email: '',
      message: '',
    };
  },
  components: {
    RecaptchaButton,
    Spinner,
    Checkmark,
  },
  props: ['otc'],
  methods: {
    async handleSubmit(recaptcha) {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      this.loading = true;
      const response = await api.post('/contact', {
        subject: this.otc ? `OTC Request - ${this.name}` : `User Contact - ${this.name}`,
        name: this.name,
        email: this.email,
        message: this.message,
        recaptcha,
      })
        .catch(() => { this.error = true; })
        .finally(() => { this.loading = false; });
      if (response && response.data.success) {
        this.success = true;
      }
    },
  },
  computed: {
    captchaKey() {
      return process.env.VUE_APP_RECAPTCHA_SITE_KEY;
    },
    messagePlaceholder() {
      return this.otc ? this.$t('contact.otcRequestPlaceholder') : this.$t('contact.messagePlaceholder');
    },
  },
};
</script>
