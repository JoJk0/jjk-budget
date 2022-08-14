<template>
  <MdFilledCard class="item-card" button ripple>
    <div class="container">
      <slot />
      <div class="actions">
        <v-btn icon="more_vert" variant="text" class="more" />
        <slot name="actions" />
      </div>
    </div>
  </MdFilledCard>
</template>

<script lang="ts" setup>
import MdFilledCard from '../../../vuetify-md3/md-card/MdFilledCard.vue'
const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
})

// const emit = defineEmits({})
</script>

<style lang="scss" scoped>
.item-card {
    cursor: pointer;
    .container {
        display: flex;
        .actions {
            .more {
                opacity: 0;
                transition: var(--md-sys-motion-duration-200);
            }
        }
    }
    &:hover {
        .container .actions .more {
            opacity: 1;
        }
    }
}
</style>
