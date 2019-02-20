<template>
  <div>
    <div class="text-left">
      <b-alert variant="warning" dismissible :show="!account.twofa">
        {{ $t('account.twoFaWarning') }}
      </b-alert>
      <div class="row mb-2">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-primary">
              <div class="card-icon">
                <icon name="info-circle"/>
              </div>
              <span>{{ $t('account.accountInfo') }}</span>
            </div>
            <div class="card-body">
              <p class="card-text text-bold">
                {{ $t('general.email') }}: {{ account.email }} 
                <span class="badge badge-primary">
                  {{ $t('verifications.unverified') }}
                </span>
                <br>
                {{ $t('general.created') }}: <timeago :datetime="account.createdAt" :locale="locale"></timeago>
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
                <span>{{ $t('account.accountInfoTitle') }}</span>
              </div>
            <div class="card-body">
              <div class="card-text text-bold pr-5">
                {{ $t('account.security') }}:
                <b-button size="sm"
                          variant="success"
                          v-show="!account.twofa"
                          v-b-modal.enable-two-fa>
                  {{ $t('general.enable') }}:
                </b-button>
                <b-button size="sm"
                          variant="danger"
                          v-show="account.twofa"
                          v-b-modal.disable-two-fa>
                  {{ $t('general.disable') }}
                </b-button>
                <br>
                {{ $t('general.password') }}:
                <b-button variant="primary" size="sm" @click="sendReset">
                  {{ $t('general.reset') }}
                </b-button>
                <div class="text-success" v-if="success">
                  {{ $t('success.passwordReset') }}
                </div>
                <div class="text-danger" v-if="error">
                  {{ $t('error.general') }}
                </div>
              </div>
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
                <span>{{ $t('account.referralTitle') }}</span>
              </div>
            <div class="card-body">
              <p class="card-text text-bold pr-5">
                {{ $t('account.yourReferralLink') }}: <br/> {{ referralLink }}
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
import { sendResetEmail } from '@/api';
import EnableTwoFaModal from './EnableTwoFaModal.vue';
import DisableTwoFaModal from './DisableTwoFaModal.vue';

export default {
  data() {
    return {
      success: false,
      error: false,
      email: '',
    };
  },
  components: {
    EnableTwoFaModal,
    DisableTwoFaModal,
  },
  computed: {
    ...mapGetters(['account', 'locale']),
    referralLink() {
      const siteUrl = process.env.VUE_APP_SITE_URL || 'http://localhost';
      const { referralCode } = this.account;
      return `${siteUrl}/register?referralCode=${referralCode}`;
    },
  },
  methods: {
    async sendReset() {
      const response = await sendResetEmail(this.account.email)
        .catch(() => { this.error = true; });
      if (response && response.data.success) {
        this.success = true;
      }
    },
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
