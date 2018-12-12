<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="labelInput">Label</label>
      <input id="labelInput"
             class="form-control"
             type="text"
             v-model="currency.label"
             required />
    </div>
    <div class="form-group">
      <label for="currencyCodeInput">Currency Code</label>
      <input id="currencyCodeInput"
             class="form-control"
             type="text"
             v-model="currency.code"
             required />
    </div>
    <div class="form-group">
      <label for="currencyTypeInput">Type</label>
      <select class="form-control" v-model="currency.type">
        <option value="crypto">Crypto</option>
        <option value="fiat">Fiat</option>
      </select>
    </div>
    <div class="form-group">
      <label for="precisionInput">Precision</label>
      <input id="precisionInput"
             class="form-control"
             type="number"
             v-model="currency.precision"
             required />
    </div>
    <div class="form-group">
      <label for="iconInput">Icon</label>
      <input id="iconInput"
             class="form-control"
             type="text"
             v-model="currency.icon"
             placeholder="LTC.svg, XRP.svg, etc..."/>
      <p class="text-warning">
        <small>
        Uploading icons not currently supported. Only {{ currencyIcons.join(', ') }} supported.
        </small>
      </p>
    </div>
    <div class="form-group">
      <label for="unicodeSymbol">Unicode Symbol</label>
      <input class="form-control"
             v-model="currency.unicodeSymbol"
             placeholder="$, Ƀ, etc..."/>
    </div>
    <div class="form-group">
      <b-btn variant="primary" v-if="!$route.params.currencyCode" type="submit">Create</b-btn>
      <b-btn variant="primary" v-else type="submit">Save</b-btn>
    </div>
  </form>
</template>
<script>
import { mapActions } from 'vuex';
import { createCurrency, updateCurrency } from '@/api';
import icons from '@/assets/images/currencies/index';

export default {
  methods: {
    ...mapActions(['fetchCurrencies']),
    async onSubmit() {
      const code = this.$route.params.currencyCode;
      const newCode = this.currency.code;
      if (!code) {
        await createCurrency(this.currency);
        await this.fetchCurrencies({ refresh: true });
      } else {
        await updateCurrency({ code, currency: this.currency });
        await this.fetchCurrencies({ refresh: true });
        if (newCode !== code) {
          this.$router.push({
            name: 'crypto-management',
            params: {
              currencyCode: newCode,
            },
          });
        }
      }
    },
  },
  props: {
    currency: {
      type: Object,
      required: false,
      default: () => ({ precision: 8, type: 'crypto' }),
    },
  },
  computed: {
    icons() {
      return icons;
    },
    currencyIcons() {
      return Object.keys(icons).map(i => `${i}.svg`);
    },
  },
};
</script>
