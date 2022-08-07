<template>
  <div class="key">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
    .key {
        border-radius: 4px;
        border: 1px solid currentColor;
        width: fit-content;
        padding: 0 8px;
        font-weight: bold;
    }
</style>
