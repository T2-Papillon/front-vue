import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import cookie from 'vue-cookies'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

console.log(`
    ____                    __
   / __ )____  ____  ____ _/ /__
  / __  / __ \\/ __ \\/ __ \`/ / _ \\
 / /_/ / /_/ / /_/ / /_/ / /  __/
/_____\/____/\\____/\\__, /_/\\___/
                  /____/
`)

const app = createApp(App)

app.use(router)

app.use(cookie)
app.$cookies.config('1h')

app.mount('#app')
