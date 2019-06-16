<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
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
        v-bind:update-todo-status="updateDone"
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

<script>
import TodoControls from "./components/TodoControls.vue";
import TodoList from "./components/TodoList.vue";

export default {
  name: "app",
  components: {
    TodoControls,
    TodoList
  },

  mounted: function() {
    if (localStorage.getItem("todos") != undefined) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
      // console.log(this.data.todos);
    }
  },
  data: function() {
    return {
      newTodoDescription: "",
      todos: [],
      selected: "All",
      filters: [
        {
          name: "All",
          fn: function(_todo) {
            return true;
          }
        },
        {
          name: "Active",
          fn: function(todo) {
            return todo.done == false;
          }
        },
        {
          name: "Completed",
          fn: function(todo) {
            return todo.done == true;
          }
        }
      ]
    };
  },
  computed: {
    todoCount: function() {
      let v = this.todos.reduce((acc, current) => {
        if (!current.done) {
          acc += 1;
        }

        return acc;
      }, 0);

      return v;
    }
  },
  methods: {
    addTodo: function() {
      let new_todo = {
        id:
          this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 0,
        description: this.newTodoDescription,
        done: false,
        seen: true
      };

      this.todos.push(new_todo);

      this.newTodoDescription = "";

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    updateDone: function(id) {
      for (let i = 0; i < this.todos.length; i += 1) {
        if (this.todos[i].id == id) {
          this.todos[i].done = !this.todos[i].done;
        }
      }
    },

    updateDescription: function(id) {
      for (let i = 0; i < this.todos.length; i += 1) {
        if (this.todos[i].id == id) {
          this.todos[i].description = this.newTodoDescription;
        }
      }
    },

    clearCompleted: function() {
      let new_todos = new Array();

      for (let i = 0; i < this.todos.length; i += 1) {
        if (this.todos[i].done) {
          continue;
        }

        new_todos.push(this.todos[i]);
      }

      this.todos = new_todos;
    },

    deleteTodo: function(id) {
      let new_todos = new Array();

      for (let i = 0; i < this.todos.length; i += 1) {
        if (this.todos[i].id == id) {
          continue;
        }

        new_todos.push(this.todos[i]);
      }

      this.todos = new_todos;
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },

    toggleAll: function() {
      for (let i = 0; i < this.todos.length; i += 1) {
        this.todos[i].done = true;
      }
    },

    setFilter: function(filter) {
      this.selected = filter;
    },

    filter: function(pred) {
      for (let i = 0; i < this.todos.length; i += 1) {
        if (pred(this.todos[i])) {
          this.todos[i].seen = true;
        } else {
          this.todos[i].seen = false;
        }
      }
    }
  }
};
</script>

<style>
</style>
