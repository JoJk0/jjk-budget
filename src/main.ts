import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createVuetify } from 'vuetify'
import App from './App.vue'

import 'normalize.css'
import './styles/main.css'
import 'vuetify/styles'

const app = createApp(App)
const vuetify = createVuetify()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app.use(router)
app.use(vuetify)
app.mount('#app')
