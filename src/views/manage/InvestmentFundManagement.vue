<template>
  <div class="investment-funds">
    <div class="wrapper mt-5">
      <div class="row text-left">
        <div class="col-md-3">
          <router-link @click="infoTab.active = true"
                       tag="div" 
                       :to="{ name: 'manage-investment-funds' }" 
                       class="clickable investment-fund-nav-button"
                       :class="{ 'selected': !investmentFundId }">
            Create
          </router-link>
          <investment-fund-nav 
          :selected="investmentFundId" 
          :investmentFunds="myInvestmentFunds" routeName="manage-investment-funds"/>
        </div>
        <div class="col-md-6">
          <b-tabs>
            <b-tab title="Information" :active="!investmentFund">
              <br>
              <investment-fund-form :investment-fund="investmentFund"/>
            </b-tab>
            <b-tab title="Balance Updates" v-if="investmentFund">
              <br>
              <investment-fund-balance-form :investmentFund="investmentFund" />
            </b-tab>
            <b-tab title="Redemptions/Subscriptions" v-if="investmentFund">
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
import InvestmentFundNav from '@/components/InvestmentFundNav.vue';

export default {
  components: {
    InvestmentFundForm,
    InvestmentFundBalanceForm,
    InvestmentFundNav,
  },
  computed: {
    ...mapGetters(['investmentFunds', 'user']),
    investmentFundId() {
      return this.$route.params.investmentFundId;
    },
    myInvestmentFunds() {
      return this.investmentFunds.filter(investmentFund => investmentFund.creatorId === this.user.id);
    },
    investmentFund() {
      return this.investmentFunds.find(i => i.id === this.investmentFundId);
    },
  },
};
</script>
