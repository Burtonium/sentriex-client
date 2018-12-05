<template>
  <b-modal :id="modalId"
           lazy
           title="Investment Fund Subscription"
           cancel-variant="outline-primary"
           ok-variant="primary"
           @ok="handleSubscription"
           class="text-center">
    <p>
      You currently have
      <span class="text-info">{{ formattedCurrentBalance }}</span>
    </p>
    <div class="col-md-6 offset-md-3">
      <div class="text-center">
        <input id="subscription-amount"
               class="form-control"
               v-model="amount"
               name="amount"
               type="number"
               v-validate="`max_value:${currentBalance}`"
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
import { subscribeToFund } from '@/api';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      error: false,
      amount: null,
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
    ...mapGetters(['balances', 'currencies']),
    currentBalance() {
      const currencyCode = this.investmentFund && this.investmentFund.currencyCode;
      const balance = this.balances[currencyCode];
      return balance ? balance.amount : 0;
    },
    formattedCurrentBalance() {
      const currencyCode = this.investmentFund && this.investmentFund.currencyCode;
      const currency = this.currencies[currencyCode];
      return currency ? currency.format(this.currentBalance) : this.currentBalance;
    },
  },
  methods: {
    async handleSubscription() {
      await subscribeToFund({
        id: this.investmentFund.id,
        amount: this.amount,
      });
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
