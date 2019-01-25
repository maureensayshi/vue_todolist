<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div
        v-if="!editing"
        class="todo-item-label"
        :class="{linethrough:completed}"
        @dblclick="editTodo"
      >{{title}}</div>
      <input
        v-if="editing"
        type="text"
        class="todo-item-edit"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      >
    </div>
    <div class="remove-item" @click="removeTodo(todo.id)">&times</div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  watch: {
    checkAll() {
      console.log("test", this.completed);
      console.log("checkAll", this.checkAll);

      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    removeTodo(id) {
      this.$store.commit("removingTodo", id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() === "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;

      this.$store.commit("updateTodo", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    },
    cancelEdit(todo) {
      this.title = this.beforeEditCache;
      this.editing = false;
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

