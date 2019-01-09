<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="nameInput">Name</label>
      <input class="form-control"
             type="text"
             v-model="investmentFund.name"
             required
             :disabled="!canEdit"/>
    </div>
    <div class="form-group">
      <label for="riskLevelInput">Risk Level</label>
      <select class="form-control"
              v-model="investmentFund.riskLevel"
              required
              :disabled="!canEdit">
        <option value="high" selected>High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    <div class="form-group">
      <label for="currencyCodeInput">Currency</label>
      <select class="form-control"
              required
              v-model="investmentFund.currencyCode"
              :disabled="!canEdit">
        <option v-for="currency in currencies" :value="currency.code" :key="currency.code">
          {{ currency.label }} ({{ currency.code }})
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="managedByInput">Managed By</label>
      <select id="managedByInput"
              class="form-control"
              v-model="investmentFund.managedBy"
              :disabled="!canEdit">
        <option v-for="user in users" :value="user.id" :key="user.id">
          {{ user.username }} ({{ user.email }})
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="shortDescriptionInput">Short description</label>
      <textarea class="form-control"
                v-model="investmentFund.shortDescription"
                rows="2"
                :disabled="!canEdit"></textarea>
    </div>
    <div class="form-group">
      <label for="detailedDescriptionInput">Detailed description</label>
      <textarea class="form-control"
                v-model="investmentFund.detailedDescription"
                rows="5"
                :disabled="!canEdit"></textarea>
    </div>
    <div class="form-group">
      <b-btn variant="primary" v-if="!investmentFund.id" type="submit">Create</b-btn>
      <b-btn variant="primary" v-else-if="canEdit" type="submit">Save</b-btn>
      <b-btn variant="danger" v-if="canDelete && investmentFundId" class="ml-3" :disabled="loading" @click="handleDelete">Delete</b-btn>
      <icon name="spinner" :spin="true" v-if="loading" class="ml-3" scale="1.3" color="#555"/>
    </div>
    <p class="text-danger" v-if="error">
      Something went wrong.
    </p>
  </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { updateInvestmentFund, createInvestmentFund, deleteInvestmentFund } from '@/api';

export default {
  data() {
    return {
      error: false,
      loading: false,
    }
  },
  props: {
    investmentFund: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
    canDelete: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapGetters(['currencies', 'users']),
    investmentFundId() {
      return this.investmentFund && this.investmentFund.id ? this.investmentFund.id : '';
    },
  },
  methods: {
    ...mapActions(['fetchInvestmentFunds']),
    async onSubmit() {
      if (this.investmentFundId) {
        await this.handleUpdate();
      } else {
        await this.handleCreate();
      }
    },
    async handleUpdate() {
      this.loading = true;
      await updateInvestmentFund(this.investmentFund)
        .catch(() => { this.error = true; })
        .finally(() => { this.loading = false });
      await this.fetchInvestmentFunds({ refresh: true });
    },
    async handleCreate() {
      const response = await createInvestmentFund(this.investmentFund)
        .catch(() => { this.error = true; })
        .finally(() => { this.loading = false });
      let id;
      if (response && response.data && response.data.investmentFund) {
        id = response.data.investmentFund.id;
      }
      await this.fetchInvestmentFunds({ refresh: true });
      this.$router.push(`/manage/investment-funds/${id}`);
    },
    async handleDelete() {
      this.loading = true;
      await deleteInvestmentFund(this.investmentFundId)
        .catch(() => { this.deleteError = true; })
        .finally(() => { this.loading = false; });

      if(!this.deleteError) {
        this.fetchInvestmentFunds({ refresh: true });
        this.$router.push('/manage/investment-funds/');
      }
    },
  },
};
</script>
