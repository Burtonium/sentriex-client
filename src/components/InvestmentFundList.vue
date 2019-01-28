<template>
  <div class="text-left investments">
    <b-table :items="sortedInvestmentFunds"
             :fields="tableFields"
             stacked="md"
             hover
             :tbody-tr-class="'clickable'"
             @row-clicked="navigateToInvestmentFund">
      <template slot="riskLevel" slot-scope="row">
        <span class="capitalize-first" :class="getRiskLevelClass(row.item.riskLevel)">
          {{ row.item.riskLevel }}
        </span>
      </template>
      <template slot="performance" slot-scope="row">
        <span :class="{ 'text-success': row.item.performance > 0,
                        'text-danger': row.item.performance < 0 }">
          {{ row.item.performance }}%
        </span>
      </template>
      <template slot="actions" slot-scope="row">
        <span class="no-wrap">
          <b-btn class="mr-2"
                  variant="outline-primary"
                  size="sm"
                  @click.stop="handleModalOpen($event, row.item)"
                  v-b-modal.subscription-modal>
            Subscribe
          </b-btn>
          <b-btn variant="outline-primary"
                 size="sm"
                 @click.stop="handleModalOpen($event, row.item)"
                 v-b-modal.redemption-modal>
            Redeem
          </b-btn>
        </span>
      </template>
    </b-table>
    <div class="row" v-if="sortedInvestmentFunds.length > perPage">
      <div class="col-md-6 my-1">
        <b-pagination :total-rows="sortedInvestmentFunds.length"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="my-0"/>
      </div>
    </div>
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
      perPage: 10,
      currentPage: 1,
      selectedInvestmentFund: null,
    };
  },
  computed: {
    ...mapGetters(['investmentFunds', 'authenticated']),
    sortedInvestmentFunds() {
      return (this.investmentFunds || []).sort(performanceSort);
    },
    tableFields() {
      return ['name', 'currencyCode', 'shortDescription', 'riskLevel', 'performance', 'actions'];
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
    async navigateToInvestmentFund({ id }) {
      await this.$router.push({ path: `/investment-funds/${id}` });
    },
  },
};
</script>
<style scoped>
.investments {
  margin: 0 15px;
}
</style>
