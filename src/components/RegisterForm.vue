<template>
  <div>
    <div class="mb-4">
      <h3>Register</h3>
      <span v-if="state === 'initial'">
        Already have an account? <router-link :to="'/login'">Sign In</router-link>
      </span>
      <span v-if="state === 'registered'">
        Activated already? <router-link :to="'/login'">Sign In</router-link>
      </span>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="state === 'initial'" key="initial">
        <div class="form-group has-feedback">
            <input class="form-control form-control-lg"
                   name="email"
                   placeholder="Email Address"
                   v-model="email"
                   type="text"
                   v-validate="'email'">
            <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
        </div>
        <p class="text-danger" v-if="errors.first('email')">
          {{ errors.first('email') }}
        </p>
        <div class="form-group has-feedback">
            <input class="form-control form-control-lg"
                   name="username"
                   v-model="username"
                   placeholder="Username"
                   type="text"
                   data-vv-validate-on="blur"
                   v-validate="'alpha_dash|available'">
            <span class="glyphicon fa fa-user form-control-feedback" aria-hidden="true"></span>
        </div>
        <p class="text-danger" v-if="errors.first('username')">
          {{ errors.first('username') }}
        </p>
        <div class="form-group has-feedback">
          <input id="password"
                 type="password"
                 name="password"
                 v-model="password"
                 class="form-control form-control-lg"
                 placeholder="Password"
                 autocomplete="false"
                 ref="password"
                 data-vv-validate-on="blur"
                 v-validate="'required|verify_password'">
          <span class="glyphicon fa fa-lock form-control-feedback" aria-hidden="true"></span>
        </div>
        <p class="text-danger" v-if="errors.first('password')">
          {{ errors.first('password') }}
        </p>
        <div class="form-group has-feedback">
          <input class="form-control form-control-lg"
                 name="password_confirmation"
                 placeholder="Confirm Password"
                 type="password"
                 v-validate="'required|confirmed:password'"
                 data-vv-validate-on="blur"
                 data-vv-as="password">
          <span class="glyphicon fa fa-lock form-control-feedback" aria-hidden="true"></span>
          <p class="text-danger" v-if="errors.first('password_confirmation')
            && fields.password_confirmation.touched">
            {{ errors.first('password_confirmation') }}
          </p>
        </div>
        <div class="form-group has-feedback">
          <input class="form-control form-control-lg"
                 name="referral_code"
                 v-model="code"
                 placeholder="Referral Code"
                 type="text"
                 v-validate="'alpha_num'">
          <span class="glyphicon fa fa-link form-control-feedback" aria-hidden="true"></span>
        </div>
        <p class="text-danger" v-if="error">
          Something went wrong. Contact site admin if this persists.
        </p>
        <recaptcha-button @click="register" :sitekey="captchaKey">Create</recaptcha-button>
      </div>
      <div v-else-if="state === 'registered'" key="registered" class="registered">
        <checkmark/>
        <p class="text-success">
          Thanks for the interest in becoming part of the team!<br>
          Check your email for the activation link.
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { Validator } from 'vee-validate';
import { register, availability } from '@/api';
import RecaptchaButton from './RecaptchaButton.vue';
import Checkmark from './Checkmark.vue';

Validator.extend('available', {
  getMessage: field => `This ${field} is not available`,
  async validate(value) {
    const response = await availability(value);
    return { valid: response && response.data && response.data.available };
  },
});

export default {
  data() {
    return {
      error: false,
      state: 'initial',
      username: '',
      email: '',
      password: '',
      code: this.$route.query.referralCode,
      captchaKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
    };
  },
  components: {
    RecaptchaButton,
    Checkmark,
  },
  computed: {
    fields() {
      return this.veeFields;
    },
  },
  methods: {
    async register(recaptchaCode) {
      const valid = recaptchaCode && await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      let response;
      try {
        response = await register({
          username: this.username,
          email: this.email,
          password: this.password,
          referralCode: this.code,
          recaptcha: recaptchaCode,
        });
      } catch (error) {
        this.error = true;
      }

      if (response && response.data.success) {
        this.state = 'registered';
      } else {
        this.error = true;
      }
    },
  },
};
</script>
