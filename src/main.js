import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cookie from 'vue-cookies'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.use(cookie)
app.$cookies.config('1h')

app.mount('#app')
