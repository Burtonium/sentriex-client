<template>
  <div class="manage-crypto">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-3">
          <currency-nav :create="true"
                        :selected="currencyCode"
                        :currencies="currencies"
                        routeName="crypto-management"/>
        </div>
        <div class="col-md-9 col-lg-8">
          <b-tabs>
            <b-tab title="Information">
              <br>
              <currency-form :currency="currency"/>
            </b-tab>
            <template v-if="currency">
              <b-tab title="Addresses">
                <br>
                <user-addresses-form :currencyCode="currencyCode"/>
              </b-tab>
              <b-tab title="Withdrawals">
                <br>
                <manage-user-withdrawals :currencyCode="currencyCode" />
              </b-tab>
              <b-tab title="Deposits">
                <br>
                <deposit-address-search-form :currencyCode="currencyCode"/>
                <br>
                <deposits-table :currencyCode="currencyCode" />
              </b-tab>
              <b-tab title="Server">
                <br>
                <crypto-server-form :currencyCode="currencyCode"/>
              </b-tab>
            </template>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import CurrencyNav from '@/components/CurrencyNav.vue';
import CurrencyForm from '@/components/CurrencyForm.vue';
import UserAddressesForm from '@/components/UserAddressesForm.vue';
import CryptoServerForm from '@/components/CryptoServerForm.vue';
import ManageUserWithdrawals from '@/components/ManageUserWithdrawals.vue';
import DepositAddressSearchForm from '@/components/DepositAddressSearchForm.vue';
import DepositsTable from '@/components/DepositsTable.vue';

export default {
  name: 'manage-crypto',
  components: {
    CurrencyNav,
    CurrencyForm,
    UserAddressesForm,
    CryptoServerForm,
    ManageUserWithdrawals,
    DepositAddressSearchForm,
    DepositsTable,
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
