<template>
  <div>
    <h3>Forgot Password</h3>
    <div class="text-success" role="alert" v-if="success">
      Success! A password reset was sent to your email address.
    </div>
    <br>
    <div class="form-group has-feedback">
      <input class="form-control form-control-lg"
             name="email"
             placeholder="Email Address"
             v-model="email"
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
      if (response.data.success) {
        this.success = true;
      }
    },
  },
};
</script>

<style>
</style>
