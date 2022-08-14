<template>
  <MdStandardNavigationDrawer v-if="!mobile" title="Budgeting">
    <v-list nav>
      <md-navigation-drawer-item
        v-for="{ icon, title, value } of topItems" :key="value" :prepend-icon="icon"
        :title="title" :value="value" :to="{ name: value }"
      />
    </v-list>
    <template #append>
      <v-list nav>
        <md-navigation-drawer-item
          v-for="{ icon, title, value } of bottomItems" :key="value" :prepend-icon="icon"
          :title="title" :value="value" :to="{ name: value }"
        />
      </v-list>
    </template>
  </MdStandardNavigationDrawer>
  <MdNavigationBar v-else :value="currentRoute.name">
    <MdNavigationBarItem
      v-for="{ icon, title, value } of topItems" :key="value" nav :title="title"
      :to="{ name: value }" :icon="icon" :value="value" :active="currentRoute.name === value"
    />
  </MdNavigationBar>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import MdStandardNavigationDrawer from '../../../vuetify-md3/md-navigation-drawer/MdStandardNavigationDrawer.vue'
import MdNavigationDrawerItem from '../../../vuetify-md3/md-navigation-drawer/MdNavigationDrawerItem.vue'
import MdNavigationBar from '../../../vuetify-md3/md-navigation-bar/MdNavigationBar.vue'
import MdNavigationBarItem from '../../../vuetify-md3/md-navigation-bar/MdNavigationBarItem.vue'

// const props = defineProps({});

// const emit = defineEmits({});

const { mobile } = useDisplay()

const { currentRoute } = useRouter()

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
