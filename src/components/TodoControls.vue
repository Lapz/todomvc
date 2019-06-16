<template>
  <footer class="footer">
    <TodoCounter :count="count"></TodoCounter>
    <TodoFilterList
      :filters="filters"
      :current="selectedFilter"
      :set-current-func="setFilter"
      :filter-func="filterFunc"
    ></TodoFilterList>

    <button class="clear-completed" @click="clearFunc">Clear Completed</button>
  </footer>
</template>

<script>
import TodoCounter from "./TodoCounter.vue";
import TodoFilterList from "./TodoFilterList";

export default {
  name: "TodoControls",
  props: [
    "count",
    "clearFunc",
    "filters",
    "selectedFilter",
    "setFilter",
    "filterFunc"
  ],
  components: {
    TodoCounter,
    TodoFilterList
  }
};
</script>

<style>
</style>
