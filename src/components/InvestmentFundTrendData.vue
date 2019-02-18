<template>
  <requires-async-state :actions="actionDependencies">
    <line-chart :chartData="chartData" :height="150" />
  </requires-async-state>
</template>
<script>
import { mapGetters } from 'vuex';
import RequiresAsyncState from '@/components/RequiresAsyncState.vue';
import LineChart from '@/components/LineChart.vue';
import { daysFromNow } from '@/utils';

export default {
  components: {
    RequiresAsyncState,
    LineChart,
  },
  props: {
    investmentFundId: {
      required: true,
    },
    variant: {
      validator(value) {
        return ['primary','danger'].indexOf(value) !== -1
      },
      required: false,
      default: 'primary',
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
      return this.trendData.map(t => t[0]);
    },
    trendDataValues() {
      return this.trendData.map(t => t[1]);
    },
    backgroundColor() {
      const colors = {
        primary: 'rgba(31, 97, 208, 0.2)',
        danger: 'rgba(238, 109, 115, 0.2)',
      };
      return colors[this.variant];
    },
    borderColor() {
      const colors = {
        primary: 'rgba(31, 97, 208, 0.8)',
        danger: 'rgba(238, 109, 115, 0.8)',
      };
      return colors[this.variant];
    },
    chartData() {
      return {
        labels: this.trendDataLabels,
        datasets: [{
          label: this.$t('funds.percentOfProfit'),
          data: this.trendDataValues,
          borderColor: [this.borderColor],
          backgroundColor: [this.backgroundColor],
        }],
      };
    },
  },
};
</script>
