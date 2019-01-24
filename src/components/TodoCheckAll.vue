<template>
  <div>
    <label>
      <input type="checkbox" :checked="!anyRemaining" @change="checkAll"> Check All
    </label>
  </div>
</template>

<script>
export default {
  name: "todo-remianing",
  props: {
    anyRemaining: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    checkAll() {
      eventBus.$emit("checkedAll", this.anyRemaining);
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

