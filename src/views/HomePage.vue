<template>
  <div>
    <sign-up-form></sign-up-form>
    <log-in-form></log-in-form>
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
import LogInForm from "@/components/LogInForm.vue";
export default {
  components: {
    SignUpForm,
    LogInForm,
  },
};
</script>

<style scoped>
</style>