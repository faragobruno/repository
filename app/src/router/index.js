import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/views/Home.vue'
import Datas from '../components/views/Datas'
import Analyse from '../components/views/Analyse'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/datas',
      name: 'datas',
      component: Datas
    },
    {
      path: '/analyse',
      name: 'analyse',
      component: Analyse
    }
  ]
})