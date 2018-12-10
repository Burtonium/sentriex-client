<template>
  <div class="text-left investments">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Short Description</th>
          <th>Risk Level</th>
          <th>Performance</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="investmentFund in investmentFunds"
            :key="investmentFund.id"
            class="clickable"
            @click="navigateToInvestmentFund(investmentFund.id)">
          <td>
            {{ investmentFund.name }}
          </td>
          <td>{{ investmentFund.shortDescription }}</td>
          <td>
            <div class="capitalize-first" :class="getRiskLevelClass(investmentFund.riskLevel)">
              {{ investmentFund.riskLevel }}
            </div>
          </td>
          <td :class="{ 'text-success': investmentFund.monthlyPerformance > 0,
                        'text-danger': investmentFund.monthlyPerformance < 0 }">
            {{ investmentFund.monthlyPerformance }}%
          </td>
          <td class="no-wrap">
            <button class="btn btn-sm btn-outline-primary mr-2"
                    @click.stop="selectedInvestmentFund = investmentFund"
                    v-b-modal.subscription-modal>
              Subscribe
            </button>
            <button class="btn btn-sm btn-outline-primary"
                    @click.stop="selectedInvestmentFund = investmentFund"
                    v-b-modal.redemption-modal>Redeem</button>
          </td>
        </tr>
      </tbody>
    </table>
    <subscription-modal modalId="subscription-modal"
                        :investmentFund="selectedInvestmentFund"/>
    <redemption-modal modalId="redemption-modal"
                      :investmentFund="selectedInvestmentFund"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SubscriptionModal from './SubscriptionModal.vue';
import RedemptionModal from './RedemptionModal.vue';


export default {
  components: {
    SubscriptionModal,
    RedemptionModal,
  },
  data() {
    return {
      selectedInvestmentFund: null,
    };
  },
  computed: {
    ...mapGetters(['investmentFunds']),
  },
  methods: {
    getRiskLevelClass(riskLevel) {
      let classes = '';
      if (riskLevel === 'high') {
        classes += 'text-danger';
      } else if (riskLevel === 'medium') {
        classes += 'text-warning';
      } else if (riskLevel === 'low') {
        classes += 'text-info';
      }
      return classes;
    },
    async navigateToInvestmentFund(id) {
      await this.$router.push({ path: `/investment-funds/${id}` });
    },
  },
};
</script>
<style scoped>
.investments {
  margin: 0 auto;
}
</style>
