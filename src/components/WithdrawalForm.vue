<template>
  <form @submit.prevent="onSubmit">
    <p class="text-primary">
      You currently have {{ balanceAmount }}
    </p>
    <div class="form-group">
      <label>Withdrawal Address</label>
      <input class="form-control input-center-text"
             v-model="withdrawal.address"
             type="text"
             name="address"
             v-validate
             placeholder="Address to send the funds to" />
      <p class="text-warning mt-1" v-if="withdrawal.address">
        Double check to make sure this address is correct and that it is a valid
        {{ currencyCode }} address.
      </p>
    </div>
    

    <div class="form-group">
      <label>Amount</label>
      <input class="form-control input-center-text"
             v-model="withdrawal.amount"
             type="number" 
             min="0"/>
    </div>
  </form>
</template>
<script>
import { mapGetters } from 'vuex';
import { createWithdrawal, errorCodes } from '@/api';

const initialState = {
  error: null,
  success: false,
  withdrawal: {},
};

export default {
  data() {
    return {
      ...initialState,
    };
  },
  computed: {
    ...mapGetters(['currencies', 'balances', 'account']),
    currencyCode() {
      return this.$route.params.currencyCode;
    },
    currency() {
      return this.currencies[this.currencyCode];
    },
    balance() {
      return this.balances[this.currencyCode];
    },
    balanceAmount() {
      return this.balance && this.currency.format(this.balance.amount);
    }
  },
  watch : {
    currencyCode() {
      Object.assign(this, initialState);
    }
  },
  methods: {
    async onSubmit() {
      let response;
      try {
        response = await createWithdrawal(this.withdrawal);
      } catch (error) {
        this.error = { message: 'Something went wrong' };
      }
      
      if (response.data.code === errorCodes.INVALID_2FA) {
        this.errors.add('code', 'Invalid 2fa code');
      }
    },
  },
};
</script>