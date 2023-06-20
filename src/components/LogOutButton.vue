<template>
  <div>
    <button @click="delete_token">Log Out</button>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
    delete_token() {
      this.$root.$emit(`notification`, ``);
      let token = cookies.get("token");
      this.$root.$emit(
        `notification`,
        `<img width="35px" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif">`
      );
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/login`,
          method: `DELETE`,
          data: {
            token: token,
          },
        })
        .then(() => {
          this.$root.$emit(`notification`, ``);
          cookies.remove(`token`);
          this.$router.push(`/`);
        })
        .catch(() => {
          this.$root.$emit(
            `notification`,
            `An error occured. Try again later.`
          );
        });
    },
  },
};
</script>

<style scoped>
</style>