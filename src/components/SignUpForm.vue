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
      type="email"
      ref="email_input"
      placeholder="Email"
    />
    <input
      class="signup_input"
      type="password"
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
      // Basic empty validity check
      this.input_fields = document.querySelectorAll(`.signup_input`);
      for (let i = 0; i < this.input_fields.length; i++) {
        if (this.input_fields[i].value === ``) {
          this.$root.$emit(`notification`, `Please fill in all the fields`);
          return;
        }
      }
      // Basic email validity check
      let email = this.$refs[`email_input`].value;
      if (email.includes(`@`, `.`) === false) {
        this.$root.$emit(`notification`, `Please enter a valid email address`);
        return;
      }
      this.$root.$emit(
        `notification`,
        `<img width="35px" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif">`
      );
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