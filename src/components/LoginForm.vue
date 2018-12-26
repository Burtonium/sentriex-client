<template>
  <div>
    <h3>Login</h3>
    <p>Need an account? <router-link :to="'/register'">Register</router-link></p>
    <transition name="fade" mode="out-in">
      <div v-if="state === 'initial'" key="login">
        <p class="text-danger" v-if="error === 'credentials'">
          Invalid credentials. Make sure you've entered
          your information correctly
        </p>
        <div class="text-danger" v-if="error === 'activation'" key="activation">
        <h5><b>You need to activate your account.</b></h5>
          <p>
            Check your email and click on the link provided to activate your account.
          </p>
          <p>Never received it? You can click <a @click="resend" href="#">here</a> to resend it.</p>
        </div>
        <div class="form-group has-feedback">
          <input class="form-control form-control-lg"
                 v-model="identifier"
                 placeholder="Username or email"
                 type="text">
          <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
        </div>
        <div class="form-group has-feedback">
          <input class="form-control form-control-lg"
                 v-model="password"
                 placeholder="Password"
                 type="password" @keyup.enter="login">
          <span class="glyphicon fa fa-lock form-control-feedback" aria-hidden="true"></span>
        </div>
      </div>
      <div v-else-if="state === 'twofa'" key="twofa">
        <div class="form-group has-feedback text-center">
            <input id="twofa-code"
               class="form-control twofa"
               v-model="twofa"
               name="code"
               type="number"
               placeholder="2fa code"
               autocomplete="off"
               :maxlength="6"
               @input="checkCode"
               @keydown="preventExtraInput">
        </div>
        <p class="text-danger">
          {{ errors.first('twofa') }}
        </p>
      </div>
      <div v-else-if="state === 'resent'">
        <checkmark/>
        <p class="text-success">
          We've resent your validation email.<br>
          <a :href="`mailto:${supportEmail}`">Contact support</a> if you're having issues.
        </p>
      </div>
    </transition>
    <template v-if="state === 'resent'">
      <button class="btn btn-primary btn-lg"
              @click="clearStateAndError">
        Back
      </button>
    </template>
    <template>
      <p class="forget">
        <router-link :to="'/reset-password'" v-if="state === 'initial'">Forgot your password?</router-link>
        <a href="#" @click.prevent="state = 'initial'" v-if="state === 'twofa'">Back</a>
      </p>
      <button class="btn btn-primary btn-lg"
             @click="login">
          Login
      </button>
    </template>
  </div>
</template>

<script>
import { authenticate, resend, errorCodes } from '@/api';
import * as types from '@/store/mutation_types';
import Checkmark from './Checkmark.vue';

const keyCodeIsNumber = code => ((code >= 48 && code <= 57)
  || (code >= 96 && code <= 109));

export default {
  data() {
    return {
      identifier: '',
      password: '',
      twofa: '',
      state: 'initial',
      error: null,
      supportEmail: process.env.SUPPORT_EMAIL,
    };
  },
  props: ['redirectTo'],
  methods: {
    preventExtraInput(evt) {
      if (this.twofa && this.twofa.length >= 6 && keyCodeIsNumber(evt.keyCode)) {
        evt.preventDefault();
      }
    },
    checkCode() {
      if (this.twofa && this.twofa.length === 6) {
        this.login();
      }
    },
    async login() {
      const response = await authenticate({
        identifier: this.identifier,
        password: this.password,
        twofaToken: this.twofa,
      });

      if (response.data.code === errorCodes.NOT_ACTIVATED) {
        this.error = 'activation';
      }

      if (response.data.code === errorCodes.INVALID_CREDENTIALS) {
        this.error = 'credentials';
      }

      if (response.data.code === errorCodes.INVALID_2FA) {
        if (this.state === 'twofa' && this.twofa) {
          this.errors.add('twofa', 'Invalid code');
        }
        this.state = 'twofa';
      }

      if (response.status === 200 && response.data.CSRFToken) {
        this.$store.commit(types.LOGIN, {
          csrfToken: response.data.CSRFToken,
          user: response.data.user,
        });
        this.$router.push(this.redirectTo || '/investment-funds');
      }
    },
    async resend() {
      const response = await resend(this.identifier);
      if (response.data.success) {
        this.state = 'resent';
      }
    },
    clearStateAndError() {
      this.clearState();
      this.clearError();
    },
    clearState() {
      this.state = 'initial';
    },
    clearError() {
      this.error = null;
    },
  },
  components: {
    Checkmark,
  },
};
</script>

<style scoped>
.twofa {
  width: 120px;
  display:inline-block;
  text-align:center;
}
</style>
