<template>
  <div id="app">
    <user-notification></user-notification>
    <router-view />
  </div>
</template>

<script>
import UserNotification from "@/components/UserNotification.vue";
export default {
  components: {
    UserNotification,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  place-items: center;
}
</style>
