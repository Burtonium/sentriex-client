<template>
  <div class="">
    <div class="preview">
      <p>
        Total assets under management: <span class="text-primary">{{ assetsUnderManagement }}</span>
      </p>
      <p v-if="deltaBalance > 0">
        Share value will increase by <span class="text-primary">{{ deltaShareValuePercent }}</span>
      </p>
      <p v-else-if="deltaBalance < 0">
        Share value will decrease by <span class="text-primary">{{ deltaShareValuePercent }}</span>
      </p>
      <p v-else>
        Current share value: <span class="text-primary">{{ currentShareValue || 'N/A' }}</span>
      </p>
      <p>
        Total shares owned in fund: <span class="text-primary">{{ investmentFund.shareCount || 'N/A' }}</span>
      </p>
      <p v-if="deltaAmountIsZero">
        Update your balance to record a profit or loss to your investment fund.
      </p>
      <p v-else-if="balance == 0">
        <img class="itsgone" src="../assets/images/itsgone.jpeg">
      </p>
      <p v-else>
        Record a <span class="text-primary">{{ profitOrLoss }}</span>
        of <span class="text-primary">{{ formattedDeltaBalance }}</span>
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
import BigNumber from 'bignumber.js';

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
    deltaAmountIsZero() {
      return new BigNumber(this.deltaAmount).isZero();
    },
    profitOrLoss() {
      return this.balance > parseFloat(this.investmentFund.balance) ? 'profit' : 'loss';
    },
    fundBalance() {
      return this.investmentFund.balance;
    },
    currency() {
      return this.currencies[this.investmentFund.currencyCode];
    },
    formattedDeltaBalance() {
      return this.currency.format(this.deltaAmount);
    },
    deltaAmount() {
      return new BigNumber(this.balance).minus(this.fundBalance);
    },
    deltaShareValuePercent() {
      const percentage = (this.deltaBalance / this.investmentFund.balance * 100).toFixed(2);
      return `${percentage}%`;
    },
    currentShareValue() {
      const { sharePrice } = this.investmentFund;
      return this.currency ? this.currency.format(sharePrice) : sharePrice;
    },
    assetsUnderManagement() {
      const currency = this.currencies[this.investmentFund.currencyCode];
      const sharePrice = new BigNumber(this.investmentFund.sharePrice);
      return currency.format(sharePrice.times(this.investmentFund.shareCount));
    }
  },
  watch: {
    fundBalance() {
      this.balance = parseFloat(this.fundBalance);
    },
  },
  methods: {
    ...mapActions(['fetchInvestmentFunds', 'fetchInvestmentBalanceUpdates']),
    async updateBalance() {
      await updateFundBalance({ id: this.investmentFund.id, amount: this.balance });
      await Promise.all([
        this.fetchInvestmentFunds({ refresh: true }),
        this.fetchInvestmentBalanceUpdates(this.investmentFund.id),
      ]);
    },
  },
};
</script>
