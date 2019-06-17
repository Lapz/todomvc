<template>
  <li :class="getClass">
    <div class="view">
      <input class="toggle" type="checkbox" @click="toggleFunc(todo.id)">
      <label @dblclick="editing=!editing">{{todo.description}}</label>
      <button class="destroy" @click="removeFunc(todo.id)"></button>
    </div>
    <input class="edit" type="text" v-model="todo.description" @dblclick="editing=!editing">
  </li>
</template>

<script lang="ts">
import Todo from "../interfaces/Todo";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class TodoItem extends Vue {
  editing: boolean = false;

  @Prop() todo!: Todo;
  @Prop() toggleFunc!: (id: number) => void;
  @Prop() removeFunc!: (id: number) => void;
  get getClass(): string {
    if (this.todo.done) {
      return "completed";
    } else if (this.editing) {
      return "editing";
    } else {
      return "";
    }
  }
}
</script>

<style>
</style>
