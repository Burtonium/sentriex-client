<template>
  <div class="account">
    <account-details />
  </div>
</template>

<script>
import AccountDetails from '@/components/AccountDetails.vue';

export default {
  name: 'account',
  components: {
    AccountDetails,
  },
};
</script>
