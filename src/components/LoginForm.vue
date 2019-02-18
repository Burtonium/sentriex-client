<template>
  <div>
    <h3>{{ $t('login.title') }}</h3>
    <p>{{ $t('login.needAccount') }} 
      <router-link :to="'/register'">
        {{ $t('general.register') }}
      </router-link>
    </p>
    <transition name="fade" mode="out-in">
      <div v-if="state === 'initial'" key="login">
        <p class="text-danger" v-if="error === 'credentials'">
          {{ $t('error.credentials') }}
        </p>
        <div class="text-danger" v-if="error === 'activation'" key="activation">
          {{ $t('error.inactiveAccount') }}
        </div>
        <div class="form-group has-feedback">
          <input class="form-control form-control-lg"
                 v-model="identifier"
                 :placeholder="$t('login.usernamePlaceholder')"
                 type="text">
          <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
        </div>
        <div class="form-group has-feedback">
          <input class="form-control form-control-lg"
                 v-model="password"
                 :placeholder="$t('login.passwordPlaceholder')"
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
               :placeholder="$t('twoFa.codePlaceholder')"
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
          {{ $t('success.activationResent') }}
        </p>
      </div>
    </transition>
    <template v-if="state === 'resent'">
      <button class="btn btn-primary btn-lg"
              @click="clearStateAndError">
        {{ $t('general.back') }}
      </button>
    </template>
    <template>
      <p class="forget">
        <router-link :to="'/reset-password'" v-if="state === 'initial'">
          {{ $t('login.forgotPassword') }}
        </router-link>
        <a href="#" @click.prevent="state = 'initial'" v-if="state === 'twofa'">
          {{ $t('general.back') }}
        </a>
      </p>
      <button class="btn btn-primary btn-lg"
             @click="login">
          {{ $t('general.login') }}
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
      supportEmail: process.env.VUE_APP_SUPPORT_EMAIL,
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
          ...response.data,
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
