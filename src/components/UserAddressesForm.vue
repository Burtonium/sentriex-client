<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">

    </div>
    <div class="form-group">
      <b-form-radio-group id="radios2" v-model="inputType" name="radioSubComponent">
        <b-form-radio value="comma" selected>Comma separated</b-form-radio>
        <b-form-radio value="file" disabled>File upload (Not implemented)</b-form-radio>
        <b-form-radio value="third" disabled>Server Generated (Not Implemented)</b-form-radio>
      </b-form-radio-group>
    </div>
    <div class="form-group" v-if="inputType === 'comma'">
      <label for="addressesInput">Addresses</label>
      <textarea id="addressesInput"
                rows="20"
                class="form-control"
                v-model="addressesText"></textarea>
      <p class="text-success" v-if="addresses.length">
        <small>
          {{ addresses.length }} address{{ addresses.length > 1 ? 'es' : '' }} detected
        </small>
      </p>
    </div>
    <b-btn variant="primary" type="submit">Submit</b-btn>
  </form>
</template>
<script>
import { addAddresses } from '@/api';

export default {
  data() {
    return {
      addressesText: null,
      inputType: 'comma',
    };
  },
  props: {
    currencyCode: {
      required: true,
    },
  },
  computed: {
    addresses() {
      return this.addressesText ? this.addressesText.split(',').filter(token => token !== '') : [];
    },
  },
  methods: {
    async onSubmit() {
      await addAddresses({
        code: this.currencyCode,
        addresses: this.addresses,
      });
    },
  },
};
</script>
