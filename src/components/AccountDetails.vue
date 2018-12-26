<template>
  <div>
    <div class="wrapper text-left mt-3">
      <b-alert variant="warning" dismissible :show="!account.twofa">
        Your account security would greatly benefit from two factor authentication.
        Please enable it immediately.
      </b-alert>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-primary">
              <div class="card-icon">
                <icon name="info-circle"/>
              </div>
              <span>Account Info</span>
            </div>
            <div class="card-body">
              <p class="card-text text-bold">
                Email: {{ account.email }} <span class="badge badge-primary">Unverified</span><br>
                Created: <timeago :datetime="account.createdAt"></timeago>
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header  bg-primary">
              <div class="card-icon">
                <icon name="key"/>
                </div>
                <span>Security</span>
              </div>
            <div class="card-body">
              <p class="card-text text-bold pr-5">
                Two Factor Authentication:
                <b-button size="sm"
                          variant="success"
                          v-show="!account.twofa"
                          v-b-modal.enable-two-fa>
                  Enable
                </b-button>
                <b-button size="sm"
                          variant="danger"
                          v-show="account.twofa"
                          v-b-modal.disable-two-fa>
                  Disable
                </b-button>
                <br>
                Password:
                <b-button variant="primary" size="sm">
                  Reset
                </b-button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header  bg-primary">
              <div class="card-icon">
                <icon name="user-friends"/>
                </div>
                <span>Referral Link</span>
              </div>
            <div class="card-body">
              <p class="card-text text-bold pr-5">
                Your referral link: <br> {{ referralLink }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <enable-two-fa-modal modalId="enable-two-fa" @2faEnabled="account.twofa = true"/>
    <disable-two-fa-modal modalId="disable-two-fa" @2faDisabled="account.twofa = false"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import EnableTwoFaModal from './EnableTwoFaModal.vue';
import DisableTwoFaModal from './DisableTwoFaModal.vue';

export default {
  components: {
    EnableTwoFaModal,
    DisableTwoFaModal,
  },
  computed: {
    ...mapGetters(['account']),
    referralLink() {
      const siteUrl = process.env.VUE_APP_SITE_URL || 'http://localhost';
      const { referralCode } = this.account;
      return `${siteUrl}/register?referralCode=${referralCode}`;
    }
  },
};
</script>
<style lang="scss" scoped>
.card-title {
  color: map-get($theme-colors, tertiary);
}
.card .bg-primary {
  color: white;
}
.card {
  line-height: 1.8;
}
.card-icon {
  position: relative;
  top:-2px;
  display:inline-block;
  padding-right: 8px;
}
</style>
