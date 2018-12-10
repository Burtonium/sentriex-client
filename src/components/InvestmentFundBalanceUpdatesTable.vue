<template>
  <div>
    <spinner v-if="!balanceUpdates"/>
    <b-table :items="balanceUpdates"
             :fields="['previousBalance', 'updatedBalance', 'createdAt']" v-else />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Spinner from './Spinner.vue';

export default {
  components: {
    Spinner,
  },
  props: {
    investmentFundId: {
      required: false,
    },
  },
  watch: {
    investmentFundId() {
      this.loadData();
    },
  },
  computed: {
    balanceUpdates() {
      return this.investmentFundBalanceUpdates[this.investmentFundId];
    },
    ...mapGetters(['investmentFundBalanceUpdates']),
  },
  methods: {
    ...mapActions(['fetchInvestmentBalanceUpdates']),
    async loadData() {
      if (this.investmentFundId) {
        await this.fetchInvestmentBalanceUpdates(this.investmentFundId);
      }
    },
  },
  async created() {
    await this.loadData();
  },
};
</script>
