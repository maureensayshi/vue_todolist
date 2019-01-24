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
  data() {
    return {};
  },
  methods: {
    changeFilter(filter) {
      console.log(filter);

      eventBus.$emit("changedFilter", filter);
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

