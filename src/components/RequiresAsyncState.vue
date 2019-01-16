<template>
  <div>
    <spinner v-if="loading"/>
    <p class="text-danger" v-else-if="error">
      Something went wrong.
    </p>
    <slot v-else></slot>
  </div>
</template>
<script>
import Spinner from '@/components/Spinner.vue';

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      loading: true,
      error: false,
      success: true,
    };
  },
  props: {
    actions: {
      type: Array,
      required: true,
    },
  },
  watch: {
    actions() {
      this.loadData();
    },
  },
  methods: {
    loadData() {
      this.loading = true;
      Promise.all(this.actions.map((a) => {
        const x = a.split(':');
        return this.$store.dispatch(x[0], x[1] && x[1].split(','));
      }))
        .catch((e) => { this.error = true; c; })
        .finally(() => { this.loading = false; });
    },
  },
  created() {
    this.loadData();
  },
};
</script>
