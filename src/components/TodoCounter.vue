<template>
  <span class="todo-count">
    <strong>{{count}}</strong>
    items left
  </span>
</template>

<script>
export default {
  name: "TodoCounter",
  props: {
    count: Number
  }
};
</script>

<style>
</style>
