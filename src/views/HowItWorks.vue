<template>
  <div class="container mb-5 text-left howitworks">
    <div class="info-page" v-html="$t('howItWorks', { usersCut, referralCut, managersCut, sitesCut })">
    </div>
    <p class="text-center m-5" v-if="!authenticated">
      <b-btn variant="primary" :to="'/register'" size="lg">
      {{ $t('navbar.register') }}
      </b-btn>
    </p>
    <p class="text-center m-5">
      <img src="../assets/images/logo-blue.png"/>
    </p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { fetchInvestmentFundSettings } from '@/api';

export default {
  data() {
    return {
      settings: null,
    }
  },
  computed: {
    ...mapGetters(['authenticated']),
    usersCut() {
      const cut = this.settings && this.settings.usersCut;
      return this.formatPercent(cut);
    },
    managersCut() {
      const cut = this.settings && this.settings.managersCut;
      return this.formatPercent(cut);
    },
    sitesCut() {
      const cut = this.settings && this.settings.sitesCut;
      return this.formatPercent(cut);
    },
    referralCut() {
      const cut = this.settings && this.settings.referralCut;
      return this.formatPercent(cut);
    }
  },
  methods: {
    formatPercent(x) {
      const percent = (parseFloat(x) * 100).toFixed(2);
      return isNaN(x) ? 'N/A' : `${percent}%`;
    }
  },
  async created() {
    const response = await fetchInvestmentFundSettings();
    if (response.data.success) {
      this.settings = {};
      this.settings.usersCut = response.data.settings.userRedeemProfitPercent;
      this.settings.managersCut = response.data.settings.fundManagerRedeemProfitPercent;
      this.settings.sitesCut = response.data.settings.siteRedeemProfitPercent;
      this.settings.referralCut = response.data.settings.referralRedeemProfitPercent;
    }
  }
}
</script>
