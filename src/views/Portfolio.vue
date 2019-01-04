<template>
  <div class="portfolio">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-12">
          <portfolio-performance-details />
          <div class="row">
            <div class="col-md-6">
              <balances-table />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RequiresAsyncState from '@/components/RequiresAsyncState';
import PortfolioPerformanceDetails from '@/components/PortfolioPerformanceDetails';
import BalancesTable from '@/components/BalancesTable';
import RouterNav from '@/components/RouterNav.vue';

export default {
  name: 'portfolio',
  components: {
    RequiresAsyncState,
    RouterNav,
    PortfolioPerformanceDetails,
    BalancesTable,
  },
};
</script>
<style>
.currency-icon {
  max-width:20px;
  max-height: 20px;
}
</style>
