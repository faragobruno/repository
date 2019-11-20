<template>
  <div id="app">
    <div>
      <div v-if="this.$route.path !== '/login'">
      <Header />
        <nav v-on:click.prevent>
          <router-link to="/home">
            <font-awesome-icon icon="home" /> Home
          </router-link>
          <router-link v-if="tabAuth != 2" to="/datas">
            <font-awesome-icon icon="archive" /> Datas
          </router-link>
          <router-link v-if="tabAuth != 2" to="/requests" >
            <font-awesome-icon icon="pen" /> Bookings
          </router-link>
          <router-link to="/calendar">
            <font-awesome-icon icon="calendar-alt" /> Calendar
          </router-link>
          <router-link to="/creditdatas">
            <font-awesome-icon icon="dollar-sign" /> Credit
          </router-link>
          <router-link v-if="tabAuth != 2" to="/analyse" >
            <font-awesome-icon icon="chart-bar" /> Analytics
          </router-link>
          <router-link v-if="tabAuth != 2" to="/users">
            <font-awesome-icon icon="user-circle" /> Users
          </router-link>
          <router-link to="/profile">
            <font-awesome-icon icon="user" /> Profile
          </router-link>
          <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>
            <b-button variant="danger" size="sm">Logout</b-button>
          </router-link>
        </nav>
      </div>
      <b-container>
      <router-view @authenticated="setAuthenticated" />
    </b-container>
    </div>
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
  margin-top: 30px;
}
* {
  margin: 0;
  padding: 0;
}

body {
  font: 15px/1.3 "Open Sans", sans-serif;
  color: #5e5b64;
  text-align: center;
}


a:visited {
  text-decoration: none;
  background-color: #555;
  color: white;
}

a:hover {
  text-decoration: none;
  background-color: #555;
  color: white;
}

a:focus {
  text-decoration: none;
  background-color: rgb(104, 98, 98);
  color: white;
}

section,
footer,
header,
aside,
nav {
  display: block;
}

/*-------------------------
    The menu
--------------------------*/

nav {
  display: inline-block;
  margin: 0px auto 0px;
  background-color: gray;
  box-shadow: 0 1px 1px #ccc;
  border-radius: 2px;
  width: 1000px;
}

nav a {
  display: inline-block;
  padding: 10px 10px;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none !important;
  line-height: 1;
  text-transform: uppercase;
  background-color: transparent;

  -webkit-transition: background-color 0.25s;
  -moz-transition: background-color 0.25s;
  transition: background-color 0.25s;
}

nav a:first-child {
  border-radius: 2px 0 0 2px;
}

nav a:last-child {
  border-radius: 0 2px 2px 0;
}

nav.home .home,
nav.datas .datas,
nav.requests .requests,
nav.bookings .bookings,
nav.calendar .calendar,
nav.credit .credit,
nav.analytics .analytics,
nav.users .users,
nav.profile .profile {
  background-color: #e35885;
}

p {
  font-size: 22px;
  font-weight: bold;
}

p b {
  color: #ffffff;
  display: inline-block;
  padding: 5px 10px;
  background-color: #c4d7e0;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 18px;
}
.resource {
  margin: 20px 0;
}
</style>
