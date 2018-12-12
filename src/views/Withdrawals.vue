<template>
  <div class="withdrawals">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-2">
          <currency-nav :selected="currencyCode"
                        :currencies="currencies"
                        routeName="withdrawals"/>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <withdrawal-form />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import CurrencyNav from '@/components/CurrencyNav.vue';
import WithdrawalForm from '@/components/WithdrawalForm';

export default {
  components: {
    CurrencyNav,
    WithdrawalForm,
  },
  computed: {
    ...mapGetters(['currencies']),
    currencyCode() {
      return this.$route.params.currencyCode;
    },
  },
};
</script>
