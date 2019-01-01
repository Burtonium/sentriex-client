<template>
  <b-card-group deck>
    <b-card no-body
            v-for="fund in investmentFundsByValue"
            :key="fund.id"
            :class="investmentClass">
      <h5 class="p-2 card-title ellipsis">
        {{ fund.name }}
      </h5>
      <p class="card-text">
          {{ fund.trendData }}
      </p>
      <div slot="footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </b-card>
  </b-card-group>
</template>
<script>
import { daysBetween } from '@/utils';
const daysFromNow = (date) => daysBetween(new Date(date), new Date());
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default {
  data() {
    return {
      error: false,
      columns: 3,
      page: 1,
      daysToPlot: 30,
    };
  },
  props: {
    investmentFunds: {
      type: Array,
      required: true,
    },
    investmentFundShares: {
      type: Array,
      required: true,
    }
  },
  computed: {
    investmentClass() {
      let classes;
      if (this.investmentFundShares >= 5) {
        classes = "invested";
      } else if (this.investmentFundShares.length >= 3) {
        classes = 'invested-dual';
      } else {
        classes = 'invested-dual';
      }
      return classes;
    },
    investmentFundsByValue() {
      return this.investmentFundShares.map(s => {
        const fund = this.investmentFunds.find(i => i.id === s.investmentFundId);
        if (!fund) {
          this.error = true;
        }
        else {
          return {
            ...fund,
            ...s,
            trendData: this.plotBalanceUpdateTrends(fund.balanceUpdates),
            investedValue: parseFloat(fund.sharePrice) * s.amount,
          };
        }
      }).sort((a, b) => b.investedValue - a.investedValue);
    }
  },
  methods: {
    plotBalanceUpdateTrends(balanceUpdates) {
      const toPlot = balanceUpdates
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(bu => ([new Date(bu.createdAt), parseFloat(bu.updatedSharePrice) - 1]))

      const plotted = [];
      toPlot.forEach((update, index) => {
        plotted.push(update);
        const DAY = 1000 * 60 * 60 * 24;
        const dateToPlotTo = toPlot[index + 1] && toPlot[index + 1][0] || new Date();
        const valueToPlotTo = toPlot[index+ 1] && toPlot[index + 1][1] || update[0];
        const daysToPlot = daysBetween(update[0], dateToPlotTo);
        for (let i = 1; i <= daysToPlot; i++) {
          const x = valueToPlotTo + (valueToPlotTo * i / daysToPlot);
          plotted.push([addDays(update[0], i), x]);
        }
      });
      console.log(plotted.filter(p => daysFromNow(p[0]) >= 30));
    }
  }
};
</script>
<style scoped>
.investments-container {
  display: flex;
  flex-wrap: wrap;
}
.invested {
  max-width: 30%;
  min-width: 30%;
}

.invested-dual {
  max-width: 47%;
  min-width: 47%;
}
</style>
