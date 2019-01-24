<template>
  <div>
    <button v-if="showClearCompletedButton" @click="clearCompletedCheck">Clear Completed</button>
  </div>
</template>

<script>
export default {
  name: "to-clear-completed",
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompletedCheck() {
      eventBus.$emit("clearCompletedChecked");
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

