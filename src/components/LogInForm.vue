<template>
  <div>
    <h3>Log In</h3>
    <input
      class="login_input"
      type="text"
      ref="username_input"
      placeholder="Username"
    />
    <input
      class="login_input"
      type="text"
      ref="password_input"
      placeholder="Password"
    />
    <button @click="log_in">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    return {
      input_fields: [],
    };
  },
  methods: {
    reset_fields(input_fields) {
      for (let i = 0; i < input_fields.length; i++) {
        input_fields[i].value = ``;
      }
    },
    log_in() {
      this.$root.$emit(`notification`, ``);
      this.input_fields = document.querySelectorAll(`.login_input`);
      for (let i = 0; i < this.input_fields.length; i++) {
        if (this.input_fields[i].value === ``) {
          this.$root.$emit(`notification`, `Please fill in all the fields`);
          return;
        }
      }
      this.$root.$emit(`notification`, `Loading...`);
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/login`,
          method: `POST`,
          data: {
            username: this.$refs[`username_input`].value,
            password: this.$refs[`password_input`].value,
          },
        })
        .then((res) => {
          if (res[`data`].length < 1) {
            this.$root.$emit(
              `notification`,
              `Authentification failed. Try again`
            );
            this.reset_fields(this.input_fields);
            return;
          } else {
            cookies.set(`token`, res[`data`][0][`token`]);
            this.$router.push(`/profile`);
          }
        })
        .catch(() => {
          this.reset_fields(this.input_fields);
          this.$root.$emit(`notification`, `Log in failed. Try again.`);
        });
    },
  },
};
</script>

<style scoped>
div {
  display: grid;
  place-items: center;
  gap: 20px;
}
</style>