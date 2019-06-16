<template>
  <ul class="filters">
    <TodoFilter
      v-for="(filter,index) in filters"
      :text="filter.name"
      :key="index"
      :selected="filter.name == current"
      @click.native="handler(filter.name,filter.fn)"
    ></TodoFilter>
  </ul>
</template>
<script>
import TodoFilter from "./TodoFilter.vue";

export default {
  name: "TodoFilterList",
  props: ["filters", "current", "setCurrentFunc", "filterFunc"],
  methods: {
    handler: function(filterName, predicate) {
      this.setCurrentFunc(filterName);
      this.filterFunc(predicate);
    }
  },
  components: {
    TodoFilter
  }
};
</script>

<style>
</style>
