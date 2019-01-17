<template>
  <div>
    <spinner v-if="!sortedBalanceUpdates"/>
    <b-table v-else
             :items="sortedBalanceUpdates"
             :fields="tableFields"
             :current-page="currentPage"
             :per-page="perPage">
      <template slot="updatedSharePrice" slot-scope="row">
        <template v-if="canEdit">
          <input  class="form-control" v-model="row.item.updatedSharePrice"/>
        </template>
        <template v-else>
          {{ row.item.updatedSharePrice }}
        </template>
      </template>
      <template slot="sharePriceDate" slot-scope="row">
        <template v-if="canEdit">
          <input  class="form-control" v-model="row.item.sharePriceDate"/>
        </template>
        <template v-else>
          {{ row.item.sharePriceDate }}
        </template>
      </template>
      <template slot="actions" slot-scope="row">
        <b-btn variant="primary" @click="patchUpdate(row.item)" v-if="canEdit">
          Save
        </b-btn>
        <b-btn class="ml-2" variant="danger" @click="deleteUpdate(row.item)" v-if="canDelete">
          Delete
        </b-btn>
      </template>
    </b-table>
    <div class="row" v-if="sortedBalanceUpdates.length > perPage">
      <div class="col-md-6 my-1">
        <b-pagination :total-rows="sortedBalanceUpdates.length"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="my-0"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Spinner from './Spinner.vue';
import { deleteBalanceFundUpdate } from '@/api';

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      loading: false,
    };
  },
  components: {
    Spinner,
  },
  props: {
    investmentFundId: {
      required: false,
    },
    canDelete: {
      default: false,
    },
    canEdit: {
      default: false,
    },
  },
  watch: {
    investmentFundId() {
      this.loadData();
    },
  },
  computed: {
    sortedBalanceUpdates() {
      const updates = this.investmentFundBalanceUpdates[this.investmentFundId] || [];
      updates.sort((a, b) => new Date(b.sharePriceDate) - new Date(a.sharePriceDate));
      return updates;
    },
    ...mapGetters(['investmentFundBalanceUpdates']),
    tableFields() {
      return this.canDelete || this.canEdit
        ? ['updatedSharePrice', 'sharePriceDate', 'actions']
        : ['updatedSharePrice', 'sharePriceDate'];
    },
  },
  methods: {
    ...mapActions(['fetchInvestmentBalanceUpdates', 'fetchInvestmentFunds']),
    async loadData() {
      if (this.investmentFundId) {
        this.loading = true;
        await this.fetchInvestmentBalanceUpdates(this.investmentFundId)
          .finally(() => { this.loading = false; });
      }
    },
    async deleteUpdate({ id }) {
      await deleteBalanceFundUpdate(id);

      await Promise.all([
        this.fetchInvestmentBalanceUpdates(this.investmentFundId),
        this.fetchInvestmentFunds({ refresh: true }),
      ]);
    },
  },
  async created() {
    await this.loadData();
  },
};
</script>
