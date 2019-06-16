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

<script>
export default {
  name: "TodoItem",
  props: ["todo", "toggleFunc", "removeFunc"],
  data: function() {
    return {
      editing: false
    };
  },
  computed: {
    getClass: function() {
      if (this.todo.done) {
        return "completed";
      } else if (this.editing) {
        return "editing";
      } else {
        return "";
      }
    }
  }
};
</script>

<style>
</style>
