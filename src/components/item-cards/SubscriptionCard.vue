<template>
  <MdFilledCard class="subscription-card">
    <img v-if="subscription.serviceUrl" :src="imageUrl" :alt="subscription.name">
    <v-card-title class="name">
      {{ subscription.name }}
    </v-card-title>
    <v-card-text class="price">
      {{ subscription.amount }} {{ subscription.currency }}
    </v-card-text>
  </MdFilledCard>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import MdFilledCard from '../../../../vuetify-md3/md-card/MdFilledCard.vue'
import type { SubscriptionListItem } from '~/types/list-items'

const props = defineProps({
  subscription: {
    type: Object as PropType<SubscriptionListItem>,
    required: true,
  },
})

// const emit = defineEmits({});

const imageUrl = computed(() => {
  if (props.subscription.serviceUrl)
    return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${props.subscription.serviceUrl}&size=64`
})
</script>

<style lang="scss" scoped></style>
