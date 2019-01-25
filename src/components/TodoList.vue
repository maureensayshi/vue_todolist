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
      <todo-check-all></todo-check-all>
      <todo-remaining></todo-remaining>
    </div>

    <div class="extra-container">
      <todos-filter v-for="filter in filters" :key="filter.id" :filter="filter"></todos-filter>
    </div>

    <div>
      <to-clear-complete></to-clear-complete>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoRemaining from "./TodoRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TodosFilter from "./TodosFilter";
import ToClearComplete from "./ToClearComplete";
import { mapGetters } from "vuex";

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
      //   $store.state.idForTodo: 3,
      beforeEditCache: "",
      filters: ["all", "active", "completed"]
    };
  },
  created() {
    this.$store.commit("getData");
  },
  watch: {
    //to watch whick data property has changed
    todos() {
      window.localStorage.setItem(
        "todos",
        JSON.stringify(this.$store.state.todos)
      );
    }
  },
  methods: {
    addTodo() {
      //prevent blank newTodo
      if (this.newTodo.trim().length === 0) {
        return;
      }

      //觸發 action 中的 "addTodo", 提交(commit) mutations 裡的 "addTodo"
      this.$store.dispatch("addTodo", {
        id: this.$store.state.idForTodo,
        title: this.newTodo
      });

      this.newTodo = "";
      this.$store.state.idForTodo++;
    }
  },
  computed: {
    ...mapGetters(["anyRemaining", "todosFiltered"])
    // anyRemaining() {
    //   return this.$store.getters.anyRemaining;
    // },
    // todosFiltered() {
    //   return this.$store.getters.todosFiltered;
    // }
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
