<template>
  <div id="login">
    <h1>Login</h1>
    <input
      class="username"
      type="text"
      name="username"
      v-model="input.username"
      placeholder="Username"
    />
    <input
      class="password"
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
    />
    <b-button class="btn" variant="primary" v-on:click="login('b-toaster-top-center')">Login</b-button>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login(toaster, append = false) {
      let snapshot = await db.collection("login").get();
      let auth = false;
      if (this.input.username != "" && this.input.password != "") {
        snapshot.forEach(doc => {
          if (
            doc.data().username === this.input.username &&
            doc.data().password === this.input.password
          ) {
            auth = true;
          }
        });
      }
      if (auth) {
        this.$emit("authenticated", true);
        this.$router.replace({ name: "home" });
      } else {
        this.$bvToast.toast(`Wrong username or password.`, {
          title: `Login failed!`,
          variant: "danger",
          toaster: toaster,
          solid: true,
          appendToast: append
        });
      }
    }
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 100px;
  padding: 20px;
}
.btn {
  margin-top: 10px;
  width: 73px;
}
.username {
  margin-right: 10px;
  border: 1px solid #cccccc;
}
.password {
  margin-right: 10px;
  border: 1px solid #cccccc;
}
</style>