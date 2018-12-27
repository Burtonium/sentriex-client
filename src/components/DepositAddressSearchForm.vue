<template>
  <div class="deposit" @submit.prevent="search">
    <form class="form-inline">
      <div class="form-group">
        <label for="">Find user by address:</label>
        &nbsp;
        &nbsp;
        <input class="form-control address-search"
               name="address"
               v-model="addressSearch"
               type="text"
               placeholder="e.g. 12qNs7B4g99gfxQ5oVpxwUkcmRnmhpcKfA"
               required
               @input="error = false">
        &nbsp;
        &nbsp;
        <b-btn variant="primary" type="submit">Search</b-btn>
      </div>
    </form>
    <div class="address-display mt-4">
      <div v-if="searching">
        <spinner />
      </div>
      <p v-if="error" class="text-danger">
        {{ errorMsg }}
      </p>
      <div class="address-info" v-if="depositAddress">
        <b-table :items="[depositAddress]" :fields="['userId', 'address', 'data', 'createdAt']"/>
      </div>
      <p class="text-warning" v-if="depositAddress && !depositAddress.user">
        This address is not associated to a user.
      </p>
      <div class="create-deposit-form mb-2" v-if="depositAddress && depositAddress.user">
        <create-deposit-form :depositAddress="depositAddress"/>
      </div>
    </div>
  </div>
</template>
<script>
import { searchDepositAddress } from '@/api';
import Spinner from '@/components/Spinner';
import CreateDepositForm from '@/components/CreateDepositForm.vue';

const initialState = {
  addressSearch: null,
  depositAddress: null,
  searching: false,
  error: false,
};

export default {
  components: {
    Spinner,
    CreateDepositForm,
  },
  data() {
    return {
      ...initialState,
    };
  },
  props: {
    currencyCode: {
      required: false,
      type: String,
    },
  },
  watch: {
    currencyCode() {
      Object.assign(this, initialState);
    },
  },
  computed: {
    errorMsg() {
      return (this.error && this.error.message) || 'Something went wrong. Go hassle a programmer.';
    },
  },
  methods: {
    async search() {
      this.error = false;
      this.searching = true;
      this.depositAddress = null;
      let response = null;
      try {
        response = await searchDepositAddress({
          address: this.addressSearch,
          currencyCode: this.currencyCode,
        });
      } catch (error) {
        this.error = true;
      }

      this.searching = false;
      if (response.status === 404) {
        this.error = { message: 'Couldnt find that deposit address, sorry' };
      }

      this.depositAddress = response.data.address;
    },
  },
};
</script>
<style scoped>
.address-search {
  width: 400px;
}
</style>
