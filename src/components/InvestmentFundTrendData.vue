<template>
  <requires-async-state :actions="actionDependencies">
    <line-chart :chartData="chartData" :height="150" />
  </requires-async-state>
</template>
<script>
import { mapGetters } from 'vuex';
import RequiresAsyncState from '@/components/RequiresAsyncState.vue';
import LineChart from '@/components/LineChart.vue';

export default {
  components: {
    RequiresAsyncState,
    LineChart,
  },
  props: {
    investmentFundId: {
      required: true,
    }
  },
  computed: {
    actionDependencies() {
      return [`fetchTrendData:${this.investmentFundId}`];
    },
    ...mapGetters(['investmentFundTrendData']),
    trendData() {
      return this.investmentFundTrendData[this.investmentFundId] || [];
    },
    trendDataLabels() {
      return this.trendData.map(t => t[0]).slice(-10);
    },
    trendDataValues() {
      return this.trendData.map(t => t[1]).slice(-10);
    },
    chartData() {
      return {
        labels: this.trendDataLabels,
        datasets: [{
          label: '% of profit',
          data: this.trendDataValues,
          borderColor: ['rgba(31, 97, 208, 0.8)'],
          backgroundColor: ['rgba(31, 97, 208, 0.2)'],
        }],
      }
    }
  }
}
</script>
