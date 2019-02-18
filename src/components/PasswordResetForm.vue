<template>
  <div>
    <h3>
      {{ $t('reset.title') }}
    </h3>
    <br>
    <p class="text-success" v-if="success">
      {{ $t('success.paswordChanged') }}
    </p>
    <p class="text-danger" v-if="error">
      {{ $t('error.generalExtended') }}
    </p>
    <div class="form-group has-feedback">
      <input class="form-control form-control-lg"
             name="password"
             :placeholder="$t('reset.newPasswordPlaceholder')"
             type="password"
             data-vv-validate-on="blur"
             v-validate="'required|verify_password'"
             data-vv-as="new password"
             v-model="newPassword">
      <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
    </div>
    <div class="form-group has-feedback">
      <input class="form-control form-control-lg"
             name="confirm"
             v-model="confirm"
             :placeholder="$t('reset.newPasswordConfirmationPlaceholder')"
             v-validate="{ required : true,  confirmed: newPassword}"
             data-vv-validate-on="blur"
             data-vv-as="password"
             type="password">
      <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
    </div>
    <p class="text-danger" v-if="errors.any()">
      {{ errors.first('password') || errors.first('confirm') }}
    </p>
    <button class="btn btn-primary btn-lg" @click="sendReset">
      {{ $t('general.save') }}
    </button>
  </div>
</template>
<script>
import { resetPassword } from '@/api';

export default {
  data() {
    return {
      confirm: '',
      success: false,
      error: false,
      newPassword: '',
    };
  },
  props: {
    resetToken: {
      required: true,
    },
  },
  methods: {
    async sendReset() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      const response = await resetPassword({
        newPassword: this.newPassword,
        resetToken: this.resetToken,
      });
      if (response.data.success) {
        this.success = true;
      }
    },
  },
};
</script>

<style>
</style>
