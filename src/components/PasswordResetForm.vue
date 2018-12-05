<template>
  <div>
    <h3>Reset Password</h3>
    <br>
    <div class="form-group has-feedback">
      <input class="form-control form-control-lg"
             name="password"
             placeholder="New password"
             type="text"
             v-model="newPassword">
      <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
    </div>
        <div class="form-group has-feedback">
      <input class="form-control form-control-lg"
             name="confirm"
             placeholder="Confirm new password"
             type="text">
      <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
    </div>
    <button class="btn btn-primary btn-lg">Save</button>
  </div>
</template>

<script>
import { resetPassword } from '@/api';

export default {
  data() {
    return {
      success: false,
      newPassword: '',
    };
  },
  methods: {
    async sendReset() {
      const response = await resetPassword({ newPassword: this.newPassword });
      if (response) {
        this.success = true;
      }
    }
  }
};
</script>

<style>
</style>
