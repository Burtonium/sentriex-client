<template>
  <div class="investment-funds">
    <div class="row text-left mb-2">
      <div class="col-md-2">
        <investment-fund-nav :selected="investmentFundId" :investmentFunds="investmentFunds"/>
      </div>
      <div class="col-md-10">
        <investment-fund-trend-data :investmentFundId="investmentFundId" :variant="chartVariant" />
        <br>
        <investment-fund-details :investment-fund="investmentFund"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import InvestmentFundDetails from '@/components/InvestmentFundDetails.vue';
import InvestmentFundNav from '@/components/InvestmentFundNav.vue';
import InvestmentFundTrendData from '@/components/InvestmentFundTrendData.vue';

export default {
  components: {
    InvestmentFundDetails,
    InvestmentFundNav,
    InvestmentFundTrendData,
  },
  computed: {
    ...mapGetters(['investmentFunds', 'authenticated']),
    investmentFundId() {
      return this.$route.params.investmentFundId;
    },
    chartVariant() {
      return parseFloat(this.investmentFund.performance) >= 0 ? 'primary' : 'danger';
    },
    investmentFund() {
      return this.investmentFunds.find(i => i.id === this.investmentFundId);
    },
  },
};
</script>
