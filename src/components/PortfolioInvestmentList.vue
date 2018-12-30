<template>
  <div class="investments-container">
    {{ investmentFundShares }} {{ investmentFunds }}
  </div>
</template>
<script>
export default {
  props: {
    investmentFunds: {
      type: Array,
      required: true,
    },
    investmentFundShares: {
      type: Array,
      required: true,
    }
  }
};
</script>
<style scoped>
.investments-container {
  display: flex;
  border-radius: 5px;
  border: 1px solid black;
}
</style>