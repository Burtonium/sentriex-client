<template>
  <div class="investment-funds">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-2">
          <investment-fund-nav :selected="investmentFundId" :investmentFunds="investmentFunds"/>
        </div>
        <div class="col-md-10">
          <investment-fund-trend-data :investmentFundId="investmentFundId" />
          <br>
          <investment-fund-details :investment-fund="investmentFund"/>
          <br>
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
import InvestmentFundTrendData from '@/components/InvestmentFundTrendData.vue';
export default {
  components: {
    InvestmentFundDetails,
    InvestmentFundNav,
    InvestmentFundRequestHistory,
    InvestmentFundTrendData,
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
