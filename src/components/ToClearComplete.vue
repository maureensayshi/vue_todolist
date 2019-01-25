<template>
  <div>
    <button v-if="showClearCompletedButton" @click="clearCompletedCheck">Clear Completed</button>
  </div>
</template>

<script>
export default {
  name: "to-clear-completed",
  methods: {
    clearCompletedCheck() {
      this.$store.state.todos = this.$store.state.todos.filter(
        todo => !todo.completed
      );
    }
  },
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

