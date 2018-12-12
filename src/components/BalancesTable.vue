<template>
  <table class="table table-striped table-hover mb-0 no-wrap">
    <thead>
      <tr>
        <th>Currency</th>
        <th>Available</th>
        <th>In Funds</th>
        <th>Total</th>
        <th>
          <b-dropdown id="zero-balances"
                      variant="outline-primary"
                      size="sm"
                      :text="`Zero balances:${hideZero ? '\u2717' : '\u2713'}`"
                      class="m-0">
            <b-dropdown-item @click="hideZero = !hideZero" class="no-uppercase">
              {{ hideZero ? 'Show zero balances' : 'Hide zero balances' }}
            </b-dropdown-item>
          </b-dropdown>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="balance in filteredBalances" :key="balance.currency.code">
        <td>
          {{ balance.currency.code }}
          <img :src="icons[balance.currency.code]"
               class="mb-1 currency-icon"
               v-if="icons[balance.currency.code]">
        </td>
        <td>{{ balance.amount }}</td>
        <td>{{ balance.inFunds }}</td>
        <td>{{ balance.amount }}</td>
        <td>
          <b-button :href="`/withdrawals/${balance.currency.code}`"
                    variant="outline-primary"
                    size="sm"
                    class="mr-2">
            Withdraw
          </b-button>
          <b-button :href="`/deposits/${balance.currency.code}`"
                    variant="outline-primary"
                    size="sm">
            Deposit
          </b-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex';
import pickBy from 'lodash.pickby';
import icons from '@/assets/images/currencies/index';

export default {
  data() {
    return {
      hideZero: false,
    };
  },
  computed: {
    icons() {
      return icons;
    },
    ...mapGetters(['balances', 'currencies']),
    filteredBalances() {
      return pickBy(this.balances, balance => !this.hideZero || parseFloat(balance.total) > 0);
    },
  },
  methods: {
    formatCurrency(amount, code) {
      const currency = this.currencies[code];
      return currency ? currency.format(amount) : amount;
    },
    hasIcon(code) {
      const currency = this.currencies[code];
      return currency && currency.icon;
    },
    iconPath(code) {
      const currency = this.currencies[code];
      return currency && currency.icon;
    },
  },
};
</script>
<style scoped>
.currency-icon {
  max-width:20px;
  max-height: 20px;
}
</style>
