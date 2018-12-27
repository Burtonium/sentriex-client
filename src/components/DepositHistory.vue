<template>
  <div class="deposit-history">
    <spinner v-if="loading" />
    <b-table
      v-else
      :items="userDeposits"
      :fields="depositFields"
      :show-empty="true"
      stacked="md"
      empty-text="You have no deposits yet">
      <template slot="txId" slot-scope="row">
        {{ row.item.txId }}
      </template>
      <template slot="createdAt" slot-scope="row">
        <timeago :datetime="row.item.createdAt" />
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Spinner from '@/components/Spinner.vue';

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    Spinner,
  },
  computed: {
    ...mapGetters(['deposits', 'currencies']),
    currencyCode() {
      return this.$route.params.currencyCode;
    },
    currency() {
      return this.currencies[this.currencyCode];
    },
    userDeposits() {
      const deps = this.deposits ? this.deposits[this.currencyCode] : [];
      return deps.map(d => ({
        ...d,
        amount: this.currency.format(d.amount),
      }));
    },
    depositFields() {
      return {
        amount: {
          label: 'Amount',
        },
        txId: {
          label: 'Transaction ID',
          tdClass: 'txid-ellipsis',
        },
        createdAt: {
          label: 'Created',
        },
      };
    },
  },
  watch: {
    currencyCode() {
      this.loadData();
    },
  },
  methods: {
    ...mapActions(['fetchMyDeposits']),
    loadData() {
      this.loading = true;
      this.fetchMyDeposits(this.currencyCode).finally(() => { this.loading = false; });
    },
  },
};
</script>
<style>
@media (min-width: 768px) {
  td.txid-ellipsis {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
