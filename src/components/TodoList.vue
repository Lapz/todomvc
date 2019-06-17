<template>
  <section class="main">
    <ToggleAll :seen="todos.length > 0" :toggleFunc="toggleAll"></ToggleAll>
    <ul class="todo-list">
      <TodoItem
        v-for="item in seenTodos"
        :todo="item"
        :key="item.id"
        :toggle-func="toggleDoneFunc"
        :remove-func="deleteTodo"
      ></TodoItem>
    </ul>
  </section>
</template>

<script lang="ts">
import ToggleAll from "./ToggleAll.vue";
import TodoItem from "./TodoItem.vue";
import { Prop, Component, Vue } from "vue-property-decorator";
import Todo from "../interfaces/Todo";

@Component({
  components: {
    ToggleAll,
    TodoItem
  }
})
export default class TodoList extends Vue {
  @Prop() todos!: Array<Todo>;
  @Prop() toggleDoneFunc!: (id: number) => void;
  @Prop() deleteTodo!: (id: number) => void;
  @Prop() toggleAll!: () => void;

  get seenTodos(): Array<Todo> {
    let seen_todos = new Array();

    for (let i = 0; i < this.todos.length; i += 1) {
      if (this.todos[i].seen) {
        seen_todos.push(this.todos[i]);
      }
    }

    return seen_todos;
  }
}
</script>

<style>
</style>
