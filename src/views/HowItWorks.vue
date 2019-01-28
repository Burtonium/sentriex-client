<template>
  <div class="container mb-5 text-left">
    <h2 class="text-primary">
      How does this work?
    </h2>
    <p>
      To use Sentriex.com and invest into our investment funds you will first
      need to sign up for an account. Once you have activated your account by
      verifying your email, you will be able to deposit capital and begin
      investing into our investment funds.
    </p>
    <h4 class="text-primary">
      Subscriptions
    </h4>
    <p>
      A subscription is the process with which you invest in a fund. To subscribe
      to a fund, start by clicking the subscribe button of the investment fund you
      would like to invest in. Then, enter the amount of the digital asset you would
      like to invest. Once you click submit, your subscription will be placed
      in a queue and processed during the next fund Subscription and Redemption
      Window. During this period, you are free to cancel it at any point before approval.
    </p>
    <h4 class="text-primary">
      Redemptions
    </h4>
    <p>
      A redemptions is the process with which you withdraw your digital
      assets from an investment fund. To withdraw from a fund, click the “redeem”
      button and you will enter the amount of the digital asset or % of your
      investment you wish to take out. This will be placed in a queue and processed
      during the next fund Subscription and Redemption Window.
    </p>
    <h4 class="text-primary">
      Subscription and Redemption Windows
    </h4>
    <p>
      These refer to the scheduled timings where capital moves in and/or out of
      an investment fund. Each fund has a different schedule for when they are
      prepared to allow movement in and out. To avoid any ambiguity of fund value
      and having to use a complex valuation policy, during these windows each fund
      will be entirely in the base currency with no open positions.
    </p>
    <h4>
      Redemption Requests
    </h4>
    <p>
      <strong class="text-danger">IMPORTANT: The fund value you submit a redemption
      request at is not the value you will receive</strong>. Rather, it will be
      the future current value and thus can be higher or lower. This is normal
      for investment funds that are not exchange traded and ensures capital
      and profits are fairly disrupted between current investors, new subscriptions
      and redeeming investors.
    </p>
    <template v-if="settings">
      <h4 class="text-primary">
        Fund performance
      </h4>
      <p>
        All funds display net performance factoring the fees out already. Unless
        specified otherwise the performance is split {{ usersCut }} to the investor,
        {{ managersCut }} to the manager, and {{ sitesCut }} to the site. The site
        will use these fees to maintain the site, promote and pay out referral
        payments. Fees will be taken from a fund on a monthly basis or when a
        redemption is made.
      </p>
    </template>
    <h4>
      Referral Program
    </h4>
    <p>
      All users are automatically enrolled in our referral program. Find your
      referral code under your account information. You earn {{ referralCut }}
      of all performance of all users you have referred.
    </p>
    <p class="text-center m-5" v-if="!authenticated">
      <b-btn variant="primary" :to="'/register'" size="lg">Sign Up Today</b-btn>
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
<style lang="scss" scoped>
strong {
  font-weight: 800;
}
h2 {
  color: map-get($theme-colors, primary);
  margin: 30px 0;
}

h4 {
  color: map-get($theme-colors, primary);
  margin: 25px 0;
}

p {
  line-height: 2;
  letter-spacing: 1px;
}
</style>
