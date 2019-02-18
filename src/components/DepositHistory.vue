<template>
  <div class="deposit-history">
    <h4 class="text-primary mb-4">
      {{ $t('deposits.title') }}
    </h4>
    <spinner v-if="loading" />
    <b-table
      v-else
      :items="userDeposits"
      :fields="depositFields"
      :show-empty="true"
      stacked="md"
      :empty-text="$t('deposits.noneYet')">
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
import flatten from 'lodash.flatten';

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
      let deps = [];
      if (this.currencyCode) {
        deps = this.deposits && this.deposits[this.currencyCode] ? this.deposits[this.currencyCode] : [];
      } else {
        deps = this.deposits ? flatten(Object.values(this.deposits)) : [];
      }

      return deps.map((d) => {
        const currency = this.currencies[d.currencyCode];
        return {
          ...d,
          amount: currency ? currency.format(d.amount) : d.amount,
        };
      });
    },
    depositFields() {
      return {
        amount: {
          label: this.$t('general.amount'),
        },
        txId: {
          label: this.$t('general.transactionId'),
          tdClass: 'txid-ellipsis',
        },
        createdAt: {
          label: this.$t('general.created'),
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
  created() {
    this.loadData();
  },
};
</script>
<style>
@media (min-width: 768px) {
  td.txid-ellipsis {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
