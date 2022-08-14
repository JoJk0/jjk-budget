<template>
  <v-text-field
    ref="searchEl" :model-value="modelValue" name="search" placeholder="Search..." type="search"
    append-inner-icon="search" clear clear-icon="home" variant="solo" class="search-input"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { VTextField } from 'vuetify/components'

const props = defineProps({
  modelValue: {
    type: String,
    dafult: undefined,
  },
})

const emit = defineEmits({
  'update:modelValue': (e: string) => e,
})

const searchEl = ref<InstanceType<typeof VTextField>>()

const { mobile } = useDisplay()

const listener = (event: KeyboardEvent) => {
  if (event.isComposing || event.key !== '/')
    return

  searchEl.value?.focus()
}

onMounted(() => {
  window.addEventListener('keyup', listener)
})
onUnmounted(() => {
  window.removeEventListener('keyup', listener)
})
</script>

<style lang="scss">
.search-input {
  height: 56px;

  >.v-input__control {
    >.v-field {
      background: var(--md-sys-color-surface-variant);
      border-radius: 56px;
      padding-left: 12px;
      padding-right: 16px;
      border: 0;

      >.v-field__outline {
        display: none;
      }

      >.v-field__field {
        padding-top: 8px;

        >.v-field__input {
          >input {

            &::placeholder {
              color: var(--md-sys-color-on-surface-variant);
            }

          }
            &:after {
              content: "/";
              display: block;
        border-radius: 4px;
          border: 1px solid currentColor;
          width: fit-content;
          padding: 0 8px;
          font-weight: bold;
            }
        }
      }
    }
  }
}
</style>
