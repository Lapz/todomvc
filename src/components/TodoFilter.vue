<template>
  <li>
    <a :class="(selected) ? 'selected' : ''">{{text}}</a>
  </li>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class TodoFilter extends Vue {
  @Prop() selected!: boolean;
  @Prop() text!: string;
}
</script>

<style>
</style>
