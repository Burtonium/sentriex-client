<template>
  <div class="card">
    <div class="card-body" v-if="investmentFund">
      <div class="row">
        <div class="col-md-8">
          <h2>
            {{ investmentFund.name }}
          </h2>
          <h6>
            <small class="text-muted">
              {{ investmentFund.shortDescription }} <br>
              Created <timeago :datetime="investmentFund.createdAt"></timeago>
            </small>
          </h6>
        </div>
        <div class="col-md-4">
          <div class="currency">
            {{ investmentFund.currencyCode }}
          </div>
          <div>
            <span :class="{ 'text-success': investmentFund.monthlyPerformance > 0,
                            'text-danger': investmentFund.monthlyPerformance < 0 }">
              {{ investmentFund.monthlyPerformance }}%
            </span>
            <icon name="play" v-if="investmentFund.monthlyPerformance !== 0"
                  :class="{ 'arrow-up': investmentFund.monthlyPerformance > 0,
                            'arrow-down': investmentFund.monthlyPerformance < 0 }"/>
            (monthly)
          </div>
          <div>
            Risk level:
            <span :class="getRiskLevelClass(investmentFund.riskLevel)">
              {{ investmentFund.riskLevel }}
            </span>
          </div>
        </div>
      </div>
      <br>
      <b-tabs>
        <b-tab title="Summary" active>
          <br>
          <h4>Summary</h4>
          <p>{{ investmentFund.detailedDescription || 'N/A' }}</p>
        </b-tab>
        <b-tab title="Performance" active>
          <br>Performance metrics coming soon
        </b-tab>
        <b-tab title="Manager">
          <br>
          <p>
            Contact:
            <a :href="`mailto:${investmentFund.creator.email}`">
              {{ investmentFund.creator.email }}
              </a><br>
            Member since <timeago :datetime="investmentFund.creator.createdAt"/>
          </p>
        </b-tab>
      </b-tabs>
      <br>
      <div class="float-right">
        <b-btn variant="primary mr-2" @click="handleModalOpen($event)" v-b-modal.subscription-modal>Subscribe</b-btn>
        <b-btn variant="primary" @click="handleModalOpen($event)" v-b-modal.redemption-modal>Redeem</b-btn>
      </div>
    </div>
    <div class="modals" v-if="authenticated">
      <subscription-modal modalId="subscription-modal" 
                          :investmentFund="investmentFund"/>
      <redemption-modal modalId="redemption-modal"
                        :investmentFund="investmentFund"/>
    </div>
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
  props: ['investmentFund'],
  computed: {
    ...mapGetters(['authenticated']),
  },
  methods: {
    handleModalOpen(evt) {
      if (!this.authenticated) {
        evt.preventDefault();
        this.$router.push('/login');
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
  },
};
</script>
<style lang="scss" scoped>
.card {
  box-shadow: 3px 3px 3px #aaa;
}
.arrow-up {
  transform: rotate(270deg);
  color: map-get($theme-colors, success);
}

.arrow-down {
  transform: rotate(90deg);
  color: map-get($theme-colors, danger);
}
</style>
