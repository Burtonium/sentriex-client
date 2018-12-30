<template>
  <div class="investment-funds">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-2">
          <investment-fund-nav :create="canCreate"
                               :selected="investmentFundId"
                               :investmentFunds="myInvestmentFunds"
                               routeName="manage-investment-funds"/>
        </div>
        <div class="col-md-10 col-lg-10">
          <b-tabs>
            <b-tab title="Information" :active="!investmentFund">
              <br>
              <p class="text-warning" v-if="!canCreate && myInvestmentFunds.length === 0">
                You currently do not manage any investment funds. Contact your admin
                to manage investment fund balances.
              </p>
              <investment-fund-form v-else :investment-fund="investmentFund" :canEdit="user.admin"/>
            </b-tab>
            <b-tab title="Balance Updates" v-if="investmentFund">
              <br>
              <investment-fund-balance-form :investmentFund="investmentFund" />
              <br>
              <investment-fund-balance-updates-table :investmentFundId="investmentFund.id" />
            </b-tab>
            <b-tab title="Red/Subs" v-if="investmentFund && user.admin">
              <br>
              <manage-investment-fund-requests :investmentFund="investmentFund" />
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import InvestmentFundForm from '@/components/InvestmentFundForm.vue';
import InvestmentFundBalanceForm from '@/components/InvestmentFundBalanceForm.vue';
import InvestmentFundBalanceUpdatesTable from '@/components/InvestmentFundBalanceUpdatesTable.vue';
import ManageInvestmentFundRequests from '@/components/ManageInvestmentFundRequests.vue';
import InvestmentFundNav from '@/components/InvestmentFundNav.vue';

export default {
  components: {
    InvestmentFundForm,
    InvestmentFundBalanceForm,
    InvestmentFundNav,
    InvestmentFundBalanceUpdatesTable,
    ManageInvestmentFundRequests,
  },
  computed: {
    ...mapGetters(['investmentFunds', 'user']),
    canCreate() {
      return this.user.admin;
    },
    investmentFundId() {
      return this.$route.params.investmentFundId;
    },
    myInvestmentFunds() {
      return this.investmentFunds.filter(fund => this.user.admin || fund.managedBy === this.user.id);
    },
    investmentFund() {
      return this.investmentFunds.find(i => i.id === this.investmentFundId);
    },
  },
};
</script>
