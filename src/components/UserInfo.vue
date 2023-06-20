<template>
  <div>
    <header>
      <h3>User Dashboard</h3>
      <log-out-button></log-out-button>
    </header>
    <article v-for="(el, i) in client_info" :key="i">
      <img :src="el[`image_url`]" :alt="`Image of ${el[`username`]}`" />
      <p>{{ el[`username`] }}</p>
      <p>{{ el[`email`] }}</p>
    </article>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import LogOutButton from "@/components/LogOutButton.vue";
export default {
  components: {
    LogOutButton,
  },
  data() {
    return {
      client_info: undefined,
    };
  },
  mounted() {
    this.get_info();
  },
  methods: {
    get_info() {
      this.$root.$emit(`notification`, ``);
      let token = cookies.get(`token`);
      this.$root.$emit(`notification`, `Loading...`);
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          params: {
            token: token,
          },
        })
        .then((res) => {
          console.log(res);
          this.$root.$emit(`notification`, ``);
          if (res[`data`].length < 1) {
            cookies.remove(`token`);
            this.$router.push(`/`);
          } else {
            this.client_info = res[`data`];
          }
        })
        .catch((err) => {
          console.log(err);
          this.$root.$emit(
            `notification`,
            `An error occured. Try logging in again.`
          );
        });
    },
  },
};
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
}
img {
  width: 200px;
}
</style>