import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/views/Home.vue'
import Datas from '../components/views/Datas'
import Analyse from '../components/views/Analyse'
import Professions from '../components/views/Professions'
import LoginComponent from "../components/views/Login.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponent
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/datas',
      name: 'datas',
      component: Datas
    },
    {
      path: '/professions',
      name: 'professions',
      component: Professions
    },
    {
      path: '/analyse',
      name: 'analyse',
      component: Analyse
    }
  ]
})