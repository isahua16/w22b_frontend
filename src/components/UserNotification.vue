<template>
  <div>
    <h3>{{ message }}</h3>
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