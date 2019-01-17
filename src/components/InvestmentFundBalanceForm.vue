<template>
  <div class="">
    <div class="preview">
      <p>
        Total assets under management: <span class="text-primary">{{ assetsUnderManagement }}</span>
      </p>
      <p v-if="deltaAmount.isGreaterThan(0)">
        Share value will increase by <span class="text-primary">{{ deltaShareValuePercent }}</span>
      </p>
      <p v-else-if="deltaAmount.isLessThan(0)">
        Share value will decrease by <span class="text-primary">{{ deltaShareValuePercent }}</span>
      </p>
      <p v-else>
        Current share value: <span class="text-primary">{{ currentShareValue || 'N/A' }}</span>
      </p>
      <p>
        Total shares owned in fund: <span class="text-primary">{{ investmentFund.shareCount || 'N/A' }}</span>
      </p>
      <p v-if="deltaAmountIsZero || balance === ''">
        Update your balance to record a profit or loss to your investment fund.
      </p>
      <p v-else-if="balance == 0">
        <img class="itsgone" src="../assets/images/itsgone.jpeg">
      </p>
      <template v-else>
        <p>
          You are recording a <span class="text-primary">{{ profitOrLoss }}</span>
          of <span class="text-primary">{{ formattedDeltaBalance }}</span>.
        </p>
        <p>
          This will update the share price to
          <span class="text-primary">{{ formatedUpdatedSharePrice }}</span>
        </p>
      </template>
    </div>
    <form class="form-inline">
      <div class="form-group">
        <label>Current Balance:</label>
        <input class="form-control ml-2" name="balance" v-model="balance" type="number" :disabled="!investmentFund.shareCount">

        <template v-if="user.admin">
          <br>
          <label class="ml-4">Date override:</label>
          <input class="form-control ml-2" name="date_override" v-model="dateOverride" type="text" :disabled="!investmentFund.shareCount">
        </template>
        <b-btn class="ml-4"
               variant="primary"
               @click="updateBalance"
               :disabled="!investmentFund.shareCount">
          Update
        </b-btn>
      </div>
    </form>
    <div class="text-danger mt-3" v-if="!investmentFund.shareCount">
      Initial investment required for updating balances.
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils';
import { mapActions, mapGetters } from 'vuex';
import { updateFundBalance } from '@/api';
import BigNumber from 'bignumber.js';

export default {
  data() {
    return {
      balance: parseFloat(this.investmentFund.balance),
      dateOverride: formatDate(new Date()),
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
    ...mapGetters(['currencies', 'user']),
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
      const percentage = this.deltaAmount.dividedBy(this.fundBalance).times(100).toFixed(2);
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
    },
    updatedSharePrice() {
      return new BigNumber(this.balance).dividedBy(this.investmentFund.shareCount);
    },
    formatedUpdatedSharePrice() {
      const currency = this.currencies[this.investmentFund.currencyCode];
      return currency.format(this.updatedSharePrice);
    },
  },
  watch: {
    fundBalance() {
      this.balance = parseFloat(this.fundBalance);
    },
  },
  methods: {
    ...mapActions(['fetchInvestmentFunds', 'fetchInvestmentBalanceUpdates']),
    async updateBalance() {
      await updateFundBalance({
        id: this.investmentFund.id,
        updatedSharePrice: this.updatedSharePrice.toString(),
        sharePriceDate: this.user.admin && this.dateOverride,
      });

      await Promise.all([
        this.fetchInvestmentFunds({ refresh: true }),
        this.fetchInvestmentBalanceUpdates(this.investmentFund.id),
      ]);
    },
  },
};
</script>
