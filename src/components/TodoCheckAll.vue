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
  methods: {
    checkAll() {
      //event.target.checked 是指 check all 的 checkbox 的 checked 狀態
      this.$store.commit("checkAll", event.target.checked);
    }
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  }
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

