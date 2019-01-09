<template>
  <div>
    <h4 class="text-primary mb-4">
      Subscriptions / Redemptions
    </h4>
    <spinner v-if="loading" />
    <b-table v-else :items="investmentFundRequests"
             stacked="lg"
             :fields="fields"
             class="table-condensed"
             :show-empty="true"
             empty-text="No requests"
             :current-page="currentPage"
             :per-page="perPage">
      <template slot="status" slot-scope="row">
        <span :class="row.item.statusClass">
          {{ statusToWords(row.item.status) }}
        </span>
      </template>
      <template slot="created" slot-scope="row">
        <timeago :datetime="row.item.created" />
      </template>
      <template slot="actions" slot-scope="row">
        <div class="no-wrap">
          <template v-if="row.item.cancelable">
            <b-btn class="ml-1"
                   variant="outline-primary"
                   size="sm"
                   @click="cancelRequest(row.item.id)">
              Cancel
            </b-btn>
          </template>
        </div>
      </template>
    </b-table>
    <div class="row">
      <div class="col-md-6 my-1">
        <b-pagination :total-rows="investmentFundRequests.length"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="my-0"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Spinner.vue';
import { cancelInvestmentFundRequest, fetchInvestmentFundRequests } from '@/api';
import { snakeCaseToCapitalized } from '@/utils';
import { events, EventBus } from '@/event-bus';

export default {
  data() {
    return {
      loading: true,
      error: false,
      requests: [],
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
    }
  },
  computed: {
    ...mapGetters(['currencies']),
    investmentFundRequests() {
      return this.requests.map((r) => {
        const amount = r.amount && this.currencies[r.investmentFund.currencyCode].format(r.amount);
        const percentAmount = r.requestPercent && `${parseFloat(r.requestPercent).toFixed(2)}%`;
        return {
          id: r.id,
          type: r.type === 'subscription' ? 'Sub' : 'Redeem',
          statusClass: this.statusClasses[r.status],
          amount: amount || percentAmount,
          status: this.statusToWords(r.status),
          created: r.createdAt,
          actions: '',
          cancelable: r.isCancelable,
          investmentFund: r.investmentFund.name,
          investmentFundId: r.investmentFundId,
        };
      });
    },
    fields() {
      return ['investmentFund', 'type', 'amount', 'status', 'created', 'actions'];
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
  methods: {
    ...mapActions(['fetchBalances']),
    async loadData() {
      const response = await fetchInvestmentFundRequests()
        .catch(() => { this.error = true; })
        .finally(() => { this.loading = false; });

      if (response.data.success) {
        this.requests = response.data.requests;
      }
    },
    statusToWords(status) {
      return snakeCaseToCapitalized(status);
    },
    async cancelRequest(id) {
      try {
        await cancelInvestmentFundRequest(id);
      } catch (error) {
        this.error = true;
      }
      this.loadData();
      this.fetchBalances();
    },
    investmentFundRoute(id) {
      return {
        name: 'investment-fund-view',
        params: {
          investmentFundId: id,
        },
      };
    },
  },
  created() {
    this.loadData();
    EventBus.$on(events.INVESTMENT_REQUEST_CREATED, () => this.loadData());
  },
  destroyed() {
    EventBus.$off(events.INVESTMENT_REQUEST_CREATED);
  },
};
</script>
