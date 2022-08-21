<template>
  <MdFilledCard>Item details</MdFilledCard>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import MdFilledCard from '../../../vuetify-md3/md-card/MdFilledCard.vue'
import type { ItemDetailsOptions } from '~/types'

const props = defineProps({
  options: {
    type: Object as PropType<ItemDetailsOptions<unknown>>,
  },
})

// const emit = defineEmits({})
</script>

<style lang="scss" scoped></style>
