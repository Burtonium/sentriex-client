<template>
  <div class="deposits">
    <spinner v-if="loading" />
    <b-table :items="filteredDeposits" :fields="['userId', 'amount', 'txId', 'createdAt']" v-else />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Spinner.vue';

const valueConcat = obj => Object.values(obj).reduce((acc, cur) => acc.concat(cur), []);

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
    ...mapGetters(['deposits']),
    filteredDeposits() {
      const c = this.currencyCode;
      return c ? this.deposits[c] : valueConcat(this.deposits);
    },
  },
  watch: {
    currencyCode() {
      this.loadData();
    },
  },
  methods: {
    ...mapActions(['fetchDeposits']),
    loadData() {
      this.loading = true;
      this.fetchDeposits(this.currencyCode).finally(() => { this.loading = false; });
    },
  },
  props: {
    currencyCode: {
      type: String,
      required: false,
    },
  },
  created() {
    this.loadData();
  },
};
</script>
