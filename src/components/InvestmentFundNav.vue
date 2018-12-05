<template>
  <div>
    <ul class="nav-list">
      <router-link :to="{ name: 'investment-fund-view',
                          params: { investmentFundId: investmentFund.id }}"
                    tag="li"
                    :key="investmentFund.id"
                    v-for="investmentFund in investmentFunds"
                    class="clickable"
                    :class="{'selected': selected === investmentFund.id}">
          {{ investmentFund.name }}
     </router-link>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['selected'],
  computed: mapGetters(['investmentFunds']),
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/bootstrap-override.scss';
ul {
  border-radius: 3px;
}

li {
  color: map-get($theme-colors, primary);
  padding: 12px;
  border-radius: 3px;
}

li.selected {
  background-color: map-get($theme-colors, primary);
  color:white;
}
</style>
