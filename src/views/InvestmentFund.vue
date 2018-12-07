<template>
  <div class="investment-funds">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-3">
          <investment-fund-nav :selected="investmentFundId" :investmentFunds="investmentFunds"/>
        </div>
        <div class="col-md-6">
          <investment-fund-details :investment-fund="investmentFund"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import InvestmentFundDetails from '@/components/InvestmentFundDetails.vue';
import InvestmentFundNav from '@/components/InvestmentFundNav.vue';

export default {
  components: {
    InvestmentFundDetails,
    InvestmentFundNav,
  },
  computed: {
    ...mapGetters(['investmentFunds']),
    investmentFundId() {
      return this.$route.params.investmentFundId;
    },
    investmentFund() {
      return this.investmentFunds.find(i => i.id === this.investmentFundId);
    },
  },
};
</script>
