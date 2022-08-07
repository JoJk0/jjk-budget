/// <reference types="vitest" />

import path from 'path'
import { readdirSync } from 'fs'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Vuetify from 'vite-plugin-vuetify'
import type { RouteRecordRaw } from 'vue-router'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@material/web': `${path.resolve(__dirname, 'node_modules/@material/web')}`,
      'lit/decorators': `${path.resolve(__dirname, 'node_modules/lit/decorators')}`,
      'lit/directives': `${path.resolve(__dirname, 'node_modules/lit/directives')}`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      onRoutesGenerated(routes) {
        const dirNames = readdirSync('./src/pages', { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
        return dirNames.map<RouteRecordRaw>(dirName => ({
          path: `/${dirName}`,
          redirect: `/${dirName}s/`,
        })).concat(routes)
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    Vuetify(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },

})
