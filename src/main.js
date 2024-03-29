import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import cookie from 'vue-cookies'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

const app = createApp(App)
app.config.globalProperties.axios = axios
app.use(router)

app.use(cookie)
app.$cookies.config('1h')

app.mount('#app')
