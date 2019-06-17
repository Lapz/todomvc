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

<script lang="ts">
import TodoCounter from "./TodoCounter.vue";
import TodoFilterList from "./TodoFilterList.vue";
import Todo from "../interfaces/Todo";
import Filter from "../interfaces/Filter";
import { Vue, Prop, Component } from "vue-property-decorator";

@Component({
  components: {
    TodoCounter,
    TodoFilterList
  }
})
export default class TodoControls extends Vue {
  @Prop() count!: number;
  @Prop() clearFunc!: () => void;
  @Prop() filters!: Array<Filter>;
  @Prop() selectedFilter!: string;
  @Prop() setFilter!: (filter: string) => void;
  @Prop() filterFunc!: (pred: (todo: Todo) => boolean) => void;
}
</script>

<style>
</style>
