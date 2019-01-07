<template>
  <div class="withdrawal-history">
    <h4 class="text-primary mb-4">
      Withdrawals
    </h4>
    <spinner v-if="loading" />
    <p class="text-danger text-center" v-else-if="error">
      Something went wrong when canceling a withdrawal.
      Notify support for further assistance.
    </p>
    <b-table
      v-else
      :items="userWithdrawals"
      :fields="withdrawalFields"
      :show-empty="true"
      empty-text="You have no withdrawals yet"
      stacked="md">
      <template slot="status" slot-scope="row">
        <span :class="statusClasses[row.item.status] || ''">
          {{ statusToWords(row.item.status) }}
        </span>
      </template>
      <template slot="createdAt" slot-scope="row">
        <timeago :datetime="row.item.createdAt" />
      </template>
      <template slot="actions" slot-scope="row">
        <template v-if="cancelableStatus(row.item.status)">
          <b-btn variant="outline-primary"
                 size="sm"
                 @click="cancelWithdrawal(row.item.id)">
            Cancel
          </b-btn>
        </template>
      </template>
    </b-table>
  </div>
</template>
<script>
import flatten from 'lodash.flatten';
import { mapActions, mapGetters } from 'vuex';
import { cancelWithdrawal } from '@/api';
import Spinner from '@/components/Spinner.vue';
import { snakeCaseToCapitalized } from '@/utils';

export default {
  data() {
    return {
      loading: true,
      error: false,
    };
  },
  components: {
    Spinner,
  },
  computed: {
    ...mapGetters(['withdrawals', 'currencies']),
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
        withdrawals = this.withdrawals ? this.withdrawals[this.currencyCode] : [];
      }

      return withdrawals.map(w => {
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
          label: 'Amount',
        },
        feeAmount: {
          label: 'Fees',
        },
        status: {
          label: 'Status',
        },
        createdAt: {
          label: 'Created',
        },
        actions: {},
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
      return snakeCaseToCapitalized(status);
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
