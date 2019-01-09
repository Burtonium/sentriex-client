<template>
  <requires-async-state :actions="actionDependencies">
    {{ trendData }}
  </requires-async-state>
</template>
<script>
import { mapGetters } from 'vuex';
import RequiresAsyncState from '@/components/RequiresAsyncState.vue';
export default {
  components: {
    RequiresAsyncState,
  },
  props: {
    investmentFundId: {
      required: true,
    }
  },
  computed: {
    actionDependencies() {
      return [`fetchTrendData:${this.investmentFundId}`];
    },
    ...mapGetters(['investmentFundTrendData']),
    trendData() {
      return this.investmentFundTrendData[this.investmentFundId];
    },
  }
}
</script>
