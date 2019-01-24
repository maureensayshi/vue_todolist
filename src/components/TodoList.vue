<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="what needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    >

    <todo-item
      v-for="(todo, index) in todosFiltered"
      :key="todo.id"
      :todo="todo"
      :checkAll="!anyRemaining"
    ></todo-item>

    <div class="extra-container">
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-remaining :remaining="remaining"></todo-remaining>
    </div>

    <div class="extra-container">
      <todos-filter v-for="filter in filters" :key="filter.id" :filter="filter"></todos-filter>
    </div>

    <div>
      <to-clear-complete :showClearCompletedButton="showClearCompletedButton"></to-clear-complete>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoRemaining from "./TodoRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TodosFilter from "./TodosFilter";
import ToClearComplete from "./ToClearComplete";

export default {
  name: "todos",
  components: {
    TodoItem,
    TodoRemaining,
    TodoCheckAll,
    TodosFilter,
    ToClearComplete
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 0,
      beforeEditCache: "",
      filters: ["all", "active", "completed"],
      filterCurrent: "all",
      todos: []
    };
  },
  created() {
    this.getData();
    eventBus.$on("finishedEdit", data => this.finishEdit(data));
    eventBus.$on("removedTodo", id => this.removeTodo(id));
    eventBus.$on("checkedAll", checked => this.checkAllTodos(checked));
    eventBus.$on(
      "changedFilter",
      currentFilter => (this.filterCurrent = currentFilter)
    );
    eventBus.$on("clearCompletedChecked", () => this.clearCompleted());
  },
  watch: {
    //to watch whick data property has changed
    todos() {
      window.localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  },
  beforeDestroy() {
    eventBus.$off("finishedEdit");
    eventBus.$off("removedTodo");
    eventBus.$off("checkedAll");
    eventBus.$off("changedFilter");
    eventBus.$off("clearCompletedChecked");
  },
  methods: {
    getData() {
      if (JSON.parse(window.localStorage.getItem("todos"))) {
        this.todos = JSON.parse(window.localStorage.getItem("todos"));
        this.idForTodo = this.todos[this.todos.length - 1].id + 1;
      }
    },
    addTodo() {
      //prevent blank newTodo
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      });
      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(id) {
      const index = this.todos.findIndex(item => item.id == id);
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      //event.target.checked 是指 check all 的 checkbox 的 checked 狀態
      this.todos.forEach(todo => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    finishEdit(data) {
      const index = this.todos.findIndex(item => item.id === data.id);
      this.todos.splice(index, 1, data);
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      //if remaining is 0, it will return false.
      return this.remaining !== 0;
    },
    todosFiltered() {
      if (this.filterCurrent == "all") {
        return this.todos;
      } else if (this.filterCurrent == "active") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filterCurrent == "completed") {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; //override defaults

  &:focus {
    outline: none;
  }
}

.linethrough {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}
</style>
