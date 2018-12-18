<template>
  <b-modal v-if="investmentFund"
           :id="modalId"
           lazy
           ref="investmentFundRedemption"
           title="Investment Fund Redemption"
           cancel-variant="outline-primary"
           ok-variant="primary"
           @ok.prevent="handleRedemption"
           footer-class="modal-footer-center"
           class="text-center">
    <p>
      You currently have <span class="text-info">{{ formattedShareValue }}</span> invested.
    </p>
    <b-form-radio-group id="amountOrPercent" v-model="amountType" name="amountTypeRadio">
      <b-form-radio value="amount">{{ investmentFund.currencyCode }} value</b-form-radio>
      <b-form-radio value="percent">% percent value</b-form-radio>
    </b-form-radio-group>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="form-group">
        </div>
        <div class="form-group">
          <input v-show="amountType === 'amount'"
                 id="redemption-amount"
                 class="form-control"
                 v-model="amount"
                 name="amount"
                 type="number"
                 v-validate="`min_value:0|required`"
                 :placeholder="`${investmentFund.currencyCode} value`"
                 autocomplete="off">
                 
          <input v-show="amountType === 'percent'"
             id="redemption-amount-percent"
             class="form-control"
             v-model="percent"
             name="percent"
             type="number"
             v-validate="`max_value:100|min_value:0|required`"
             placeholder="% value"
             autocomplete="off">
        </div>
      </div>
    </div>
    <p class="text-danger" v-if="!investmentFund">
      Something went wrong.
    </p>
    <p class="text-danger" v-if="errors.any()">
      {{ errors.first('amount') || errors.first('percent') }}
    </p>
    <p class="text-warning" v-if="amount && amountType === 'amount'">
      The value of your investment may change before the time it is processed.
      Use percentages to account for variance if you are redeeming an amount
      near your investment's value to insure that it goes through.
    </p>
    <template slot="modal-ok">
      Submit Redemption Request
    </template>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { redeemFromFund } from '@/api';
import { BigNumber } from 'bignumber.js';
import { EventBus, events } from '@/event-bus';

export default {
  data() {
    return {
      amountType: 'amount',
      amount: null,
      percent: null,
      twofaToken: null,
      error: false,
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
  watch: {
    amountType() {
      if (this.amountType === 'amount') {
        this.errors.remove('percent');
        this.$validator.validate('amount');
      } else {
        this.errors.remove('amount');
        this.$validator.validate('percent');
      }
    }
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
      const valid = await this.$validator.validate(this.amountType);
      if (!valid) {
        return false;
      }
      
      const response = await redeemFromFund({
        id: this.investmentFund.id,
        amount: this.amountType === 'amount' ? this.amount : null,
        percent: this.amountType === 'percent' ? this.percent : null,
        twofaToken: this.twofaToken,
      }).catch(() => this.error = false);
      
      if (response.status >= 400) {
        this.error = true;
      }
      
      if (response.data.success) {
        EventBus.$emit(events.INVESTMENT_REQUEST_CREATED, response.data.request);
        await this.fetchBalances();
        this.$refs.investmentFundRedemption.hide();
      }
    },
  },
};
</script>
<style>
.modal-footer-center {
  display: flex;
  justify-content: center;
}
</style>
