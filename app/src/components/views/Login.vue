<template>
  <div id="login" >
    <h1>Login</h1>
    <b-navbar  type="light" variant="light">
      <b-nav-form class="d-flex justify-content-center">
        <b-input-group  prepend="@">
          <b-form-input
            class="username"
            type="text"
            name="username"
            v-model="input.username"
            placeholder="Username"
          ></b-form-input>
        </b-input-group>
        <b-input-group class="mt-2"  prepend="➤">
          <b-form-input
            class="password"
            type="password"
            name="password"
            v-model="input.password"
            placeholder="Password"
          ></b-form-input>
        </b-input-group>
      </b-nav-form>
    </b-navbar>
    <b-button class="log-btn" variant="success" v-on:click="login('b-toaster-top-center')">Login</b-button>
    <b-button class="reg-btn" variant="primary" @click="showModal">Register</b-button>

    <b-modal ref="modal" hide-footer title="Register a new account">
      <div class="d-block text-center">
        <b-form
          @submit.prevent="onSubmit('b-toaster-top-center')"
          @reset.prevent="onReset"
          v-if="show"
        >
          <b-form-group class="d-block text-left" id="input-group-1" label="Username: " label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.username"
              required
              placeholder="Enter your username"
            ></b-form-input>
          </b-form-group>

          <b-form-group class="d-block text-left" id="input-group-2" label="Password: " label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter your password"
            ></b-form-input>
          </b-form-group>
          <b-button class="mr-2" type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>


<script>

import { db } from "@/main";
export default {
  name: "Login",
  props: ["app"],
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      form: {
        username: "",
        password: ""
      },
      show: true,
      isSubmittable: true,
      asd: true
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
            this.$parent.tabAuth = doc.data().auth;
            (this.$parent.user = doc.data().username),
              (this.$parent.pass = doc.data().password);
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
    },
    async onSubmit(toaster, append = false) {
      let snapshot = await db.collection("login").get();
      let available = true;
      snapshot.forEach(doc => {
        if (
          doc.data().username === this.form.username ||
          (doc.data().username === this.form.username &&
            doc.data().password === this.input.password)
        ) {
          available = false;
          this.isSubmittable = false;
        }
      });
      if (available) {
        await db.collection("login").add({
          username: this.form.username,
          password: this.form.password,
          auth: false
        });
        this.form.username = "";
        this.form.password = "";

        this.$bvToast.toast(`Successful registration!`, {
          title: `Register`,
          toaster: toaster,
          solid: true,
          appendToast: append
        });
      } else {
        this.$bvToast.toast(`This username is already in use!`, {
          title: `Register`,
          variant: "danger",
          toaster: toaster,
          solid: true,
          appendToast: append
        });
      }
    },
    onReset() {
      this.form.username = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    showModal() {
      this.$refs["modal"].show();
      this.form.username = "";
      this.form.password = "";
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
.reg-btn {
  margin-top: 10px;
  width: 100px;
}
.log-btn {
  margin-top: 10px;
  width: 100px;
  margin-right: 10px;
}
.username {
  border: 1px solid #cccccc;
}
.password {
  border: 1px solid #cccccc;
}
</style>