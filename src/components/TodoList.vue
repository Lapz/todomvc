<template>
  <section class="main">
    <ToggleAll :seen="todos.length > 0" :toggleFunc="toggleAll"></ToggleAll>
    <ul class="todo-list">
      <TodoItem
        v-for="item in seenTodos"
        :todo="item"
        :key="item.id"
        :toggle-func="updateTodoStatus"
        :remove-func="deleteTodo"
      ></TodoItem>
    </ul>
  </section>
</template>

<script>
import ToggleAll from "./ToggleAll.vue";
import TodoItem from "./TodoItem.vue";

export default {
  name: "TodoList",
  props: ["todos", "updateTodoStatus", "deleteTodo", "toggleAll"],
  components: {
    ToggleAll,
    TodoItem
  },
  computed: {
    seenTodos: function() {
      let seen_todos = new Array();

      for (let i = 0; i < this.todos.length; i += 1) {
        if (this.todos[i].seen) {
          seen_todos.push(this.todos[i]);
        }
      }

      return seen_todos;
    }
  }
};
</script>

<style>
</style>
