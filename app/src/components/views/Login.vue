<template>
  <div id="login">
    <h1>Login</h1>
    <input class = "username" type="text" name="username" v-model="input.username" placeholder="Username" />
    <input class = "password" type="password" name="password" v-model="input.password" placeholder="Password" />
    <b-button class = "btn" variant="primary" v-on:click="login('b-toaster-top-center')">Login</b-button>
  </div>
</template>

<script>
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
    login(toaster, append = false) {
      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.$parent.mockAccount.username &&
          this.input.password == this.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "home" });
        } else {
          this.$bvToast.toast(`Wrong username or password.`, {
            title: `Login failed!`,
            variant:"danger",
            toaster: toaster,
            solid: true,
            appendToast: append
          });
        }
      } else {
        console.log("A username and password must be present");
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
.username{
    margin-right: 10px;
    border: 1px solid #cccccc;
}
.password{
    margin-right: 10px;
    border: 1px solid #cccccc;
}
</style>