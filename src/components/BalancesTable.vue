<template>
  <div>
    <div class="header-flex">
      <h4 class="text-primary mb-4">Balances</h4>
      <b-dropdown id="zero-balances"
                  variant="outline-primary"
                  size="sm"
                  :text="`Zero balances:${hideZero ? '\u2717' : '\u2713'}`"
                  class="mb-2">
        <b-dropdown-item @click="hideZero = !hideZero" class="no-uppercase">
          {{ hideZero ? 'Show zero balances' : 'Hide zero balances' }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <requires-async-state :actions="['fetchBalances', 'fetchCurrencies']">
      <b-table :fields="balanceFields" :items="formattedBalances" stacked="sm">
        <template slot="currencyCode" slot-scope="row">
          <img :src="icons[row.item.currencyCode]"
               class="mb-1 currency-icon"
               v-if="icons[row.item.currencyCode]">
          {{ row.item.currencyCode }}
        </template>
        <template slot="actions" slot-scope="row">
          <b-btn :to="`/withdrawals/${row.item.currencyCode}`"
                  variant="outline-primary"
                  size="sm"
                  class="mr-2">
            Withdraw
          </b-btn>
          <b-btn :to="`/deposits/${row.item.currencyCode}`"
                  variant="outline-primary"
                  size="sm">
            Deposit
          </b-btn>
        </template>
      </b-table>
    </requires-async-state>
  </div>
</template>
<script>
import RequiresAsyncState from '@/components/RequiresAsyncState.vue';
import { mapGetters } from 'vuex';
import pickBy from 'lodash.pickby';
import icons from '@/assets/images/currencies/index';

export default {
  data() {
    return {
      hideZero: false,
    };
  },
  components: {
    RequiresAsyncState,
  },
  computed: {
    balanceFields() {
      return {
        currencyCode: {
          label: 'Currency',
        },
        amount: {
          label: 'Available',
        },
        actions: {},
      };
    },
    icons() {
      return icons;
    },
    ...mapGetters(['balances', 'currencies']),
    formattedBalances() {
      return Object.values(this.filteredBalances).map(this.formatBalance);
    },
    filteredBalances() {
      return pickBy(this.balances, balance => !this.hideZero || parseFloat(balance.total) > 0);
    },
  },
  methods: {
    formatBalance(balance) {
      const currency = this.currencies[balance.currencyCode];
      return currency && {
        ...balance,
        amount: currency.format(balance.amount),
        inFunds: currency.format(balance.inFunds),
        total: currency.format(balance.total),
      };
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
.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
