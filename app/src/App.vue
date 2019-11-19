<template>
  <div id="app">
    <div v-if="this.$route.path !== '/login'">
      <Header />
      
      <sidebar-menu :menu="menu" >
        <span slot="toggle-icon"><font-awesome-icon icon="home" /></span>
      </sidebar-menu>
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
  props:{
    width: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      authenticated: false,
      tabAuth: "",
      user: "",
      pass: "",
      menu: [
        {
          header: true,
          title: "Main Navigation",
          hiddenOnCollapse: true
        },
        {
          href: "/home",
          title: "Home",
          icon: "fa fa-home"
        },
        {
          href: "/datas",
          title: "Datas",
          icon: "fa fa-archive"
        },
        {
          href: "/requests",
          title: "Request",
          icon: "fa fa-pen"
        },
        {
          href: "/calendar",
          title: "Calendar",
          icon: "fa fa-calendar-alt"
        },
        {
          href: "/creditdatas",
          title: "Credit",
          icon: "fa fa-dollar-sign"
        },
        {
          href: "/analyse",
          title: "Analyse",
          icon: "fa fa-chart-bar"
        },
        {
          href: "/users",
          title: "Users",
          icon: "fa fa-user-circle"
        },
        {
          href: "/profile",
          title: "Profile",
          icon: "fa fa-user"
        },
        {
          href: "/login",
          title: "Logout",
          icon: "fa fa-sign-out-alt"
        }
      ]
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
  margin-top: 100px;
}
.nav-item-es {
  text-align: center;
}
#nav {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: auto;
  width: 200px;
  height: 700px;
  justify-self: left;
  text-align: left;
  margin-top: 30px;
}
#nav a {
  font-weight: bold;
  color: white;
  font-size: 0.9em;
  text-align: right;
  width: 100px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#nav a :hover {
  background: darkslategrey;
  text-decoration: none;
}
</style>
