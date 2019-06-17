<template>
  <span class="todo-count">
    <strong>{{count}}</strong>
    items left
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class TodoCounter extends Vue {
  @Prop() count!: number;
}
</script>

<style>
</style>
