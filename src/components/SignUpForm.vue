<template>
  <div>
    <h3>Sign Up</h3>
    <input
      class="input"
      type="text"
      ref="username_input"
      placeholder="Username"
    />
    <input class="input" type="text" ref="email_input" placeholder="Email" />
    <input
      class="input"
      type="text"
      ref="password_input"
      placeholder="Password"
    />
    <input
      class="input"
      type="text"
      ref="image_url_input"
      placeholder="Image URL"
    />
    <textarea
      class="input"
      type="text"
      ref="bio_input"
      style="font-family: sans-serif"
      placeholder="Bio"
    ></textarea>
    <button @click="sign_up">Submit</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      message: undefined,
    };
  },
  methods: {
    reset_fields(input_fields) {
      for (let i = 0; i < input_fields.length; i++) {
        input_fields[i].value = ``;
      }
    },
    sign_up() {
      this.message = ``;
      let input_fields = document.querySelectorAll(`.input`);
      for (let i = 0; i < input_fields.length; i++) {
        if (input_fields[i].value === ``) {
          this.message = `Please fill in all the fields`;
          return;
        }
      }
      this.message = `Loading...`;
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
        .then((res) => {
          console.log(res);
          this.message = `Sign up successful. Please log in to proceed`;
          this.reset_fields(input_fields);
        })
        .catch((err) => {
          console.log(err);
          this.reset_fields(input_fields);
          this.message = `An error occured. Try again.`;
        });
    },
  },
};
</script>

<style scoped>
div {
  display: grid;
  place-items: center;
  width: 500px;
  gap: 20px;
}
</style>