<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: "todo-remianing",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

