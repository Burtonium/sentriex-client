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
  created() {
    Promise.all(this.actions.map(a => this.$store.dispatch(a)))
      .catch((e) => { this.error = true; console.log(e); })
      .finally(() => { this.loading = false; });
  },
};
</script>
