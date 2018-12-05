<template>
  <div class="balances">
    <div class="wrapper row mt-5">
      <div class="col-md-10 offset-md-1">
        <h2 class="balances-title">Balances</h2>
        <balances-table />
      </div>
    </div>
  </div>
</template>
<script>
import BalancesTable from '@/components/BalancesTable.vue';

export default {
  name: 'balanes',
  components: {
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
