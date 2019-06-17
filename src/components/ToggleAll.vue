<template>
  <div>
    <input id="toggle-all" class="toggle-all" type="checkbox" v-if="seen" @click="toggleFunc">
    <label for="toggle-all" title="Mark all as complete"></label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ToggleAll extends Vue {
  @Prop() toggleFunc!: () => void;
  @Prop() seen!: boolean;
}
</script>

<style>
</style>
