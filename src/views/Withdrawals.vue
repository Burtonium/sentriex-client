<template>
  <div class="withdrawals">
    <div class="row text-left">
      <div class="col-md-2">
        <currency-nav :selected="currencyCode" :currencies="currencies" routeName="withdrawals" />
      </div>
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body text-center">
            <withdrawal-form @withdrawal="handleWithdrawal" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <withdrawal-history />
      </div>
    </div>
    <b-modal centered title="Email Verification" v-model="showVerificationModal">
      <div>As a security measure we've sent you an email to confirm your request.</div>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="showVerificationModal=false">
          OK
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CurrencyNav from '@/components/CurrencyNav.vue';
import WithdrawalForm from '@/components/WithdrawalForm.vue';
import WithdrawalHistory from '@/components/WithdrawalHistory.vue';

export default {
  data() {
    return {
      showVerificationModal: false,
    };
  },
  components: {
    CurrencyNav,
    WithdrawalForm,
    WithdrawalHistory,
  },
  computed: {
    ...mapGetters(['currencies']),
    currencyCode() {
      return this.$route.params.currencyCode;
    },
  },
  methods: {
    handleWithdrawal(withdrawal) {
      if (withdrawal.status === 'pending_email_verification') {
        this.showVerificationModal = true;
      }
    },
  },
};
</script>
