<template>
  <b-modal :id="modalId"
           title="Investment Fund Subscription"
           cancel-variant="outline-primary"
           ref="investmentFundSubscription"
           ok-variant="primary"
           @ok.prevent="handleSubscription"
           footer-class="modal-footer-center"
           class="text-center">
    <p>
      You currently have
      <span class="text-info">{{ formattedCurrentBalance }}</span>
    </p>
    <div class="col-md-6 offset-md-3">
      <div class="form-group">
        <input id="subscription-amount"
               class="form-control input-center-text"
               v-model="amount"
               name="subscription_amount"
               data-vv-as="subscription amount"
               type="number"
               v-validate="`max_value:${parseFloat(currentBalance)}|required|min_value:0`"
               placeholder="Amount"
               autocomplete="off">
      </div>
      <div class="form-group" v-if="user.twofa">
        <input class="form-control input-center-text"
               name="twofa"
               placeholder="2FA Code"
               type="number"
               v-model="twofaToken"
               autocomplete="off"
               v-validate="'digits:6|required'">
        <p class="text-danger mt-2">
          {{ errors.first('twofa') }}
        </p>
      </div>
    </div>
    <div class="errors mt-2">
      <p class="text-danger" v-if="!investmentFund || error">
        Something went wrong.
      </p>
      <p class="text-danger" v-if="errors.any()">
        {{ errors.first('subscription_amount') }}
      </p>
    </div>
    <template slot="modal-ok">
      Submit Subscription Request
    </template>
  </b-modal>
</template>
<script>
import { subscribeToFund } from '@/api';
import { mapGetters, mapActions } from 'vuex';
import { EventBus, events } from '@/event-bus';

export default {
  data() {
    return {
      error: false,
      amount: null,
      twofaToken: null,
    };
  },
  props: {
    investmentFund: {
      required: false,
    },
    modalId: {
      required: true,
    },
  },
  computed: {
    ...mapGetters(['balances', 'currencies', 'user']),
    currentBalance() {
      const currencyCode = this.investmentFund && this.investmentFund.currencyCode;
      const balance = this.balances && this.balances[currencyCode];
      return balance ? balance.amount : 0;
    },
    formattedCurrentBalance() {
      const currencyCode = this.investmentFund && this.investmentFund.currencyCode;
      const currency = this.currencies[currencyCode];
      return currency ? currency.format(this.currentBalance) : this.currentBalance;
    },
  },
  methods: {
    ...mapActions(['fetchBalances']),
    async handleSubscription() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      let response;
      try {
        response = await subscribeToFund({
          id: this.investmentFund.id,
          amount: this.amount,
          twofaToken: this.twofaToken,
        });
      } catch (error) {
        this.error = true;
      }
      if (response.status >= 400) {
        this.error = true;
      }

      if (response.data.success) {
        EventBus.$emit(events.INVESTMENT_REQUEST_CREATED, response.data.request);
        await this.fetchBalances();
        this.$refs.investmentFundSubscription.hide();
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
