Vue.component('todo-count', {
    props: ['count'],
    template: `
        <span class="todo-count">
            <strong> {{count}} </strong>
            items left

        </span>
    `,
});


Vue.component('todo-filter-list', {
    template: `
        <ul class="filters"> 
            <todo-filter 
                v-for="(filter,index) in filters" 
                v-bind:text ="filter.name" 
                v-bind:key="index"
                v-bind:selected="filter.name==current"
                v-on:click.native="handler(filter.name,filter.fn)"
            ></todo-filter>
        </ul>
    `,

    methods: {
        handler:function(filterName,pred) {
            this.setCurrentFunc(filterName);
            this.filterFunc(pred);
        }
    },
    props: ['filters', 'current','setCurrentFunc','filterFunc']
});


Vue.component('todo-filter', {
    template: `
        <li> 
            <a v-bind:class="(selected) ? 'selected' : '' " > {{text}} </a>
        </li>
    `,
    props: ['selected', 'text']
});

Vue.component('todo-controls', {
    props: ['count','clearFunc','filters','selectedFilter','setFilter','filterFunc'],
    template: `
    <footer class='footer'>
        <todo-count v-bind:count=count></todo-count>

        <todo-filter-list 
            v-bind:filters=filters 
            v-bind:current=selectedFilter 
            v-bind:set-current-func=setFilter
            v-bind:filter-func =filterFunc
        ></todo-filter-list>

        <button class="clear-completed" v-on:click="clearFunc">Clear completed</button>
    
    </footer>
    `
});


Vue.component('todo-item',{
    template:`
        <li v-bind:class="(todo.done) ? 'completed' : '' ">
            <div class="view">
                <input class='toggle' type='checkbox' v-on:click="toggleFunc(todo.id)">
                <label> {{todo.description}} </label>
                <button class="destroy" v-on:click="removeFunc(todo.id)"></button>
            </div>
        </li>`,
    props: ['todo', 'toggleFunc','removeFunc'],
});

Vue.component('todo-toggle-all', {
    template: `
        <div>
            <input id="toggle-all" class="toggle-all" type="checkbox" v-if="seen" v-on:click="toggleFunc">
            <label for="toggle-all" title="Mark all as complete"></label>
        </div>
    `,
    props: ['toggleFunc','seen']
})

Vue.component('todo-list', {
    template:`
        <section class="main">
        
        <todo-toggle-all
            v-bind:seen="todos.length > 0"
            v-bind:toggleFunc="toggleAll"
        ></todo-toggle-all>
        
        <ul class="todo-list">
           

           <todo-item 
                    
                    v-for="item in todos"
                    v-if="item.seen"
                    v-bind:todo ="item"
                    v-bind:key = "item.id"
                    v-bind:toggle-func= "updateTodoStatus"
                    v-bind:remove-func = "deleteTodo"
           ></todo-item>

        </ul>

        </section>
    `,
    props: ['todos','updateTodoStatus','deleteTodo','toggleAll'],
});




let app = new Vue({
    el:"#app",
    data: {
        message: "Hello Vue",
        newTodoDescription:"",
        todos: [{
            description: "Learn Vue.js",
            done:false,
            seen:true,
            id:0
        }],
        selected:"All",
        // filters: ["All","Active","Completed"],
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
            },

        ]
    },

    computed: {
        todoCount: function () {
            let v =this.todos.reduce((acc,current) =>{
                if (!current.done ) {
                    acc += 1;
                }

                return acc;
            },0);

            console.log(v);
            return  v;
        }
    },

    methods: {
        addTodo: function () {
            let new_todo = {
                id: (this.todos.length > 0) ? this.todos[this.todos.length-1].id + 1: 0 ,
                description: this.newTodoDescription,
                done:false,
                seen:true,
            };

            this.todos.push(new_todo);

            this.newTodoDescription = "";
        },
        updateDone: function (id) {
            this.todos[id].done = !(this.todos[id].done);
        },

        updateDescription: function (id) {
            this.todos[id].description = this.newTodoDescription;
        },

        clearCompleted: function () {
        
            let new_todos = new Array();

            for (let i =0; i < this.todos.length; i += 1) {
               
                if (this.todos[i].done) {
                    continue;
                }

                new_todos.push(this.todos[i]);
            }

            this.todos = new_todos;
        },

        deleteTodo: function (id) {
            let new_todos = new Array();

            for (let i =0; i < this.todos.length; i += 1) {
               
                if (this.todos[i].id == id) {
                
                    continue;
                }

                new_todos.push(this.todos[i]);
            }

            this.todos = new_todos;
        },

        toggleAll: function() {
            for (let i =0; i < this.todos.length; i += 1) {
               
                this.todos[i].done = true;
            }
        },

        setFilter: function (filter) {
            this.selected = filter;
        },

        filter: function (pred) {
            for (let i =0; i < this.todos.length; i += 1) {
               
                if(pred(this.todos[i])) {
                    this.todos[i].seen = true;
                }else {
                    this.todos[i].seen = false;
                }
            }
        }
    }
})


