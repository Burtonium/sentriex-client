<template>
  <landing-container>
    <div v-if="!error && !success">
      <loading/>
      <p class="text-primary mt-5">
        {{ $t('activation.progress', { resourceName }) }}
      </p>
    </div>
    <div v-else-if="success">
      <checkmark/>
      <p class="text-success mt-5">
        {{ $t('success.activation') }}
      </p>
    </div>
    <div v-else-if="error">
      <h3 class="text-danger">
        {{ $t('error.invalidActivationToken') }}
      </h3>
    </div>
  </landing-container>
</template>
<script>
import LandingContainer from '@/components/LandingContainer.vue';
import Checkmark from '@/components/Checkmark.vue';
import Loading from '@/components/Loading.vue';

import { api } from '../api';

export default {
  data() {
    return {
      success: false,
      error: null,
    };
  },
  components: {
    Checkmark,
    Loading,
    LandingContainer,
  },
  props: {
    resourceName: {
      type: String,
      required: false,
      default: 'account',
    },
    redirect: {
      type: String,
      required: false,
      default: '/login',
    },
  },
  async mounted() {
    const res = await api.post(this.$route.path)
      .catch(() => this.error = true);
    if (res.data.success) {
      this.success = true;
    } else {
      this.error = true;
    }
    setTimeout(() => {
      this.$router.push(this.redirect);
    }, 4000);
  },
};
</script>
