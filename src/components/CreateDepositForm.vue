<template>
  <div>
    <label>Create Deposit</label>
    <br>
    <form class="form-inline" @submit.prevent.stop="createDeposit">
      <div class="form-group">
        <div class="input-group">
          <input class="form-control amount-input"
                 name="amount"
                 v-model="amount"
                 type="number"
                 min="0"
                 @input="error = false; success = false"
                 required>
          <div class="input-group-append">
            <span class="input-group-text" id="currencyCode">
              {{ depositAddress.currencyCode }}
            </span>
          </div>
        </div>
        <label class="ml-4">Tx id:</label>
        <input class="form-control ml-2 txid-input"
               v-model="txId"
               @input="error = false; success = false">
        <b-btn class="ml-2" variant="primary" type="submit"
               @click="error = false; success = false">
          Create
        </b-btn>
      </div>
    </form>
    <div class="mt-2">
      <p class="text-danger" v-if="error">
        {{ errorMsg }}
      </p>
      <p class="text-success" v-else-if="success">
        Deposit successfully created.
      </p>
      <p class="text-warning" v-else-if="amount">
        {{ amount }} {{ depositAddress.currencyCode }} will be credited the user's balance.
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { createDeposit, errorCodes } from '@/api';

const initialState = {
  success: false,
  error: false,
  amount: null,
  txId: null,
};

export default {
  data() {
    return {
      ...initialState,
    };
  },
  props: {
    depositAddress: {
      required: true,
      type: Object,
    },
  },
  watch: {
    depositAddress() {
      Object.assign(this, initialState);
    },
  },
  computed: {
    errorMsg() {
      return (this.error && this.error.message) || 'Something went wrong hassle a programmer';
    },
    currencyCode() {
      return this.$route.params.currencyCode;
    },
  },
  methods: {
    ...mapActions(['fetchDeposits']),
    async createDeposit() {
      let response;
      try {
        response = await createDeposit({
          txId: this.txId,
          amount: this.amount,
          currencyCode: this.depositAddress.currencyCode,
          userId: this.depositAddress.user.id,
          userAddressId: this.depositAddress.id,
        });

        this.success = response.data.success;
      } catch (error) {
        this.error = error;
      }
      if (response.data.code === errorCodes.DEPOSIT_ALREADY_EXISTS) {
        this.error = { message: 'A deposit was found with that transaction id.' };
      }

      await this.fetchDeposits(this.depositAddress.currencyCode);
    },
  },
};
</script>
<style scoped>
.amount-input {
  width: 100px;
}

.txid-input {
  width: 400px;
}
</style>
