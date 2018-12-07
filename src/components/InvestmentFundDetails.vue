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
            12.5% <icon name="play" class="arrow-up"/> weekly
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
        <b-tab title="History">
          <br>
          History here
        </b-tab>
      </b-tabs>
      <br>
      <div class="float-right">
        <b-btn variant="primary mr-2" v-b-modal.subscription-modal>Subscribe</b-btn>
        <b-btn variant="primary" v-b-modal.redemption-modal>Redeem</b-btn>
      </div>
    </div>
    <subscription-modal modalId="subscription-modal" :investmentFund="investmentFund" />
    <redemption-modal modalId="redemption-modal" :investmentFund="investmentFund" />
  </div>
</template>
<script>
import SubscriptionModal from './SubscriptionModal.vue';
import RedemptionModal from './RedemptionModal.vue';

export default {
  components: {
    SubscriptionModal,
    RedemptionModal,
  },
  props: ['investmentFund'],
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
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/bootstrap-override.scss';
.card {
  box-shadow: 3px 3px 3px #aaa;
}
.arrow-up {
  transform: rotate(270deg);
  color: map-get($theme-colors, success);
}

.arrow-down {
  transform: rotate(270deg);
  color: map-get($theme-colors, danger);
}
</style>
