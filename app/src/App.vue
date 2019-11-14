<template>
  <div id="app">
    <div id="nav" v-if="this.$route.path !== '/login'">
      <Header />
      <i> <font-awesome-icon icon="home" /></i><router-link to="/home"> Home </router-link><i>| </i>
      <i v-if="tabAuth != 2"> <font-awesome-icon icon="archive"/></i><router-link v-if="tabAuth != 2" to="/datas"> Datas </router-link><i v-if="tabAuth != 2">| </i>
      <i v-if="tabAuth != 2"> <font-awesome-icon icon="pen" /></i><router-link v-if="tabAuth != 2" to="/requests"> Requests </router-link><i v-if="tabAuth != 2">| </i>
      <i> <font-awesome-icon icon="calendar-alt" /></i><router-link to="/calendar"> Calendar </router-link><i>| </i>
      <i> <font-awesome-icon icon="dollar-sign"/></i><router-link to="/creditdatas"> Credit </router-link><i>| </i>
      <i v-if="tabAuth != 2"> <font-awesome-icon icon="chart-bar"/></i><router-link v-if="tabAuth != 2" to="/analyse"> Analytics </router-link><i v-if="tabAuth != 2">| </i>
      <i v-if="tabAuth != 2"> <font-awesome-icon icon="user-circle"/></i><router-link v-if="tabAuth != 2" to="/users"> Users </router-link><i v-if="tabAuth != 2">| </i>
      <router-link  v-if="authenticated" to="/login" v-on:click.native="logout()" replace><b-button variant="outline-danger" size="sm"> Logout </b-button> </router-link> 
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
    Header,
  },
  data() {
    return {
      authenticated: false,
      tabAuth: "",
      user: "",
      pass: ""
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
