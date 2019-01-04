<template>
  <div>
    <div class="header-flex">
      <h4 class="text-primary mb-4">
        Top Performing {{ displayType === 'individual' ? 'Investments' : 'Currencies'}}
      </h4>
      <b-dropdown id="display-type"
                  variant="outline-primary"
                  size="sm"
                  :text="`Display:${displayType}`"
                  class="mb-2"
                  style="">
        <b-dropdown-item @click="displayType = 'individual'">
          Individual Investments
        </b-dropdown-item>
        <b-dropdown-item @click="displayType = 'totals'">
          Currency Totals
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <requires-async-state :actions="['fetchPerformance', 'fetchCurrencies']">
      <b-table :items="performanceInfo" v-if="performance" stacked="md">
        <template slot="totalProfit" slot-scope="row">
          <span :class="getSuccessClass(row.item.totalProfit)">
            {{ row.item.totalProfit }}
          </span>
        </template>
        <template slot="profitPercent" slot-scope="row">
          <span :class="getSuccessClass(row.item.profitPercent)">
            {{ row.item.profitPercent }}
          </span>
        </template>
      </b-table>
    </requires-async-state>
  </div>
</template>
<script>
import RequiresAsyncState from '@/components/RequiresAsyncState.vue';
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      displayType: 'individual',
    };
  },
  components: {
    RequiresAsyncState,
  },
  methods: {
    getSuccessClass(p) {
      return parseFloat(p) >= 0 ? 'text-success' : 'text-danger';
    },
  },
  computed: {
    ...mapGetters(['performance', 'currencies']),
    totalsPerformance() {
      return Object.values(this.currencies).map((currency) => {
        let totalInitial = new BigNumber(0);
        let totalValue = new BigNumber(0);
        let totalProfit = new BigNumber(0);
        this.performance
          .filter(p => p.currencyCode === currency.code)
          .forEach((perf) => {
            totalInitial = totalInitial.plus(perf.initialInvestment);
            totalValue = totalValue.plus(perf.investmentValue);
            totalProfit = totalProfit.plus(perf.profitAmount);
          });
        const profitPercent = totalInitial.isGreaterThan(0)
          ? totalProfit.dividedBy(totalInitial).times(100).toFixed(2)
          : new BigNumber(0);

        return {
          currency: currency.code,
          totalInitial: currency.format(totalInitial),
          totalValue: currency.format(totalValue),
          totalProfit: currency.format(totalProfit),
          profitPercent: `${profitPercent}%`,
        };
      });
    },
    individualPerformance() {
      if (!this.performance) {
        return [];
      }

      return this.performance.map((p) => {
        const currency = this.currencies[p.currencyCode];
        return {
          fundName: p.investmentFundName,
          initialInvestment: currency.format(p.initialInvestment),
          currentValue: currency.format(p.investmentValue),
          totalProfit: currency.format(p.profitAmount),
          profitPercent: `${p.profitPercent}%`,
        };
      });
    },
    performanceInfo() {
      return this.displayType === 'individual' ? this.individualPerformance : this.totalsPerformance;
    },
  },
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
.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
