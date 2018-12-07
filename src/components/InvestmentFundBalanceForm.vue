<template>
  <div class="">
    <div class="preview">
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
import { mapActions } from 'vuex';
import { updateFundBalance } from '@/api';

export default {
  data() {
    return {
      balance: this.investmentFund.balance,
    };
  },
  props: {
    investmentFund: {
      type: Object,
      required: false,
      default: () => ({}),
    }
  },
  computed: {
    deltaBalance() {
      return this.balance - parseFloat(this.investmentFund.balance);
    },
  },
  methods: {
    ...mapActions(['fetchInvestmentFunds']),
    async updateBalance() {
      await updateFundBalance({ id: this.investmentFund.id, amount: this.balance });
      await this.fetchInvestmentFunds();
    },
  },
};
</script>