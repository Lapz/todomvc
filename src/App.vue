<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todo</h1>
        <input
          class="new-todo"
          type="text"
          name="description"
          placeholder="What needs to be done"
          v-model="newTodoDescription"
          @keyup.enter="addTodo"
        >
      </header>

      <TodoList
        v-if="todos.length != 0"
        :todos="todos"
        v-bind:toggle-done-func="toggleDone"
        v-bind:delete-todo="deleteTodo"
        v-bind:toggle-all="toggleAll"
      ></TodoList>

      <TodoControls
        v-if="todos.length != 0"
        v-bind:count="todoCount"
        v-bind:clear-func="clearCompleted"
        v-bind:filters="filters"
        v-bind:selected-filter="selected"
        v-bind:set-filter="setFilter"
        v-bind:filter-func="filter"
      ></TodoControls>
    </section>

    <footer class="info">
      <p>Double Click to edit a todo</p>
      <br>
      <p>
        Created by
        <a href="https://github.com/lapz">Lenard Pratt</a>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Todo from "./interfaces/Todo";
import Filter from "./interfaces/Filter";
import TodoControls from "./components/TodoControls.vue";
import TodoList from "./components/TodoList.vue";

@Component({
  components: {
    TodoControls,
    TodoList
  }
})
export default class App extends Vue {
  todos: Array<Todo> = [];
  newTodoDescription: string = "";
  selected: string = "All";
  filters: Array<Filter> = [
    {
      name: "All",
      fn: function(_todo: Todo): boolean {
        return true;
      }
    },
    {
      name: "Active",
      fn: function(todo: Todo): boolean {
        return todo.done == false;
      }
    },
    {
      name: "Completed",
      fn: function(todo: Todo): boolean {
        return todo.done == true;
      }
    }
  ];

  mounted(): void {
    if (localStorage.getItem("todos") != undefined) {
      this.todos = JSON.parse(localStorage.getItem("todos")!);
    }
  }

  addTodo(): void {
    let new_todo: Todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 0,
      description: this.newTodoDescription,
      done: false,
      seen: true
    };

    this.todos.push(new_todo);

    this.newTodoDescription = "";

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  toggleDone(id: number): void {
    for (let i = 0; i < this.todos.length; i += 1) {
      if (this.todos[i].id == id) {
        this.todos[i].done = !this.todos[i].done;
      }
    }

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  updateDescription(id: number): void {
    for (let i = 0; i < this.todos.length; i += 1) {
      if (this.todos[i].id == id) {
        this.todos[i].description = this.newTodoDescription;
      }
    }

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  clearCompleted(): void {
    let new_todos = new Array();

    for (let i = 0; i < this.todos.length; i += 1) {
      if (this.todos[i].done) {
        continue;
      }

      new_todos.push(this.todos[i]);
    }

    this.todos = new_todos;

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  deleteTodo(id: number): void {
    let new_todos = new Array();

    for (let i = 0; i < this.todos.length; i += 1) {
      if (this.todos[i].id == id) {
        continue;
      }

      new_todos.push(this.todos[i]);
    }

    this.todos = new_todos;
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  toggleAll(): void {
    for (let i = 0; i < this.todos.length; i += 1) {
      this.todos[i].done = true;
    }

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  setFilter(filter: string): void {
    this.selected = filter;
  }

  filter(pred: (todo: Todo) => boolean) {
    for (let i = 0; i < this.todos.length; i += 1) {
      if (pred(this.todos[i])) {
        this.todos[i].seen = true;
      } else {
        this.todos[i].seen = false;
      }
    }
  }

  get todoCount(): number {
    let v = this.todos.reduce((acc, current) => {
      if (!current.done) {
        acc += 1;
      }

      return acc;
    }, 0);

    return v;
  }
}
</script>

<style>
</style>
