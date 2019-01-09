<template>
  <requires-async-state :actions="actionDependencies">
    <b-modal :id="modalId"
             lazy
             ref="investmentFundRedemption"
             title="Investment Fund Redemption"
             cancel-variant="outline-primary"
             ok-variant="primary"
             @ok.prevent="handleRedemption"
             footer-class="modal-footer-center"
             class="text-center">
        <p v-if="fundPerformance">
          You currently have <span class="text-info">{{ formattedPerformance }}</span> invested.
        </p>
        <p class="text-danger" v-else>
          You have no balance in this fund.
        </p>
      <b-form-radio-group id="amountOrPercent" v-model="amountType" name="amountTypeRadio">
        <b-form-radio value="redeem_amount">{{ currencyCode }} value</b-form-radio>
        <b-form-radio value="percent">% percent value</b-form-radio>
      </b-form-radio-group>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="form-group">
          </div>
          <div class="form-group">
            <input v-show="amountType === 'redeem_amount'"
                   id="redemption-amount"
                   class="form-control"
                   v-model="amount"
                   name="redeem_amount"
                   type="number"
                   data-vv-as="redemption amount"
                   v-validate="`min_value:0|required`"
                   :placeholder="`${currencyCode} value`"
                   autocomplete="off">

            <input v-show="amountType === 'percent'"
               id="redemption-amount-percent"
               class="form-control"
               v-model="percent"
               name="percent"
               type="number"
               data-vv-as="redemption percent"
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
        {{ errors.first('redeem_amount') || errors.first('percent') }}
      </p>
      <p class="text-warning" v-if="amount && amountType === 'redeem_amount'">
        The value of your investment may change before the time it is processed.
        Use percentages to account for variance if you are redeeming an amount
        near your investment's value to insure that it goes through.
      </p>
      <template slot="modal-ok" disabled>
        Submit Redemption Request
      </template>
    </b-modal>
  </requires-async-state>
</template>
<script>
import RequiresAsyncState from '@/components/RequiresAsyncState.vue';
import { mapGetters, mapActions } from 'vuex';
import { redeemFromFund } from '@/api';
import { BigNumber } from 'bignumber.js';
import { EventBus, events } from '@/event-bus';

export default {
  components: {
    RequiresAsyncState,
  },
  data() {
    return {
      amountType: 'percent',
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
      default: () => ({}),
    },
    modalId: {
      required: true,
    },
  },
  watch: {
    amountType() {
      if (this.amountType === 'redeem_amount') {
        this.errors.remove('percent');
      } else {
        this.errors.remove('redeem_amount');
      }
    },
  },
  computed: {
    actionDependencies() {
      return ['fetchPerformance'];
    },
    ...mapGetters(['investmentFundShares', 'currencies', 'performance']),
    fundPerformance() {
      const fund = this.investmentFund || {};
      return this.performance && this.performance.find(p => p.investmentFundId === fund.id);
    },
    formattedPerformance() {
      const currency = this.currencies && this.currencies[this.currencyCode];
      return currency.format(this.fundPerformance.investmentValue);
    },
    currencyCode() {
      return this.investmentFund && this.investmentFund.currencyCode;
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
        amount: this.amountType === 'redeem_amount' ? this.amount : null,
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
