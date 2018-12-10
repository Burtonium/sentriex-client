<template>
  <div class="">
    <div class="preview">
      <p v-if="deltaBalance > 0">
        Share value will increase by {{ deltaShareValuePercent }}
      </p>
      <p v-else-if="deltaBalance < 0">
        Share value will decrease by {{ deltaShareValuePercent }}
      </p>
      <p v-else>
        Current share value is {{ currentShareValue || 'N/A' }}
      </p>
      <p>
        Total shares owned in fund: {{ investmentFund.shareCount || 'N/A' }}
      </p>
      <p v-if="deltaBalance !== 0">
        Record a {{ balance > parseFloat(investmentFund.balance) ? 'profit' : 'loss' }}
        of {{ deltaBalance }} {{ investmentFund.currencyCode }}
      </p>
      <p v-else>
        Update your balance to record a profit or loss to your investment fund.
      </p>
    </div>
    <form class="form-inline">
      <div class="form-group">
        <label for="">Current Balance:</label>
        &nbsp;
        &nbsp;
        <input class="form-control" name="balance" v-model="balance" type="number">
        &nbsp;
        &nbsp;
        <b-btn variant="primary" @click="updateBalance">Update</b-btn>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { updateFundBalance } from '@/api';

export default {
  data() {
    return {
      balance: parseFloat(this.investmentFund.balance),
    };
  },
  props: {
    investmentFund: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(['currencies']),
    deltaBalance() {
      return this.balance - parseFloat(this.investmentFund.balance);
    },
    deltaShareValuePercent() {
      const percentage = (this.deltaBalance / this.investmentFund.balance * 100).toFixed(2);
      return `${percentage}%`;
    },
    currentShareValue() {
      const currency = this.currencies[this.investmentFund.currencyCode];
      const { sharePrice } = this.investmentFund;
      return currency ? currency.format(sharePrice) : sharePrice;
    },
  },
  watch: {
    investmentFund() {
      this.balance = parseFloat(this.investmentFund.balance);
    },
  },
  methods: {
    ...mapActions(['fetchInvestmentFunds', 'fetchInvestmentBalanceUpdates']),
    async updateBalance() {
      await updateFundBalance({ id: this.investmentFund.id, amount: this.balance });
      await Promise.all([
        this.fetchInvestmentFunds(),
        this.fetchInvestmentBalanceUpdates(this.investmentFund.id),
      ]);
    },
  },
};
</script>
