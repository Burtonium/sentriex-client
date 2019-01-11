<template>
  <div>
    <div class="row">
     <div class="col-md-4">
        <div class="form-group">
          <label>Request Type</label>
          <select v-model="typeFilter" class="form-control">
            <option value>All</option>
            <option value="redemption">
              Redemption
            </option>
            <option value="subscription">
              Subscription
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label>Status filter</label>
          <select v-model="statusFilter" class="form-control">
            <option value="all">All</option>
            <option :class="statusClasses[status] || ''" v-for="status in statuses" :value="status">
              {{ statusToWords({ status }) }}
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
             :items="investmentFundRequests"
             :fields="requestFields"
             :show-empty="true"
             empty-text="No requests found"
             stacked="lg"
             no-provider-paging
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter">
      <template slot="createdAt" slot-scope="row">
        <timeago :datetime="row.item.createdAt" />
      </template>
      <template slot="siteFees" slot-scope="row">
        <template v-if="row.item.cancelable">
          N/A
        </template>
        <template v-else>
          {{ row.item.siteFees }}
        </template>
      </template>
      <template slot="profitShare" slot-scope="row">
        <template v-if="row.item.cancelable">
          N/A
        </template>
        <template v-else>
          {{ row.item.profitShare }}
        </template>
      </template>
      <template slot="status" slot-scope="row">
        <template v-if="sufficientFunds(row.item)">
          <span :class="row.item.statusClass">
            {{ statusToWords(row.item) }}
          </span>
        </template>
        <template v-else>
          <span class="text-danger">
            Insufficient Funds
          </span>
        </template>
      </template>
      <template slot="actions" slot-scope="row">
        <div class="no-wrap">
          <b-btn v-if="row.item.cancelable"
                 variant="danger"
                 size="sm"
                 @click="updateRequest({ id: row.item.id, status: 'declined' })">
            Decline
          </b-btn>
          <b-btn class="ml-1"
                 v-if="row.item.cancelable"
                 variant="primary"
                 size="sm"
                 :disabled="!sufficientFunds(row.item)"
                 @click="updateRequest({ id: row.item.id, status: 'approved' })">
            Approve
          </b-btn>
        </div>
      </template>
    </b-table>
    <div class="row">
      <div class="col-md-6 my-1">
        <b-pagination :total-rows="requests.length" :per-page="perPage" v-model="currentPage" class="my-0" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Spinner.vue';
import { updateInvestmentFundRequest, fetchAllInvestmentFundRequests } from '@/api';
import { snakeCaseToCapitalized, daysFromNow } from '@/utils';
const DAY = 24 * 60 * 60;
export default {
  data() {
    return {
      error: false,
      statusFilter: 'all',
      userFilter: '',
      typeFilter: '',
      loading: false,
      perPage: 10,
      currentPage: 1,
      filter: '',
      requests: [],
    };
  },
  props: {
    investmentFund: {
      required: true,
      default: () => ({}),
    },
  },
  components: {
    Spinner,
  },
  computed: {
    ...mapGetters(['currencies']),
    investmentFundId() {
      return this.$route.params.investmentFundId;
    },
    currencyCode() {
      return this.investmentFund.currencyCode;
    },
    currency() {
      return this.currencies[this.currencyCode];
    },
    investmentFundRequests() {
      return (this.requests || [])
        .map((r) => {
          const amount = r.amount && this.currencyFormat(r.amount);
          const percentAmount = r.requestPercent && `${parseFloat(r.requestPercent).toFixed(2)}%`;
          if (r.daysToWait) {
            r.status = 'waiting';
          }
          return {
            id: r.id,
            type: r.type,
            statusClass: this.statusClasses[r.status],
            displayAmount: amount || percentAmount,
            status: r.status,
            createdAt: r.createdAt,
            actions: '',
            cancelable: r.isCancelable,
            investmentFund: r.investmentFund.name,
            investmentFundId: r.investmentFundId,
            username: r.user.username,
            userId: r.userId,
            amount: r.amount,
            siteFees: this.currencyFormat(r.siteFees),
            profitShare: this.currencyFormat(r.profitShare),
            daysToWait: r.daysToWait,
          };
        })
        .filter(r => !this.statusFilter
                      || r.status === this.statusFilter
                      || this.statusFilter === 'all')
        .filter(r => !this.userFilter
                     || r.username.toLowerCase().match(this.userFilter.toLowerCase()))
        .filter(r => !this.typeFilter
                     || r.type === this.typeFilter);
    },
    requestFields() {
      return {
        type: {},
        username: {
          label: 'User',
        },
        displayAmount: {
          label: 'Amount',
        },
        siteFees: {
          label: 'Site Fees',
        },
        profitShare: {
          label: 'Manager Fees',
        },
        status: {
          label: 'Status',
        },
        createdAt: {
          label: 'Created',
        },
        actions: {
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
        waiting: 'text-warning',
        pending_email_verification: 'text-warning',
        approved: 'text-success',
        declined: 'text-danger',
        canceled: 'text-muted',
      };
    },
  },
  watch: {
    investmentFundId() {
      this.loadData();
    },
  },
  methods: {
    ...mapActions(['fetchInvestmentFunds']),
    statusToWords({ daysToWait, status }) {
      if (daysToWait) {
        return `${daysToWait} days remaining`;
      }
      return snakeCaseToCapitalized(status);
    },
    currencyFormat(amount) {
      return this.currency ? this.currency.format(amount) : amount;
    },
    async loadData() {
      this.loading = true;
      const response = await fetchAllInvestmentFundRequests(this.investmentFundId)
        .catch(() => this.error = { message: 'Something went wrong' })
        .finally(() => { this.loading = false; });

      if (response.data.success) {
        this.requests = response.data.requests;
      }
    },
    refundableStatus(status) {
      return status === 'declined';
    },
    async updateRequest({ id, status }) {
      try {
        await updateInvestmentFundRequest({ id, status });
      } catch (error) {
        this.error = true;
      }
      this.fetchInvestmentFunds({ refresh: true }),
      this.loadData();
    },
    sufficientFunds(request) {
      let sufficientFunds = true;
      if (request.type === 'redemption' && request.isCancelable) {
        const [shares] = this.investmentFund.shares.filter(s => s.userId === request.userId);
        if (!shares || parseFloat(shares.amount) === 0) {
          sufficientFunds = false;
        } else if (request.amount) {
          const shareValue = shares.amount * this.investmentFund.sharePrice;
          if (parseFloat(request.amount) > shareValue) {
            sufficientFunds = false;
          }
        }
      }
      return sufficientFunds;
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
