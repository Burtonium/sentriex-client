<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="nameInput">Name</label>
      <input class="form-control" type="text" v-model="investmentFund.name" required/>
    </div>
    <div class="form-group">
      <label for="riskLevelInput">Risk Level</label>
      <select class="form-control" v-model="investmentFund.riskLevel" required>
        <option value="high" selected>High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    <div class="form-group">
      <label for="currencyCodeInput">Currency</label>
      <select class="form-control" required v-model="investmentFund.currencyCode">
        <option v-for="currency in currencies" :value="currency.code">
          {{ currency.label }} ({{ currency.code }})
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="shortDescriptionInput">Short description</label>
      <textarea class="form-control" v-model="investmentFund.shortDescription" rows="2"/></textarea>
    </div>
    <div class="form-group">
      <label for="detailedDescriptionInput">Detailed description</label>
      <textarea class="form-control" v-model="investmentFund.detailedDescription" rows="5"/></textarea>
    </div>
    <div class="form-group">
      <b-btn variant="primary" v-if="!investmentFund.id" type="submit">Create</b-btn>
      <b-btn variant="primary" v-else type="submit">Save</b-btn>
    </div>
  </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { updateInvestmentFund, createInvestmentFund } from '@/api';

export default {
  props: {
    investmentFund: {
      type: Object,
      required: false,
      default: () => ({}),
    }
  },
  computed: {
    ...mapGetters(['currencies']),
  },
  methods: {
    ...mapActions(['fetchInvestmentFunds']),
    async onSubmit() {
      if (this.investmentFund.id) {
        await updateInvestmentFund(this.investmentFund);
      } else {
        await createInvestmentFund(this.investmentFund);
      }
      
      this.fetchInvestmentFunds();
    },
  },
};
</script>