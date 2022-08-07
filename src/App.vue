<template>
  <main class="material-theme">
    <v-app>
      <app-nav />
      <v-main>
        <v-container fluid>
          <app-avatar-button class="my-account" />
          <router-view />
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </main>
</template>

<script setup>
import AppNav from './layouts/AppNav.vue'
</script>

<style lang="scss" scoped>
.my-account {
  position: absolute;
  top: 1em;
  right: 1em;
}
</style>
