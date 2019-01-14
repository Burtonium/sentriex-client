<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <b-form-radio-group id="radios2" v-model="inputType" name="radioSubComponent">
        <b-form-radio value="comma" selected>Comma separated</b-form-radio>
      </b-form-radio-group>
    </div>
    <template v-if="currencyCode === 'BTC'">
      <div class="form-group">
        <label for="xpubInput">Account Extended Public Key (BIP44)</label>
        <input class="form-control" v-model="xpub" placeholder="xpub key" @input="derivationError = null"/>
      </div>
      <div class="form-group">
        <div class="form-inline">
          <input class="form-control" v-model="fromIndex" placeholder="From index" type="number"/>
          <input class="form-control ml-3" v-model="toIndex" placeholder="To index" type="number" />
          <b-btn variant="primary" class="ml-3" @click="deriveAddresses">Generate</b-btn>
        </div>
      </div>
      <div class="text-danger mb-3" v-if="derivationError">
        {{ derivationError.message }}
      </div>
    </template>
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
    <icon name="spinner" :spin="true" v-if="loading" class="ml-3" scale="1.3" color="#555"/>
    <div class="text-danger mb-3" v-if="error">
      Something went wrong. Probably duplicates.
    </div>
    <div class="text-success mb-3" v-if="success">
      Congrats, it did the thing.
    </div>
  </form>
</template>
<script>
import { addAddresses, errorCodes } from '@/api';
import { addressDeriver } from '@/utils';

export default {
  data() {
    return {
      loading: false,
      error: false,
      success: false,
      addressesText: null,
      inputType: 'comma',
      xpub: '',
      fromIndex: 0,
      toIndex: 20,
      derivationError: null,
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
      this.loading = true;
      const response = await addAddresses({
          code: this.currencyCode,
          addresses: this.addresses
        })
        .catch(() => { this.error = true; })
        .finally(() => { this.loading = false; });
      this.success = response && response.data.success;

    },
    async deriveAddresses() {
      try {
        const from = parseInt(this.fromIndex, 10);
        const to = parseInt(this.toIndex, 10);
        const addresses = addressDeriver(this.xpub)(from, to);
        this.addressesText = addresses.join(',\n');
      } catch (error) {
        this.derivationError = error;
      }
    }
  },
};
</script>
