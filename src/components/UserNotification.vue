<template>
  <div>
    <div v-html="message"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: undefined,
    };
  },
  mounted() {
    this.$root.$on(`notification`, (message) => {
      this.message = message;
    });
  },
};
</script>

<style scoped>
</style>