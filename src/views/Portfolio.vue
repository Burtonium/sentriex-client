<template>
  <div class="portfolio">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-2">
          <requires-async-state :actions="['fetchCurrencies']">
            <template slot-scope="store">
              <router-nav 
                :items="store.getters.currencies" 
                itemIdField="code" 
                routeIdField="currencyCode" />
            </template>
          </requires-async-state>
        </div>
        <div class="col-md-10">
          <requires-async-state 
            :actions="['fetchInvestmentFunds', 'fetchInvestmentFundShares']">
            <template slot-scope="store">
              <portfolio-investment-list 
                :investmentFunds="store.getters.investmentFunds"
                :investmentFundShares="store.getters.investmentFundShares"/>
            </template>
          </requires-async-state>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RequiresAsyncState from '@/components/RequiresAsyncState';
import PortfolioInvestmentList from '@/components/PortfolioInvestmentList';
import RouterNav from '@/components/RouterNav.vue';

export default {
  name: 'portfolio',
  components: {
    RequiresAsyncState,
    RouterNav,
    PortfolioInvestmentList,
  },
};
</script>
<style>
.currency-icon {
  max-width:20px;
  max-height: 20px;
}
</style>
