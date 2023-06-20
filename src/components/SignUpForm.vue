<template>
  <div>
    <h3>Sign Up</h3>
    <input
      class="signup_input"
      type="text"
      ref="username_input"
      placeholder="Username"
    />
    <input
      class="signup_input"
      type="text"
      ref="email_input"
      placeholder="Email"
    />
    <input
      class="signup_input"
      type="text"
      ref="password_input"
      placeholder="Password"
    />
    <input
      class="signup_input"
      type="text"
      ref="image_url_input"
      placeholder="Image URL"
    />
    <textarea
      class="signup_input"
      type="text"
      ref="bio_input"
      style="font-family: sans-serif"
      placeholder="Bio"
    ></textarea>
    <button @click="sign_up">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
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
    sign_up() {
      this.$root.$emit(`notification`, ``);
      this.input_fields = document.querySelectorAll(`.signup_input`);
      for (let i = 0; i < this.input_fields.length; i++) {
        if (this.input_fields[i].value === ``) {
          this.$root.$emit(`notification`, `Please fill in all the fields`);
          return;
        }
      }
      this.$root.$emit(`notification`, `loading...`);
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          method: `POST`,
          data: {
            username: this.$refs[`username_input`].value,
            email: this.$refs[`email_input`].value,
            password: this.$refs[`password_input`].value,
            image_url: this.$refs[`image_url_input`].value,
            bio: this.$refs[`bio_input`].value,
          },
        })
        .then(() => {
          this.$root.$emit(
            `notification`,
            `Sign up successful. Please log in to proceed`
          );
          this.reset_fields(this.input_fields);
        })
        .catch(() => {
          this.reset_fields(this.input_fields);
          this.$root.$emit(`notification`, `An error occured. Try again.`);
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