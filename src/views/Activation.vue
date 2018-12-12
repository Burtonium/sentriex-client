<template>
  <div v-if="state ==='initial'">
    <loading/>
    <br>
    <br>
    <p class="alert alert-info">Currently activating your account, please wait.</p>
  </div>
  <div v-else-if="state === 'success'">
    <checkmark/>
    <p class="alert alert-success">
      You account was successfully activated... Redirecting you to login.
    </p>
  </div>
  <div v-else-if="state === 'error'">
    <p class="alert alert-danger">
      {{ error.message }}
    </p>
  </div>
</template>
<script>
import Checkmark from '@/components/Checkmark.vue';
import Loading from '@/components/Loading.vue';

import { activate } from '../api';

export default {
  data() {
    return {
      state: 'initial',
      error: null
    };
  },
  components: {
    Checkmark,
    Loading
  },
  async mounted() {
    const token = this.$route.params.token;
    const res = await activate(token);
    if (res.data.success) {
      this.state = 'success';
      setTimeout(() => {
        this.$router.push('/login');
      }, 4000);
    } else {
      this.state = 'error';
      this.error = { message: res.data.message };
    }
  }
};
</script>
