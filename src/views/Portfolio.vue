<template>
  <div class="portfolio">
    <div class="wrapper mt-5 text-left flexed-rows">
      <div class="row">
        <div class="col-md-12">
          <portfolio-performance-details />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <balances-table />
        </div>
        <div class="col-lg-6">
          <referral-payment-list />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <investment-fund-request-history />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <withdrawal-history />
        </div>
        <div class="col-lg-6">
          <deposit-history />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RequiresAsyncState from '@/components/RequiresAsyncState';
import PortfolioPerformanceDetails from '@/components/PortfolioPerformanceDetails';
import BalancesTable from '@/components/BalancesTable';
import ReferralPaymentList from '@/components/ReferralPaymentList.vue';
import WithdrawalHistory from '@/components/WithdrawalHistory.vue';
import DepositHistory from '@/components/DepositHistory.vue';
import InvestmentFundRequestHistory from '@/components/InvestmentFundRequestHistory.vue';
import RouterNav from '@/components/RouterNav.vue';

export default {
  name: 'portfolio',
  components: {
    RequiresAsyncState,
    RouterNav,
    PortfolioPerformanceDetails,
    BalancesTable,
    ReferralPaymentList,
    WithdrawalHistory,
    InvestmentFundRequestHistory,
    DepositHistory,
  },
};
</script>
<style>
.flexed-rows {
  display: flex;
  flex-direction: column;
}

.flexed-rows .row {
  flex-basis: 195px;
  margin-bottom: 20px;
}
.currency-icon {
  max-width:20px;
  max-height: 20px;
}
</style>
