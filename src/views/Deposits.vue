<template>
  <div class="deposits">
    <div class="row text-left">
      <div class="col-md-2">
        <currency-nav :selected="currencyCode"
                      :currencies="currencies"
                      routeName="deposits"/>
      </div>
      <div class="col-lg-4 mb-4">
        <deposit-addresses :currency="currency"/>
      </div>
      <div class="col-lg-6">
        <deposit-history />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import CurrencyNav from '@/components/CurrencyNav.vue';
import DepositAddresses from '@/components/DepositAddresses.vue';
import DepositHistory from '@/components/DepositHistory.vue';

export default {
  components: {
    CurrencyNav,
    DepositAddresses,
    DepositHistory,
  },
  computed: {
    ...mapGetters(['currencies']),
    currency() {
      return this.currencyCode && this.currencies[this.currencyCode];
    },
    currencyCode() {
      return this.$route.params.currencyCode;
    },
  },
};
</script>
