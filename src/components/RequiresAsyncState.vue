<template>
  <div>
    <spinner v-if="loading"/>
    <p class="text-danger" v-else-if="error">
      Something went wrong.
    </p>
    <slot v-else :getters="storeGetters"></slot>
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
    getters: {
      type: Array,
      default: () => ([]),
    }
  },
  computed: {
    storeGetters() {
      return this.$store.getters;
    },
  },
  created() {
    Promise.all(this.actions.map(a => this.$store.dispatch(a)))
      .catch(() => { this.error = true; })
      .finally(() => { this.loading = false; });
  }
}; 
</script>
