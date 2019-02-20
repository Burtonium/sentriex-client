<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>Status filter</label>
          <select v-model="statusFilter" class="form-control">
            <option value>All</option>
            <option :class="statusClasses[status] || ''" 
                    v-for="status in statuses" 
                    :value="status" 
                    :key="status">
              {{ statusToWords(status) }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label>Username filter</label>
          <input type="text" v-model="userFilter" class="form-control" />
        </div>
      </div>
    </div>
    <spinner v-if="loading" />
    <b-table v-else
             :items="userWithdrawals"
             :fields="withdrawalFields"
             :show-empty="true"
             empty-text="No withdrawals found"
             stacked="lg"
             no-provider-paging
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter">
      <template slot="amount" slot-scope="row">
        {{ currency.format(row.item.amount) }}
      </template>
      <template slot="createdAt" slot-scope="row">
        <timeago :datetime="row.item.createdAt" />
      </template>
      <template slot="status" slot-scope="row">
        <span :class="statusClasses[row.item.status] || ''">
          {{ statusToWords(row.item.status) }}
        </span>
      </template>
      <template slot="showDetails" slot-scope="row">
        <b-btn size="sm" variant="primary" @click.stop="row.toggleDetails">
         {{ row.detailsShowing ? 'Hide' : 'Change'}}
        </b-btn>
      </template>
      <template slot="row-details" slot-scope="row">
        <div class="text-warning text-right" v-if="row.item.refunded">
          User was refunded this withdrawal.
        </div>
        <form class="form-inline withdrawal-update-form">
          <div class="form-group ml-4">
           <label>Status:</label>
            <select v-model="row.item.status"
                  class="form-control form-control-sm ml-2">
              <option :class="statusClasses[status] || ''"
                      v-for="status in mutableStatuses"
                      :value="status"
                      :key="status">
                {{ statusToWords(status) }}
              </option>
            </select>
          </div>
          <div class="form-group ml-4">
            <label>Transaction ID:</label>
            <input class="form-control form-control-sm  ml-2" v-model="row.item.txId"/>
          </div>
          <div class="form-group ml-4">
            <b-btn variant="primary"
                   size="sm"
                   @click="updateWithdrawal(row.item)">
              Update
            </b-btn>
          </div>
        </form>
        <p class="text-warning float-right mt-2"
          v-if="refundableStatus(row.item.status) && !row.item.refunded">
          User will be refunded {{ currency.format(row.item.totalAmount) }}
        </p>
        <p class="text-danger" v-if="errors.first(row.item.vId)">
          {{ errors.first(row.item.vId) }}
        </p>
      </template>
    </b-table>
    <div class="row">
      <div class="col-md-6 my-1">
        <b-pagination :total-rows="userWithdrawals.length" :per-page="perPage" v-model="currentPage" class="my-0" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Spinner.vue';
import omit from 'lodash.omit';
import { updateWithdrawal } from '@/api';
import { snakeCaseToCapitalized } from '@/utils';

export default {
  data() {
    return {
      statusFilter: 'pending',
      userFilter: '',
      loading: false,
      perPage: 10,
      currentPage: 1,
      filter: '',
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
      const withdrawals = this.withdrawals && this.withdrawals[this.currencyCode] || [];
      return withdrawals
        .map(w => ({
          ...omit(w, ['user']),
          username: w.user && w.user.username,
          totalAmount: parseFloat(w.amount) + parseFloat(w.feeAmount),
          vId: `withdrawal_${w.id}`,
          _showDetails: false,
        }))
        .filter(w => !this.statusFilter || w.status === this.statusFilter)
        .filter(w => !this.userFilter || w.username.toLowerCase().match(this.userFilter.toLowerCase()));
    },
    withdrawalFields() {
      return {
        username: {
          label: 'User',
        },
        amount: {
          label: 'Amount',
        },
        feeAmount: {},
        address: {
          label: 'Address',
        },
        status: {
          label: 'Status',
        },
        createdAt: {
          label: 'Created',
        },
        showDetails: {
          label: '',
        },
      };
    },
    statuses() {
      return Object.keys(this.statusClasses);
    },
    mutableStatuses() {
      return this.statuses
        .filter(s => !['pending_email_verification'].includes(s));
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
    ...mapActions(['fetchWithdrawals']),
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
    loadData() {
      this.loading = true;
      this.fetchWithdrawals(this.currencyCode).finally(() => { this.loading = false; });
    },
    refundableStatus(status) {
      return status === 'declined';
    },
    async updateWithdrawal({
      id, status, txId, vId,
    }) {
      try {
        await updateWithdrawal({ id, status, txId });
        await this.fetchWithdrawals(this.currencyCode);
      } catch (error) {
        this.errors.add({ field: vId, msg: this.$t('error.general') });
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
<style scoped>
.b-table-details {
  margin-top:-5px;
}
.withdrawal-update-form {
  display: flex;
  justify-content: flex-end;
}
</style>
