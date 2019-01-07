<template>
  <div class="deposit-addresses">
  <div class="card">
    <div class="card-body text-center">
      <template v-if="depositAddress">
        <p class="">
          Your {{ currency.label }} ({{ currency.code }}) address:
        </p>
        <div class="text-primary mb-2 no-wrap">
          {{ depositAddress }}
        </div>
        <p class="text-danger">
          <strong>
            Make sure you are sending {{ currency.code }} to this address.
            Sending any other coin or token may result in the loss of your deposit.
          </strong>
        </p>
      </template>
      <template v-else-if="error">
        <p class="card-text text-danger">
          Something went wrong with generating an address. Please contact support.
        </p>
      </template>
      <template v-else>
        <p class="card-text">
          You have no deposit address for {{ currency.label }}
          ({{ currency.code }}).
        </p>
        <b-btn variant="primary" @click="generateAddress">Generate</b-btn>
      </template>
    </div>
  </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { generateDepositAddress } from '@/api';

export default {
  data() {
    return {
      error: false,
    };
  },
  computed: {
    ...mapGetters(['depositAddresses']),
    depositAddress() {
      const d = this.depositAddresses[this.currency.code];
      return d && d.address;
    },
  },
  props: {
    currency: {
      type: Object,
      required: true,
    },
  },
  watch: {
    currency() {
      this.error = false;
    },
  },
  methods: {
    ...mapActions(['fetchDepositAddresses']),
    async generateAddress() {
      try {
        await generateDepositAddress(this.currency.code);
      } catch (error) {
        this.error = true;
      }
      await this.fetchDepositAddresses();
    },
  },
};
</script>
<style scoped>
.card {
  margin: 0 auto;
  max-width: 380px;
  font-size: 14px;
}

@media (max-width: 1200px) {
  .card {
    font-size: 12px;
  }
}
</style>
