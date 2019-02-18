<template>
  <div>
    <h3>
      {{ $t('reset.forgotPasswordTitle') }}
    </h3>
    <div class="text-success" v-if="success">
      {{ $t('success.passwordReset') }}
    </div>
    <div class="text-danger" v-if="error">
      {{ $t('error.generalExtended') }}
    </div>
    <br>
    <div class="form-group has-feedback">
      <input class="form-control form-control-lg"
             name="email"
             :placeholder="$t('reset.emailPlaceholder')"
             v-model="email"
             type="text">
      <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
    </div>
    <button class="btn btn-primary btn-lg" @click="sendReset">
      {{ $t('general.send') }}
    </button>
  </div>
</template>

<script>
import { sendResetEmail } from '@/api';

export default {
  data() {
    return {
      success: false,
      email: '',
    };
  },
  methods: {
    async sendReset() {
      const response = await sendResetEmail(this.email);
      if (response.data.success) {
        this.success = true;
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style>
</style>
