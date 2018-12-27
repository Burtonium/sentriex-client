<template>
  <div>
    <h3>Reset Password</h3>
    <br>
    <p class="text-success" v-if="success">
      Success! We changed your password.
    </p>
    <p class="text-danger" v-if="error">
      Something went wrong.
    </p>
    <div class="form-group has-feedback">
      <input class="form-control form-control-lg"
             name="password"
             placeholder="New password"
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
             placeholder="Confirm new password"
             v-validate="{ required : true,  confirmed: newPassword}"
             data-vv-validate-on="blur"
             data-vv-as="password"
             type="password">
      <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
    </div>
    <p class="text-danger" v-if="errors.any()">
      {{ errors.first('password') || errors.first('confirm') }}
    </p>
    <button class="btn btn-primary btn-lg" @click="sendReset">Save</button>
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
