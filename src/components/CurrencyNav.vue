<template>
  <div>
    <ul class="nav-list">
      <router-link v-if="create"
                   tag="li"
                   :to="{ name: routeName }"
                   class="clickable nav-button"
                   :class="{ 'selected': !selected }">
        Create
      </router-link>
      <router-link  v-for="currency in currencies"
                    :to="{ name: routeName,
                          params: { currencyCode: currency.code }}"
                    tag="li"
                    :key="currency.code"
                    class="clickable nav-button"
                    :class="{'selected': selected === currency.code}">
          {{ currency.label }} ({{ currency.code }})
     </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['selected', 'currencies', 'routeName', 'create'],
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
