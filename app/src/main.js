import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router/index'
import { store } from './store'
import VueTextareaAutosize from 'vue-textarea-autosize'
import firebase from 'firebase/app'
import 'firebase/firestore'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';

Vue.use(VueTextareaAutosize)
Vue.use(BootstrapVue)

Vue.config.productionTip = false
firebase.initializeApp({
    apiKey: "AIzaSyAucGQL_ZCcgcjqzyKm3ai_UzCwlpjzAZ4",
    authDomain: "vue-calendar-28938.firebaseapp.com",
    databaseURL: "https://vue-calendar-28938.firebaseio.com",
    projectId: "vue-calendar-28938",
    storageBucket: "vue-calendar-28938.appspot.com",
    messagingSenderId: "774195229725",
    appId: "1:774195229725:web:d68bb0c05c165eb81c42f4"
})
export const db = firebase.firestore()
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
