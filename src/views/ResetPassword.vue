<template>
  <landing-container>
    <password-reset-form v-if="token" :resetToken="token"/>
    <password-reset-request-form v-else/>
  </landing-container>
</template>
<script>
import LandingContainer from '@/components/LandingContainer.vue';
import PasswordResetForm from '@/components/PasswordResetForm.vue';
import PasswordResetRequestForm from '@/components/PasswordResetRequestForm.vue';

export default {
  computed: {
    token() {
      return this.$route.params.token;
    },
  },
  components: {
    LandingContainer,
    PasswordResetForm,
    PasswordResetRequestForm,
  },
};
</script>
