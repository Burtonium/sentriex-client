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
                 v-validate="'min_value:0|max_value:1'"
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
                 v-validate="'min_value:0|max_value:1'"
                 data-vv-as="site's cut"
                 v-model="settings.siteRedeemProfitPercent"/>
          <div class="text-danger" v-if="errors.first('site_cut')">
            {{ errors.first('site_cut') }}
          </div>
        </div>
        <div class="col-md-3">
          <label>User's Redemption Profit Cut</label>
          <input class="form-control"
                 type="number" 
                 name="user_cut" 
                 step="0.01" 
                 v-validate="'min_value:0|max_value:1'"
                 data-vv-as="user's cut"
                 v-model="settings.userRedeemProfitPercent"/>
          <div class="text-danger" v-if="errors.first('user_cut')">
            {{ errors.first('user_cut') }}
          </div>
        </div>
      </div>
      <h4>Withdrawal Fees</h4>
      <div class="row">
        <div class="col-md-3 form-group">
          <label>Withdrawal Fee Rate</label>
          <input class="form-control"
                 type="number" 
                 name="withdrawal_fee_rate" 
                 step="0.01" 
                 v-validate="'min_value:0|max_value:1'"
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
  methods: {
    async loadData() {
      this.loading = true;
      const response = await fetchSettings()
        .catch(() => { this.error = true; })
        .finally(() => { this.loading = false; });
        
      this.settings = response.data.settings;
    },
    async update() {
      this.loading = true;
      const response = await patchSettings(this.settings)
        .catch(() => { this.error = true; })
        .finally(() => { this.loading = false; });
      if (response.data.success) {
        this.success = true;
      }
    }
  },
  created() {
    this.loadData();
  },
};
</script>