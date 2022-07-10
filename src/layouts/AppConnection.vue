<template>
  <section class="app-connection">
    connection
    <v-text-field name="search" label="Search..." type="search" variant="outlined" />
    <div class="sort">
      Sort
    </div>
    <div class="filter">
      Filter
    </div>
    <div class="items">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
// const props = defineProps({});

// const emit = defineEmits({});
</script>

<style lang="scss" scoped></style>
