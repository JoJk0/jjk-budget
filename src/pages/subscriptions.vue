<template>
  <section>
    <h1>Subscriptions</h1>
    <AppConnection :getter="GET_SUBSCRIPTIONS" :items-per-page="20">
      <template #default="{ items }">
        <SubscriptionCard v-for="item of items" :key="item.id" :subscription="item" />
      </template>
    </AppConnection>
  </section>
</template>

<script lang="ts" setup>
import AppConnection from '~/layouts/AppConnection.vue'
import { GET_SUBSCRIPTIONS } from '~/queries'
// const props = defineProps({});

// const emit = defineEmits({});
</script>

<style lang="scss" scoped></style>
