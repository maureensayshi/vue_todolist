<template>
  <div>
    <input type="button" :value="filter" @click="changeFilter(filter)">
  </div>
</template>

<script>
export default {
  name: "todo-do-filter",
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.state.filterCurrent = filter;
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

