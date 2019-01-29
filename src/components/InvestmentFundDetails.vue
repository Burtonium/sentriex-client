<template>
  <div class="card">
    <div class="card-body" v-if="investmentFund">
      <div class="row">
        <div class="col-md-8">
          <h3 class="text-primary">
            {{ investmentFund.name }}
          </h3>
          <h6>
            <small class="text-muted">
              {{ investmentFund.shortDescription }}
            </small>
          </h6>
        </div>
        <div class="col-md-4">
          <div class="currency">
            {{ investmentFund.currencyCode }}
          </div>
          <div>
            <span :class="{ 'text-success': investmentFund.performance > 0,
                            'text-danger': investmentFund.performance < 0 }">
              {{ investmentFund.performance }}%
            </span>
            <icon name="play"
                  :class="{ 'arrow-up': investmentFund.performance >= 0,
                            'arrow-down': investmentFund.performance < 0 }"/>
          </div>
          <div>
            Risk level:
            <span :class="getRiskLevelClass(investmentFund.riskLevel)">
              {{ investmentFund.riskLevel }}
            </span>
          </div>
          <div v-if="investmentFund.redemptionWaitTime">
            <p>
              Redemption Delay: <span class="text-warning">{{ redemptionWaitTime }} days</span>
            </p>
          </div>
          <div v-if="investmentFund.balanceUpdateStrategy === 'apr'">
            <p>
              Fixed Annual Percent:
              <span class="text-primary">{{ investmentFund.annualPercentageRate }}%</span>
            </p>
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
        <b-tab title="Manager" v-if="fundManager">
          <br>
          <p>
            Manager:
            <span class="text-primary">
              {{ fundManager.username }}
            </span>
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

const DAY = 24 * 60 * 60;

export default {
  components: {
    SubscriptionModal,
    RedemptionModal,
  },
  props: ['investmentFund'],
  computed: {
    ...mapGetters(['authenticated']),
    fundManager() {
      return this.investmentFund.manager || this.investmentFund.creator;
    },
    redemptionWaitTime() {
      const wait = this.investmentFund.redemptionWaitTime;
      return wait && (wait / DAY);
    },
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
