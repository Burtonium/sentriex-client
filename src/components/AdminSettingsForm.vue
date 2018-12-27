<template>
  <div class="text-left">
    <spinner v-if="loading"/>
    <form @submit.prevent="update" v-else>
      <p class="text-success" v-if="success">
        Settings successfully saved
      </p>
      <h4>Redemption Profit Sharing</h4>
      <br>
      <div class="row">
        <div class="col-md-3 form-group">
          <label>Fund Manager's Redemption Profit Cut</label>
          <input class="form-control"
                 type="number"
                 name="manager_cut"
                 step="0.01"
                 v-validate="'min_value:0|max_value:1|required'"
                 data-vv-as="manager's cut"
                 v-model="settings.fundManagerRedeemProfitPercent"/>
          <div class="text-danger" v-if="errors.first('manager_cut')">
            {{ errors.first('manager_cut') }}
          </div>
        </div>
        <div class="col-md-3">
          <label>Site's Redemption Profit Cut</label>
          <input class="form-control"
                 type="number"
                 name="site_cut"
                 step="0.01"
                 v-validate="'min_value:0|max_value:1|required'"
                 data-vv-as="site's cut"
                 v-model="settings.siteRedeemProfitPercent"/>
          <div class="text-danger" v-if="errors.first('site_cut')">
            {{ errors.first('site_cut') }}
          </div>
        </div>
        <div class="col-md-3">
          <label>Referral's Redemption Profit Cut</label>
          <input class="form-control"
                 type="number"
                 name="referral_cut"
                 step="0.01"
                 v-validate="referralValidation"
                 data-vv-as="referral's cut"
                 v-model="settings.referralRedeemProfitPercent"/>
          <div class="text-info">
            <small>
              This amount is deducted from site's cut when redeeming user was
              referred to the site.
            </small>
          </div>
          <div class="text-danger" v-if="errors.first('referral_cut')">
            {{ errors.first('referral_cut') }}
          </div>
        </div>
        <div class="col-md-3">
          <label>User's Redemption Profit Cut</label>
          <input class="form-control"
                 type="number"
                 name="user_cut"
                 step="0.01"
                 v-validate="'min_value:0|max_value:1|required'"
                 data-vv-as="user's cut"
                 v-model="settings.userRedeemProfitPercent"/>
          <div class="text-danger" v-if="errors.first('user_cut')">
            {{ errors.first('user_cut') }}
          </div>
        </div>
      </div>
      <input type="hidden" :value="totalProfitShare" name="is_one" v-validate="'is:1'"/>
      <p class="text-danger" v-if="errors.first('is_one')">
        Manager, site and users cut must all equal 1.
      </p>
      <h4>Withdrawal Fees</h4>
      <div class="row">
        <div class="col-md-3 form-group">
          <label>Withdrawal Fee Rate</label>
          <input class="form-control"
                 type="number"
                 name="withdrawal_fee_rate"
                 step="0.01"
                 v-validate="'min_value:0|max_value:1|required'"
                 data-vv-as="withdrawal fee rate"
                 v-model="settings.withdrawalFeeRate"/>
          <div class="text-danger" v-if="errors.first('withdrawal_fee_rate')">
            {{ errors.first('withdrawal_fee_rate') }}
          </div>
        </div>
      </div>
      <b-btn variant="primary" type="submit">Save</b-btn>
    </form>
  </div>
</template>
<script>
import Spinner from '@/components/Spinner.vue';
import { fetchSettings, patchSettings } from '@/api';

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      settings: {},
      loading: false,
      error: false,
      success: false,
    };
  },
  computed: {
    referralValidation() {
      return [
        'min_value:0',
        `max_value:${this.settings.siteRedeemProfitPercent}`,
        'required',
      ].join('|');
    },
    totalProfitShare() {
      const siteRedeemProfitPercent = parseFloat(this.settings.siteRedeemProfitPercent);
      const userRedeemProfitPercent = parseFloat(this.settings.userRedeemProfitPercent);
      const fundManagerRedeemProfitPercent = parseFloat(this.settings.fundManagerRedeemProfitPercent);
      return siteRedeemProfitPercent + userRedeemProfitPercent + fundManagerRedeemProfitPercent;
    },
  },
  methods: {
    async loadData() {
      this.loading = true;
      const response = await fetchSettings()
        .catch(() => { this.error = true; })
        .finally(() => { this.loading = false; });

      this.settings = response.data.settings;
    },
    async update() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      this.loading = true;
      const response = await patchSettings(this.settings)
        .catch(() => { this.error = true; })
        .finally(() => { this.loading = false; });
      if (response.data.success) {
        this.success = true;
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
