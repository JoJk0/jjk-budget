<template>
  <v-select
    class="filter-chip"
    :items="items"
    :placeholder="label"
    :label="label"
    :model-value="modelValue"
    item-title="label"
    item-value="value"
    variant="solo"
    density="compact"
    menu-icon="arrow_drop_down"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits({
  'update:modelValue': (e: string | undefined) => e,
})
</script>

<style lang="scss" scoped>
.filter-chip {
    width: fit-content;
}
</style>
