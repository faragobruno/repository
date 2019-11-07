<template>
  <div id="app">
    <div id="nav" v-if="this.$route.path !== '/login'">
      <Header />
      <router-link to="/home"> Home |</router-link>
      <router-link v-if="tabAuth" to="/datas"> Datas |</router-link>
      <router-link v-if="tabAuth" to="/requests"> Requests |</router-link>
      <router-link to="/calendar"> Calendar |</router-link>
      <router-link v-if="tabAuth" to="/analyse"> Analytics |</router-link>
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace> Logout</router-link>
    </div>
    <b-container>
      <router-view @authenticated="setAuthenticated" />
    </b-container>
  </div>
</template>

<script>
import Header from "./components/layout/Header";

export default {
  name: "app",
  components: {
    Header
  },
  data() {
    return {
      authenticated: false,
      tabAuth: false
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#nav {
  padding: 10px;
  margin: auto;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
