<template>
  <div>
    <input id="toggle-all" class="toggle-all" type="checkbox" v-if="seen" @click="toggleFunc">
    <label for="toggle-all" title="Mark all as complete"></label>
  </div>
</template>

<script>
export default {
  name: "ToggleAll",
  props: ["toggleFunc", "seen"]
};
</script>

<style>
</style>
