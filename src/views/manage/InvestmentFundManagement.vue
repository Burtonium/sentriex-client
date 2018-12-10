<template>
  <div class="investment-funds">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-3">
          <investment-fund-nav :create="true"
                               :selected="investmentFundId"
                               :investmentFunds="myInvestmentFunds"
                               routeName="manage-investment-funds"/>
        </div>
        <div class="col-md-9 col-lg-8">
          <b-tabs>
            <b-tab title="Information" :active="!investmentFund">
              <br>
              <investment-fund-form :investment-fund="investmentFund"/>
            </b-tab>
            <b-tab title="Balance Updates" v-if="investmentFund">
              <br>
              <investment-fund-balance-form :investmentFund="investmentFund" />
              <br>
              <investment-fund-balance-updates-table :investmentFundId="investmentFund.id" />
            </b-tab>
            <b-tab title="Red/Subs" v-if="investmentFund">
              <br>
              Coming soon
            </b-tab>
            <b-tab title="Withdraw/Deposit" v-if="investmentFund">
              <br>
              Coming soon
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
import InvestmentFundNav from '@/components/InvestmentFundNav.vue';

export default {
  components: {
    InvestmentFundForm,
    InvestmentFundBalanceForm,
    InvestmentFundNav,
    InvestmentFundBalanceUpdatesTable,
  },
  computed: {
    ...mapGetters(['investmentFunds', 'user']),
    investmentFundId() {
      return this.$route.params.investmentFundId;
    },
    myInvestmentFunds() {
      return this.investmentFunds.filter(fund => fund.creatorId === this.user.id);
    },
    investmentFund() {
      return this.investmentFunds.find(i => i.id === this.investmentFundId);
    },
  },
};
</script>
