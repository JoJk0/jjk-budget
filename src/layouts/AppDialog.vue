<template>
  <v-dialog
    class="app-dialog material-theme" :model-value="modelValue" activator="parent" persistent
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="content">
      <div class="top-bar">
        <MdCardTitle>{{ title }}</MdCardTitle>
        <v-btn icon="close" color="clear" variant="text" @click="emit('update:modelValue', false)" />
      </div>
      <MdOutlinedTextField label="Service name" />
      <MdOutlinedTextField label="Service website" />
      <v-card-actions class="actions">
        <MdTextButton @click="emit('update:modelValue', false)">
          Cancel
        </MdTextButton>
        <MdTextButton>
          Save
        </MdTextButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import MdTextButton from '../../../vuetify-md3/md-button/MdTextButton.vue'
import MdCardTitle from '../../../vuetify-md3/md-card/MdCardTitle.vue'
import MdOutlinedTextField from '../../../vuetify-md3/md-text-field/MdOutlinedTextField.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  'update:modelValue': Boolean,
})
</script>

<style lang="scss" scoped>
.app-dialog {
    .content {
        background-color: var(--md-sys-color-surface);
        box-shadow: var(--md-sys-elevation-level3);
        border-radius: var(--md-sys-shape-corner-extra-large-default-size);
        min-width: 280px;
        max-width: 560px;
        padding: 24px;
        box-sizing: border-box;
        .top-bar {
            display: flex;
            gap: 1em;
        }
        .actions {
            justify-content: flex-end;
        }
    }
}
</style>
