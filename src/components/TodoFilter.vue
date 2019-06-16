<template>
  <li>
    <a :class="(selected) ? 'selected' : ''">{{text}}</a>
  </li>
</template>

<script>
export default {
  name: "TodoFilter",
  props: {
    selected: Boolean,
    text: String
  }
};
</script>

<style>
</style>
