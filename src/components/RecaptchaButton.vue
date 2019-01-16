<template>
  <g-recaptcha :data-btn-class="`btn btn-${variant} btn-${size}`"
               :data-sitekey="sitekey"
               :data-validate="validate"
               :data-callback="submit">
    <slot></slot>
  </g-recaptcha>
</template>
<script>
import gRecaptcha from '@finpo/vue2-recaptcha-invisible';

export default {
  props: {
    sitekey: {
      required: true,
    },
    size: {
      default: 'lg',
    },
    variant: {
      default: 'primary',
    },
  },
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
