<template>
  <div>
    <h3>Forgot Password</h3>
    <div class="alert alert-success" role="alert" v-if="success"> <strong>Well done!</strong>
      Thanks! A password reset was sent to your email address.
    </div>
    <br>
    <div class="form-group has-feedback">
      <input class="form-control form-control-lg"
             name="email"
             placeholder="Email Address"
             type="text">
      <span class="glyphicon fa fa-envelope form-control-feedback" aria-hidden="true"></span>
    </div>
    <button class="btn btn-primary btn-lg" @click="sendReset">Send</button>
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
      if (response) {
        this.success = true;
      }
    },
  },
};
</script>

<style>
</style>
