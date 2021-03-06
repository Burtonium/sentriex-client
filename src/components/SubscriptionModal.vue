<template>
  <b-modal :id="modalId"
           :title="$t('subscription.title')"
           cancel-variant="outline-primary"
           ref="investmentFundSubscription"
           ok-variant="primary"
           @ok.prevent="handleSubscription"
           footer-class="modal-footer-center"
           class="text-center">
    <p>
      {{ $t('subscription.balance', { balance: formattedCurrentBalance })}}
    </p>
    <div class="col-md-6 offset-md-3">
      <div class="form-group">
        <input id="subscription-amount"
               class="form-control input-center-text"
               v-model="amount"
               name="subscription_amount"
               type="number"
               v-validate="`max_value:${parseFloat(currentBalance)}|required|min_value:0`"
               :data-vv-as="$t('fields.amount')"
               :placeholder="$t('general.amount')"
               autocomplete="off">
      </div>
      <div class="form-group" v-if="user.twofa">
        <input class="form-control input-center-text"
               name="twofa"
               :placeholder="$t('twoFa.codePlaceholder')"
               type="number"
               v-model="twofaToken"
               autocomplete="off"
               :data-vv-as="$t('fields.twoFa')"
               v-validate="'digits:6|required'">
        <p class="text-danger mt-2">
          {{ errors.first('twofa') }}
        </p>
      </div>
    </div>
    <div class="errors mt-2">
      <p class="text-danger" v-if="!investmentFund || error">
        {{ $t('error.generalExtended') }}
      </p>
      <p class="text-danger" v-if="errors.any()">
        {{ errors.first('subscription_amount') }}
      </p>
    </div>
    <template slot="modal-ok">
      {{ $t('subscription.submit') }}
    </template>
    <template slot="modal-cancel">
      {{ $t('general.cancel')}}
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
