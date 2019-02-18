<template>
  <div class="deposit-addresses">
  <div class="card">
    <div class="card-body text-center">
      <template v-if="depositAddress">
        <p>
          {{ $t('deposits.yourAddress', { currency: fullLabel })}}:
        </p>
        <div class="text-primary mb-2 no-wrap">
          {{ depositAddress }}
        </div>
        <p class="text-danger">
          <strong>
            {{ $t('deposits.depositWarning', { currencyCode: currency.code })}}:
          </strong>
        </p>
      </template>
      <template v-else-if="error">
        <p class="card-text text-danger">
          {{ $t('deposits.generationError') }}
        </p>
      </template>
      <template v-else>
        <p class="card-text">
          {{ $t('deposits.noAddressWarning', { currency: fullLabel })}}:
        </p>
        <b-btn variant="primary" @click="generateAddress">
          {{ $t('general.generate') }}
        </b-btn>
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
    fullLabel() {
      return `${this.currency.label} (${this.currency.code})`;
    }
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
