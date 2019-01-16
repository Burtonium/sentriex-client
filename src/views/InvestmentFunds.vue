<template>
  <div class="investment-funds">
    <div class="row">
      <investment-fund-list />
    </div>
  </div>
</template>

<script>
import InvestmentFundList from '@/components/InvestmentFundList.vue';

export default {
  name: 'investment-funds',
  components: {
    InvestmentFundList,
  },
};
</script>
