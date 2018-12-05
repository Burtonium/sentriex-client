<template>
  <landing-container>
    <password-reset-request-form />
  </landing-container>
</template>
<script>
import LandingContainer from '../components/LandingContainer.vue';
import PasswordResetRequestForm from '../components/PasswordResetRequestForm.vue';

export default {
  components: {
    LandingContainer,
    PasswordResetRequestForm,
  },
};
</script>
