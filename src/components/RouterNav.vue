<template>
  <div>
    <ul class="nav-list">
      <router-link v-if="create"
                   tag="li"
                   :to="{ name: routeName }"
                   class="clickable nav-button"
                   :class="{ 'selected': !selected }">
        <slot name="create">
          Create
        </slot>
      </router-link>
      <router-link  v-for="item in itemList"
                    :to="item.route"
                    tag="li"
                    :key="item.data.id"
                    class="clickable nav-button"
                    :class="{ 'selected': item.selected }">
        <slot name="item" :item="item">
            {{ item.data.label || item.data.name }}
        </slot>
     </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    create: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      required: true,
    },
    itemIdField: {
      required: false,
      default: 'id',
    },
    routeIdField: {
      required: false,
      default: 'id',
    },
  },
  computed: {
    itemList() {
      let iterable = this.items.constructor === Array ? this.items : Object.values(this.items);
      return iterable.map(item => ({
        data: item,
        route: this.getRoute(item[this.itemIdField]),
        selected: this.routeId == item[this.itemIdField],
      }));
    },
    routeId() {
      return this.$route.params[this.routeIdField];
    },
    routeName() {
      return this.$route.name;
    }
  },
  methods: {
    getRoute(id) {
      return { name: this.routeName, [this.routeIdField]: id };
    }
  }
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
