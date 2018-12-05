<template>
  <landing-container>
    <login-form />
  </landing-container>
</template>
<script>
import LandingContainer from '../components/LandingContainer.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
  components: {
    LandingContainer,
    LoginForm,
  },
};
</script>
