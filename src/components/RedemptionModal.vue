<template>
  <b-modal :id="modalId"
           lazy
           title="Investment Fund Redemption"
           cancel-variant="outline-primary"
           ok-variant="primary"
           @ok="handleRedemption"
           class="text-center">
    <p>
      You currently have <span class="text-info">{{ formattedShareValue }}</span> invested.
    </p>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <input id="redemption-amount"
               class="form-control"
               v-model="amount"
               name="amount"
               type="number"
               v-validate="`max_value:${shareBalance}`"
               placeholder="Amount"
               autocomplete="off">
      </div>
    </div>
    <br>
    <p class="text-danger" v-if="!investmentFund">
      Something went wrong.
    </p>
    <p class="text-danger" v-if="errors.any()">
      {{ errors.first('amount') }}
    </p>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { redeemFromFund } from '@/api';
import { BigNumber } from 'bignumber.js';

export default {
  data() {
    return {
      amount: null,
    };
  },
  props: {
    investmentFund: {
      required: false,
      type: Object,
    },
    modalId: {
      required: true,
    },
  },
  computed: {
    ...mapGetters(['investmentFundShares', 'currencies']),
    shareBalance() {
      const id = this.investmentFund && this.investmentFund.id;
      const shares = this.investmentFundShares.find(ifs => ifs.investmentFundId === id);
      const sharePrice = this.investmentFund && this.investmentFund.sharePrice;
      return shares && sharePrice ? (new BigNumber(shares.amount)).times(sharePrice).toString() : 0;
    },
    formattedShareValue() {
      const currencyCode = this.investmentFund && this.investmentFund.currencyCode;
      const currency = this.currencies[currencyCode];
      return currency ? currency.format(this.shareBalance) : this.shareBalance;
    },
  },
  methods: {
    ...mapActions(['fetchBalances']),
    async handleRedemption() {
      if (this.investmentFund) {
        await redeemFromFund({
          id: this.investmentFund.id,
          amount: this.amount,
        });
        await this.fetchBalances();
      }
    },
  },
};
</script>
<style scoped>
#twofa-code {
  width: 100px;
  display:inline-block;
  text-align:center;
}
::-webkit-input-placeholder {
   text-align: center;
}
:-moz-placeholder { /* Firefox 18- */
   text-align: center;
}
::-moz-placeholder {  /* Firefox 19+ */
   text-align: center;
}
:-ms-input-placeholder {
   text-align: center;
}
</style>
