<template>
  <g-recaptcha data-btn-class="btn btn-primary btn-lg"
               :data-sitekey="sitekey"
               :data-validate="validate"
               :data-callback="submit">
    <slot></slot>
  </g-recaptcha>
</template>
<script>
import gRecaptcha from '@finpo/vue2-recaptcha-invisible';

export default {
  props: ['sitekey', 'valid'],
  methods: {
    validate() {
      return true;
    },
    submit(code) {
      this.$emit('click', code);
    },
  },
  components: {
    gRecaptcha,
  },
};
</script>
