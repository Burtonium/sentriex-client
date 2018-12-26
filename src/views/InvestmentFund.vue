<template>
  <div class="investment-funds">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-2">
          <investment-fund-nav :selected="investmentFundId" :investmentFunds="investmentFunds"/>
        </div>
        <div :class="{ 'col-md-5': authenticated, 'col-md-7': !authenticated }">
          <investment-fund-details :investment-fund="investmentFund"/>
        </div>
        <div class="col-md-5" v-if="authenticated">
          <investment-fund-request-history />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import InvestmentFundDetails from '@/components/InvestmentFundDetails.vue';
import InvestmentFundNav from '@/components/InvestmentFundNav.vue';
import InvestmentFundRequestHistory from '@/components/InvestmentFundRequestHistory.vue';

export default {
  components: {
    InvestmentFundDetails,
    InvestmentFundNav,
    InvestmentFundRequestHistory,
  },
  computed: {
    ...mapGetters(['investmentFunds', 'authenticated']),
    investmentFundId() {
      return this.$route.params.investmentFundId;
    },
    investmentFund() {
      return this.investmentFunds.find(i => i.id === this.investmentFundId);
    },
  },
};
</script>
