<template>
  <div id="app">
    <div id="nav">
      <Header/>
      <router-link to="/">Home</router-link> |
      <router-link to="/datas">Datas</router-link> |
      <router-link to="/analyse">Analytics</router-link>
    </div>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Header from './components/layout/Header'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
