<template>
  <div>
    <div class="text-success mb-2" v-if="success">
      Translation successful.
    </div>
    <spinner v-if="loading" />
    <form @submit.prevent="translate" v-else>
      <div class="form-group">
        <label for="currencyCodeInput">Language</label>
        <select class="form-control"
                required
                v-model="locale">
          <option value="ko" >
            Korean
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="nameInput">Name</label>
        <input class="form-control"
              type="text"
              v-model="name"/>
      </div>
      <div class="form-group">
        <label for="shortDescriptionInput">Short description</label>
        <textarea class="form-control"
                  v-model="shortDescription"
                  rows="2"></textarea>
      </div>
      <div class="form-group">
        <label for="detailedDescriptionInput">Detailed description</label>
        <textarea class="form-control"
                  v-model="detailedDescription"
                  rows="5"></textarea>
      </div>
      <input type="submit" class="btn btn-primary" value="Translate"/>
    </form>
  </div>
</template>
<script>
import { translateInvestmentFund, fetchInvestmentFundTranslations } from '@/api';
import pick from 'lodash.pick';
import Spinner from '@/components/Spinner.vue';

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      loading: true,
      success: false,
      translations: [],
      locale: 'ko',
      name: '',
      shortDescription: '',
      detailedDescription: '',
    }
  },
  props: {
    investmentFundId: {
      required: true,
    }
  },
  watch: {
    locale() {
      this.loadFields();
    }
  },
  methods: {
    async loadTranslations() {
      this.loading = true;
      const { data } = await fetchInvestmentFundTranslations(this.investmentFundId).finally(() => { this.loading = false; });
      this.translations = data.translations;
      this.loadFields();
    },
    loadFields() {
      const translation = this.translations.find(t => t.locale === this.locale);
      if (translation) {
        this.name = translation.name;
        this.shortDescription = translation.shortDescription;
        this.detailedDescription = translation.detailedDescription;
      } else {
        this.clearFields();
      }
    },
    clearFields() {
      this.name = null;
      this.shortDescription = null;
      this.detailedDescription = null;
    },
    async translate() {
      this.loading = true;
      await translateInvestmentFund({
        id: this.investmentFundId,
        ...pick(this, ['name', 'shortDescription', 'detailedDescription', 'locale'])
      });
      this.success = true;
      this.loadTranslations();
    }
  },
  created() {
    this.loadTranslations();
  }
}
</script>