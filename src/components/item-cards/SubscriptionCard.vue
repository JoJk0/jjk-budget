<template>
  <AppItemCard class="subscription-card" button ripple>
    <img v-if="subscription?.serviceUrl" class="image" :src="imageUrl" :alt="subscription.name">
    <div class="col">
      <v-card-title class="name">
        {{ subscription?.name }}
      </v-card-title>
      <v-card-text class="price">
        {{ subscription?.amount }} {{ subscription?.currency }} {{ localeAmount }}
      </v-card-text>
    </div>
  </AppItemCard>
</template>

<script lang="ts" setup>
import { dinero } from 'dinero.js'
import * as currencies from '@dinero.js/currencies'
import type { PropType } from 'vue'

import type { SubscriptionListItem } from '~/types/list-items'

const props = defineProps({
  subscription: {
    type: Object as PropType<SubscriptionListItem>,
    required: true,
  },
})

// const emit = defineEmits({});

const imageUrl = computed(() => {
  if (props.subscription?.serviceUrl)
    return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${props.subscription.serviceUrl}&size=64`
})

const amount = computed(() => dinero({
  amount: Math.floor(props.subscription.amount * 100),
  currency: currencies[props.subscription.currency],
}))

const { localeAmount } = useCurrencyConverter(amount.value, currencies.GBP)
</script>

<style lang="scss" scoped>
.image {
  aspect-ratio: 1;
  object-fit: contain;
}
</style>
