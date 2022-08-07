<template>
  <MdStandardNavigationDrawer title="Budgeting">
    <v-list nav>
      <md-navigation-drawer-item
        v-for="{ icon, title, value } of topItems" :key="value" :prepend-icon="icon"
        :title="title" :value="value" :to="{ name: value }"
      />
    </v-list>
    <template #append>
      <v-list nav>
        <md-navigation-drawer-item
          v-for="{ icon, title, value } of bottomItems" :key="value"
          :prepend-icon="icon" :title="title" :value="value" :to="{ name: value }"
        />
      </v-list>
    </template>
  </MdStandardNavigationDrawer>
</template>

<script lang="ts" setup>
import MdStandardNavigationDrawer from '../../../vuetify-md3/md-navigation-drawer/MdStandardNavigationDrawer.vue'
import MdNavigationDrawerItem from '../../../vuetify-md3/md-navigation-drawer/MdNavigationDrawerItem.vue'

// const props = defineProps({});

// const emit = defineEmits({});

const topItems = [
  {
    icon: 'home',
    title: 'Home',
    value: 'index',
  },
  {
    icon: 'calculate',
    title: 'Budgets',
    value: 'budgets',
  },
  {
    icon: 'account_balance',
    title: 'Accounts',
    value: 'accounts',
  },
  {
    icon: 'currency_exchange',
    title: 'Subscriptions',
    value: 'subscriptions',
  },
]

const bottomItems = [
  {
    icon: 'settings',
    title: 'Settings',
    value: 'settings',
  },
  {
    icon: 'help',
    title: 'Help & Feedback',
    value: 'help',
  },
]
</script>

<style lang="scss" scoped></style>
