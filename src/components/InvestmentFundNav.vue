<template>
  <div>
    <ul class="nav-list">
      <router-link v-if="create" tag="li"
                   :to="{ name: routeName }"
                   class="clickable nav-button"
                   :class="{ 'selected': !selected }">
        Create
      </router-link>
      <router-link :to="{ name: routeName,
                          params: { investmentFundId: investmentFund.id }}"
                    tag="li"
                    :key="investmentFund.id"
                    v-for="investmentFund in investmentFunds"
                    class="clickable nav-button ellipsis"
                    :class="{'selected': selected === investmentFund.id}">
          {{ investmentFund.name }}
     </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['selected', 'investmentFunds', 'routeName', 'create'],
};
</script>
<style lang="scss" scoped>
ul {
  border-radius: 3px;
}

.nav-button {
  color: map-get($theme-colors, primary);
  padding: 12px;
  border-radius: 3px;
}

.nav-button.selected {
  background-color: map-get($theme-colors, primary);
  color:white;
}
</style>
