<template>
  <v-text-field :value="value" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  value: {
    type: String as PropType<string>,
    required: true,
  },
})

// const emit = defineEmits({});
</script>

<style lang="scss" scoped></style>
