<template>
  <form @submit.prevent="onSubmit">
    <p class="text-primary" v-if="!withdrawal.amount || errors.first('amount')">
      {{ $t('withdrawals.balance', { balance: balanceAmount }) }}
    </p>
    <p class="text-primary" v-else-if="!errors.first('amount')">
      {{ $t('withdrawals.afterBalance', { balance: differenceAmount }) }}
    </p>
    <div class="form-group">
      <input class="form-control input-center-text"
             v-model="withdrawal.address"
             type="text"
             name="address"
             v-validate="'required'"
             :data-vv-as="$t('fields.address')"
             placeholder="Address" />
        <p class="text-danger mt-1" v-if="errors.has('address')">
          {{ errors.first('address') }}
        </p>
      <p class="text-warning mt-1" v-if="withdrawal.address">
        {{ $t('withdrawals.doubleCheckAddress', { currency: currencyCode }) }}
      </p>
    </div>
    <div class="form-group">
      <input class="form-control input-center-text"
             v-model="withdrawal.amount"
             name="amount"
             :placeholder="$t('general.amount')"
             :data-vv-as="$t('fields.amount')"
             v-validate="amountValidation"/>
      <p class="text-danger mt-1" v-if="errors.has('amount')">
        {{ errors.first('amount') }}
      </p>
    </div>
    <div class="form-group" v-if="account.twofa">
      <input class="form-control input-center-text"
             name="twofa"
             :placeholder="$t('twoFa.codePlaceholder')"
             type="number"
             v-model="twofaToken"
             autocomplete="off"
             :data-vv-as="$t('fields.twoFa')"
             v-validate="'digits:6|required'">
      <p class="text-danger mt-2">
        {{ errors.first('twofa') }}
      </p>
    </div>
    <b-btn type="submit" variant="primary">
      {{ $t('general.withdraw') }}
    </b-btn>
  </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { createWithdrawal, errorCodes } from '@/api';

const cloneDeep = require('lodash.clonedeep');

const initialState = {
  error: null,
  success: false,
  withdrawal: {},
  emailVerificationModal: false,
  twofaToken: null,
};

export default {
  data() {
    return cloneDeep(initialState);
  },
  computed: {
    ...mapGetters(['currencies', 'balances', 'account']),
    currencyCode() {
      return this.$route.params.currencyCode;
    },
    currency() {
      return this.currencies[this.currencyCode];
    },
    balance() {
      return this.balances[this.currencyCode];
    },
    balanceAmount() {
      return this.balance && this.currency.format(this.balance.amount);
    },
    differenceAmount() {
      return this.currency.format(this.balance.amount - this.withdrawal.amount);
    },
    amountValidation() {
      const currency = this.currencies[this.currencyCode];
      const minValue = 0;
      const maxValue = parseFloat(this.balance.amount);
      const rules = [
        'required',
        `min_value:${minValue}`,
        `max_value:${maxValue}`,
        `decimal:${currency.precision}`,
      ];
      return rules.join('|');
    },
  },
  watch: {
    currencyCode() {
      this.resetForm();
    },
  },
  methods: {
    ...mapActions(['fetchBalances', 'fetchMyWithdrawals']),
    resetForm() {
      this.$validator.reset();
      Object.assign(this, cloneDeep(initialState));
    },
    async onSubmit() {
      const valid = await this.$validator.validateAll();

      if (!valid) {
        return valid;
      }
      let response;
      try {
        response = await createWithdrawal({
          currencyCode: this.currencyCode,
          twofaToken: this.twofaToken,
          ...this.withdrawal,
        });
        await Promise.all([
          this.fetchBalances(),
          this.fetchMyWithdrawals(this.currencyCode),
        ]);
      } catch (error) {
        this.error = { message: 'Something went wrong' };
      }

      if (response.data.code === errorCodes.INVALID_2FA) {
        this.errors.add({
          field: 'twofa',
          msg: this.$t('twoFa.invalidCode'),
        });
      }

      if (response.data.success) {
        this.$emit('withdrawal', response.data.withdrawal);
        this.resetForm();
      }
    },
  },
};
</script>
