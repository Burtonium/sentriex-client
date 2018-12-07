<template>
  <div>
    <ul class="nav-list">
      <router-link :to="{ name: routeName,
                          params: { investmentFundId: investmentFund.id }}"
                    tag="li"
                    :key="investmentFund.id"
                    v-for="investmentFund in investmentFunds"
                    class="clickable investment-fund-nav-button"
                    :class="{'selected': selected === investmentFund.id}">
          {{ investmentFund.name }}
     </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['selected', 'investmentFunds', 'routeName'],
};
</script>
<style lang="scss">
@import '../assets/scss/bootstrap-override.scss';
ul {
  border-radius: 3px;
}

.investment-fund-nav-button {
  color: map-get($theme-colors, primary);
  padding: 12px;
  border-radius: 3px;
}

.investment-fund-nav-button.selected {
  background-color: map-get($theme-colors, primary);
  color:white;
}
</style>
