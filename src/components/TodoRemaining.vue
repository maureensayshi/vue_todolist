<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: "todo-remianing",
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

