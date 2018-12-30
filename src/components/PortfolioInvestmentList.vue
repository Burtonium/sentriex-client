<template>
  <b-card-group deck>
    <b-card no-body 
            v-for="fund in investmentFundsByValue"
            :key="fund.id"
            :class="investmentClass">
      <p class="card-text">
          This is a wider card with supporting text below as a
          natural lead-in to additional content. This content
          is a little bit longer.
      </p>
      <div slot="footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </b-card>
  </b-card-group>
</template>
<script>
export default {
  data() {
    return {
      error: false,
      columns: 3,
      page: 1,
    };
  },
  props: {
    investmentFunds: {
      type: Array,
      required: true,
    },
    investmentFundShares: {
      type: Array,
      required: true,
    }
  },
  computed: {
    investmentClass() {
      let classes;
      if (this.investmentFundShares.length >= 3) {
        classes = 'invested-dual';
      } else if (this.investmentFundShares.length === 2) {
        classes = 'invested-dual';
      } else {
        classes = 'invested-single';
      }
      return classes;
    },
    investmentFundsByValue() {
      return this.investmentFundShares.map(s => {
        const fund = this.investmentFunds.find(i => i.id === s.investmentFundId);
        if (!fund) {
          this.error = true;
        }
        else {
          return {
            ...fund,
            ...s,
            investedValue: parseFloat(fund.sharePrice) * s.amount,
          };
        }
      }).sort((a, b) => b.investedValue - a.investedValue);
    }
  }
};
</script>
<style scoped>
.investments-container {
  display: flex;
  flex-wrap: wrap;
}
.invested {
  max-width: 30%;
  min-width: 30%;
}

.invested-dual {
  max-width: 47%;
  min-width: 47%;
}

</style>
