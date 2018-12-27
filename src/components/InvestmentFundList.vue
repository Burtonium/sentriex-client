<template>
  <div class="text-left investments">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Currency</th>
          <th>Short Description</th>
          <th>Risk Level</th>
          <th>Performance</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="investmentFund in sortedInvestmentFunds"
            :key="investmentFund.id"
            class="clickable"
            @click="navigateToInvestmentFund(investmentFund.id)">
          <td>
            {{ investmentFund.name }}
          </td>
          <td>
            {{ investmentFund.currencyCode }}
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
                    @click.stop="handleModalOpen($event, investmentFund)"
                    v-b-modal.subscription-modal>
              Subscribe
            </button>
            <button class="btn btn-sm btn-outline-primary"
                    @click.stop="handleModalOpen($event, investmentFund)"
                    v-b-modal.redemption-modal>Redeem</button>
          </td>
        </tr>
      </tbody>
    </table>
    <subscription-modal modalId="subscription-modal"
                        :investmentFund="selectedInvestmentFund"
                        v-if="authenticated"/>
    <redemption-modal modalId="redemption-modal"
                      :investmentFund="selectedInvestmentFund"
                      v-if="authenticated"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SubscriptionModal from './SubscriptionModal.vue';
import RedemptionModal from './RedemptionModal.vue';

const performanceSort = (a, b) => parseFloat(b.monthlyPerformance) - parseFloat(a.monthlyPerformance);

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
    ...mapGetters(['investmentFunds', 'authenticated']),
    sortedInvestmentFunds() {
      return (this.investmentFunds || []).sort(performanceSort);
    },
  },
  methods: {
    handleModalOpen(evt, investmentFund) {
      if (!this.authenticated) {
        evt.preventDefault();
        this.$router.push('/login');
      } else {
        this.selectedInvestmentFund = investmentFund;
      }
    },
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
