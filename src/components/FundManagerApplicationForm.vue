<template>
  <div>
    <spinner v-if="loading" />
    <checkmark v-else-if="success">
      We've received your application. Expect to hear from us soon.
    </checkmark>
    <form v-else>
      <div class="form-group" :class="{ 'has-danger': errors.first('name')}">
        <input v-validate="'required'"
               class="form-control"
               :class="{'form-control-danger': errors.first('name') }"
               name="name"
               v-model="name"
               placeholder="Your Full Name"/>
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
               placeholder="Your Email"
               type="email"/>
        <div class="text-danger pl-2 pt-2">
          {{ errors.first('email') }}
        </div>
      </div>
      <div class="form-group">
        <input class="form-control"
               name="twitter"
               v-model="info.twitter"
               placeholder="Twitter Account" />
      </div>
      <div class="form-group">
        <input class="form-control"
                  name="discord"
                  v-model="info.discord"
                  placeholder="Discord Account" />
      </div>
      <div class="form-group">
        <input class="form-control"
                  name="telegram"
                  v-model="info.telegram"
                  placeholder="Telegram Account" />
      </div>
      <div class="form-group">
        <input class="form-control"
                name="phone"
                v-model="info.phone"
                placeholder="Phone number" />
      </div>
      <div class="form-group" :class="{ 'has-danger': errors.first('message')}">
        <textarea class="form-control"
                  :class="{'form-control-danger': errors.first('message') }"
                  v-validate="'required'"
                  name="message"
                  v-model="info.message"
                  rows="10"
                  :placeholder="messagePlaceholder"></textarea>
        <div class="text-danger pl-2 pt-2">
          {{ errors.first('message') }}
        </div>
      </div>
      <div class="text-danger text-center mb-2" v-if="error">
        Something went wrong.
      </div>
      <div class="form-group text-center" v-else>
        <recaptcha-button @click="handleSubmit" :sitekey="captchaKey" size="md">Submit</recaptcha-button>
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
      info: {},
    };
  },
  components: {
    RecaptchaButton,
    Spinner,
    Checkmark,
  },
  methods: {
    async handleSubmit(recaptcha) {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      this.loading = true;
      const response = await api.post('/contact', {
        subject: `Fund Manager Application - ${this.name}`,
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
    message() {
      const { twitter, discord, telegram, phone, message } = this.info;
      return `
        Name: ${this.name},
        Twitter: ${twitter}
        Discord: ${discord}
        Telegram: ${telegram}
        Phone: ${phone}
        Message:

        ${message}`;
    },
    messagePlaceholder() {
      return 'Describe your experience, markets, volumes, AUM, performance. Let us also know your preferred method of contact and the best time to reach you.';
    },
  },
};
</script>
