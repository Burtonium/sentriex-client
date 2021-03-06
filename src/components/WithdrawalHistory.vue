<template>
  <div class="withdrawal-history">
    <h4 class="text-primary mb-4">
      {{ $t('withdrawals.historyTitle') }}
    </h4>
    <spinner v-if="loading" />
    <p class="text-danger text-center" v-else-if="error">
      {{ $t('error.generalExtended') }}
    </p>
    <b-table
      v-else
      :items="userWithdrawals"
      :fields="withdrawalFields"
      :show-empty="true"
      :empty-text="$t('withdrawals.noWithdrawals')"
      stacked="md"
      :current-page="currentPage"
      :per-page="perPage">
      <template slot="status" slot-scope="row">
        <span :class="statusClasses[row.item.status] || ''">
          {{ statusToWords(row.item.status) }}
        </span>
      </template>
      <template slot="createdAt" slot-scope="row">
        <timeago :datetime="row.item.createdAt" :locale="locale" />
      </template>
      <template slot="actions" slot-scope="row">
        <template v-if="cancelableStatus(row.item.status)">
          <b-btn variant="outline-primary"
                 size="sm"
                 @click="cancelWithdrawal(row.item.id)">
            {{ $t('general.cancel') }}
          </b-btn>
        </template>
      </template>
    </b-table>
    <div class="row" v-if="userWithdrawals.length > perPage">
      <div class="col-md-6 my-1">
        <b-pagination :total-rows="userWithdrawals.length"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="my-0"/>
      </div>
    </div>
  </div>
</template>
<script>
import flatten from 'lodash.flatten';
import { mapActions, mapGetters } from 'vuex';
import { cancelWithdrawal } from '@/api';
import Spinner from '@/components/Spinner.vue';

export default {
  data() {
    return {
      loading: true,
      error: false,
      currentPage: 1,
    };
  },
  components: {
    Spinner,
  },
  props: {
    perPage: {
      required: false,
      default: 10,
    },
  },
  computed: {
    ...mapGetters(['withdrawals', 'currencies', 'locale']),
    currencyCode() {
      return this.$route.params.currencyCode;
    },
    currency() {
      return this.currencies[this.currencyCode];
    },
    userWithdrawals() {
      let withdrawals = [];
      if (!this.currencyCode) {
        withdrawals = flatten(Object.values(this.withdrawals));
      } else {
        withdrawals = this.withdrawals && this.withdrawals[this.currencyCode]
          ? this.withdrawals[this.currencyCode] : [];
      }

      return withdrawals.map((w) => {
        const currency = this.currencies[w.currencyCode];
        return {
          ...w,
          amount: currency.format(w.amount),
          feeAmount: currency.format(w.feeAmount),
        };
      });
    },
    withdrawalFields() {
      return {
        amount: {
          label: this.$t('general.amount'),
        },
        feeAmount: {
          label: this.$t('general.fees'),
        },
        status: {
          label: this.$t('general.status'),
        },
        createdAt: {
          label: this.$t('general.created'),
        },
        actions: {
          label: this.$t('general.actions'),
        },
      };
    },
    statusClasses() {
      return {
        pending: 'text-warning',
        pending_email_verification: 'text-warning',
        approved: 'text-success',
        declined: 'text-danger',
        canceled: 'text-muted',
      };
    },
  },
  watch: {
    currencyCode() {
      this.loadData();
    },
  },
  methods: {
    ...mapActions(['fetchMyWithdrawals', 'fetchBalances']),
    loadData() {
      this.loading = true;
      this.fetchMyWithdrawals(this.currencyCode).finally(() => { this.loading = false; });
    },
    statusToWords(status) {
      const i18nKeys = {
        pending: 'pending',
        declined: 'declined',
        pending_email_verification: 'pendingEmailVerification',
        approved: 'approved',
        canceled: 'canceled',
      };

      return this.$t(`statuses.${i18nKeys[status]}`);
    },
    cancelableStatus(status) {
      return ['pending_email_verification', 'pending'].includes(status);
    },
    async cancelWithdrawal(id) {
      try {
        await cancelWithdrawal(id);
        await Promise.all([
          this.fetchMyWithdrawals(this.currencyCode),
          this.fetchBalances(),
        ]);
      } catch (error) {
        this.error = true;
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
