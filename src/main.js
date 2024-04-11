import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cookie from 'vue-cookies'
import IsLoading from './components/IsLoading.vue'
import axiosInstance from './axios'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.config.globalProperties.$axios = axiosInstance

app.use(cookie)
app.$cookies.config('1h')

app.component('IsLoading', IsLoading)

app.mount('#app')
