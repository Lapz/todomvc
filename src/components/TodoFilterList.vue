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
<script lang="ts">
import TodoFilter from "./TodoFilter.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import Filter from "../interfaces/Filter";
import Todo from "../interfaces/Todo";

@Component({
  components: {
    TodoFilter
  }
})
export default class TodoFilterList extends Vue {
  @Prop() filters!: Array<Filter>;
  @Prop() current!: string;
  @Prop() setCurrentFunc!: (filter: string) => void;
  @Prop() filterFunc!: (predicate: (todo: Todo) => boolean) => void;

  handler(filterName: string, predicate: (todo: Todo) => boolean): void {
    this.setCurrentFunc(filterName);
    this.filterFunc(predicate);
  }
}
</script>

<style>
</style>
