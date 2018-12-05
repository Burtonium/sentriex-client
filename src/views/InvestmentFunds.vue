<template>
  <div class="investment-funds">
    <div class="wrapper row mt-5">
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
