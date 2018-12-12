<template>
  <div>
    <div class="mb-4">
      <h3>Register</h3>
      <span v-if="state === 'initial'">
        Already have an account? <a href="/login">Sign In</a>
      </span>
      <span v-if="state === 'registered'">
        Activated already? <a href="/login">Sign In</a>
      </span>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="state === 'initial'" key="initial">
        <div class="form-group has-feedback">
            <p class="text-danger" v-if="errors.first('email')">
              {{ errors.first('email') }}
              </p>
            <input class="form-control form-control-lg"
                   name="email"
                   placeholder="Email Address"
                   v-model="email"
                   type="text"
                   v-validate="'email'">
            <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
        </div>
        <div class="form-group has-feedback">
            <p class="text-danger" v-if="errors.first('username')">
              {{ errors.first('username') }}
            </p>
            <input class="form-control form-control-lg"
                   name="username"
                   v-model="username"
                   placeholder="Username"
                   type="text"
                   data-vv-validate-on="blur"
                   v-validate="'alpha_dash|available'">
            <span class="glyphicon fa fa-user form-control-feedback" aria-hidden="true"></span>
        </div>
        <div class="form-group has-feedback">
          <div class="password_message pop_container" autocomplete="new-password">
            <p class="text-danger" v-if="errors.first('password')">
              {{ errors.first('password') }}
            </p>
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
          </div>
          <span class="glyphicon fa fa-lock form-control-feedback" aria-hidden="true"></span>
        </div>
        <div class="form-group has-feedback">
          <p class="text-danger" v-if="errors.first('password_confirmation')
            && fields.password_confirmation.touched">
            {{ errors.first('password_confirmation') }}
          </p>
          <input class="form-control form-control-lg"
                 name="password_confirmation"
                 placeholder="Confirm Password"
                 type="password"
                 v-validate="'required|confirmed:password'"
                 data-vv-validate-on="blur"
                 data-vv-as="password">
          <span class="glyphicon fa fa-lock form-control-feedback" aria-hidden="true"></span>
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
      state: 'initial',
      username: '',
      email: '',
      password: '',
      code: this.referralCode,
      captchaKey: process.env.RECAPTCHA_SITE_KEY,
    };
  },
  props: ['referralCode'],
  components: {
    RecaptchaButton,
    Checkmark,
  },
  computed: {
    fields() {
      return this.veeFields;
    }
  },
  methods: {
    async register(code) {
      this.valid = code && await this.$validator.validateAll();
      const response = await register({
        username: this.username,
        email: this.email,
        password: this.password,
        recaptcha: this.code,
      });

      if (response.data.success) {
        this.state = 'registered';
      } else {
        this.errors.add('Something went wrong');
      }
    },
  },
};
</script>
