import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import type { ThemeDefinition } from 'vuetify'
import { createVuetify } from 'vuetify'
import App from './App.vue'

import 'normalize.css'
import 'vuetify/styles'
import './styles/md3.css'
import './styles/main.css'

const app = createApp(App)

const mainDark: ThemeDefinition = {
  dark: true,
  colors: {
    'background': '#001e31',
    'on-background': '#cbe6ff',
    'surface': '#001e31',
    'on-surface': '#cbe6ff',

    'primary': '#60dbb8',
    'on-primary': '#00382b',
    'primary-container': '#005140',
    'on-primary-container': '#7ff8d4',

    'secondary': '#ffb3b2',
    'on-secondary': '#5f131a',
    'secondary-container': '#7e2a2e',
    'on-secondary-container': '#ffdad9',

    'error': '#ffb4ab',
    'on-error': '#690005',
    'error-container': '#93000a',
    'on-error-container': '#ffdad6',

    'info': '#b5d2ff',
    'on-info': '#1470ff',

    'success': '#a3f7c2',
    'on-success': '#459B64',

    'warning': '#ffe1b5',
    'on-warning': '#E6A03A',
  },
}

const mainLight: ThemeDefinition = {
  dark: false,
  colors: {
    'background': '#fcfcff',
    'on-background': '#001e31',
    'surface': '#fcfcff',
    'on-surface': '#001e31',

    'primary': '#006b55',
    'on-primary': '#ffffff',
    'primary-container': '#7ff8d4',
    'on-primary-container': '#002018',

    'secondary': '#ffb3b2',
    'on-secondary': '#ffffff',
    'secondary-container': '#ffdad9',
    'on-secondary-container': '#410009',

    'error': '#ba1a1a',
    'on-error': '#ffffff',
    'error-container': '#ffdad6',
    'on-error-container': '#410002',

    'info': '#1470ff',
    'on-info': '#ffffff',

    'success': '#459B64',
    'on-success': '#ffffff',

    'warning': '#E6A03A',
    'on-warning': '#ffffff',
  },
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'mainDark',
    themes: {
      mainDark,
      mainLight,
    },
  },
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app.use(router)
app.use(vuetify)
app.mount('#app')
